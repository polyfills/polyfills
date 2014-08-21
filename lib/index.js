
var fs = require('mz/fs')
var path = require('path')
var lru = require('lru-cache')
var _polyfills = require('polyfills-db').polyfills.polyfills

var proto = require('./prototype')

module.exports = function (options) {
  options = options || {}

  Polyfill.prototype = Object.create(proto)
  Polyfill.prototype.constructor = Polyfill

  // useragent -> build lookup
  Polyfill.prototype.cache = lru(({
    max: 1000,
    maxAge: 1000 * 60 * 60, // 1 hour just because
  }))

  { // setup which polyfills to use
    var polyfills = _polyfills.slice()
    if (Array.isArray(options.include)) {
      polyfills = polyfills.filter(function (polyfill) {
        return ~options.include.indexOf(polyfill.name)
          || ~options.include.indexOf(polyfill.shortName)
      })
    }
    if (Array.isArray(options.exclude)) {
      polyfills = polyfills.filter(function (polyfill) {
        return !~options.exclude.indexOf(polyfill.name)
          && !~options.exclude.indexOf(polyfill.shortName)
      })
    }
    Polyfill.prototype.polyfills = polyfills
  }

  { // setup the caching folder
    Polyfill.prototype.dir = path.join(__dirname, '..', 'polyfills')
    var folder =
    Polyfill.prototype.folder = path.resolve(options.cache || 'cache/polyfills')
    require('mkdirp').sync(folder)
  }

  { // reading and writing
    // read a cached file's name and extension
    Polyfill.read = function (name, ext) {
      return fs.readFile(path.join(folder, name + ext))
    }

    // write a file to the cache
    Polyfill.write = function (name, ext, data) {
      return fs.writeFile(path.join(folder, name + ext), data)
    }

    Polyfill.clean = function () {
      require('rimraf').sync(folder)
      require('mkdirp').sync(folder)
    }
  }

  function Polyfill(useragent) {
    if (!(this instanceof Polyfill)) return new Polyfill(useragent)

    this.useragent = useragent
  }

  return Polyfill
}
