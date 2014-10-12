
var os = require('os')
var fs = require('mz/fs')
var path = require('path')
var lru = require('lru-cache')
var debug = require('debug')('polyfills')
var _polyfills = require('polyfills-db').polyfills.polyfills
var tmpdir = os.tmpdir
  ? os.tmpdir()
  : os.tmpDir()

var proto = require('./prototype')

var folder = path.resolve(tmpdir, 'polyfills')
debug('saving polyfills to folder: %s', folder)
require('mkdirp').sync(folder)

module.exports = function (options) {
  options = options || {}

  Polyfill.prototype = Object.create(proto)
  Polyfill.prototype.constructor = Polyfill

  // useragent -> build lookup
  Polyfill.prototype.dir = path.join(__dirname, '..', 'polyfills')
  Polyfill.prototype.cache = lru(({
    max: 1000,
    maxAge: 1000 * 60 * 60, // 1 hour just because
  }))

  // setup which polyfills to use
  var polyfills
  if (Array.isArray(options.include)) {
    polyfills = _polyfills.filter(function (polyfill) {
      return ~options.include.indexOf(polyfill.name)
        || ~options.include.indexOf(polyfill.shortName)
    })
  } else if (Array.isArray(options.exclude)) {
    polyfills = _polyfills.filter(function (polyfill) {
      if (!polyfill.inclusive) return false
      return !~options.exclude.indexOf(polyfill.name)
        && !~options.exclude.indexOf(polyfill.shortName)
    })
  } else {
    polyfills = _polyfills.filter(inclusive)
  }

  Polyfill.prototype.polyfills = polyfills

  /**
   * TODO: Refactor all these functions to outside this closure.
   */

  // reading and writing
  Polyfill.pathOf = function (name, ext) {
    return path.join(folder, name + ext);
  }

  // read a cached file's name and extension
  Polyfill.read = function (name, ext) {
    return fs.readFile(Polyfill.pathOf(name, ext))
  }

  // stream the cached file
  Polyfill.stream = function (name, ext) {
    return fs.createReadStream(Polyfill.pathOf(name, ext))
  }

  // write a file to the cache
  Polyfill.write = function (name, ext, data) {
    return fs.writeFile(Polyfill.pathOf(name, ext), data)
  }

  Polyfill.clean = function () {
    require('rimraf').sync(folder)
    require('mkdirp').sync(folder)
  }

  Polyfill.select = function (data, minify, gzip) {
    if (minify) {
      if (!gzip || data.length['.min.js'] < data.length['.min.js.gz']) {
        // gzip is larger than the original
        return ['.min.js', false]
      } else {
        return ['.min.js.gz', true]
      }
    } else {
      if (!gzip || data.length['.js'] < data.length['.js.gz']) {
        return ['.js', false]
      } else {
        return ['.js.gz', true]
      }
    }
  }

  function Polyfill(useragent) {
    if (!(this instanceof Polyfill)) return new Polyfill(useragent)

    this.useragent = useragent
  }

  return Polyfill
}

function inclusive(x) {
  return x.inclusive
}
