
var fs = require('mz/fs')
var path = require('path')
var lru = require('lru-cache')

var _polyfills = require('./polyfills')

var proto = require('./prototype')

module.exports = function (options) {
  options = options || {}

  Polyfill.prototype = Object.create(proto)
  Polyfill.prototype.constructor = Polyfill

  Polyfill.prototype.cache = lru(({
    max: 1000,
    maxAge: Infinity,
  }))

  { // setup which polyfills to use
    // only include a subset of polyfills
    var include = options.include
    if (!Array.isArray(include)) include = Object.keys(_polyfills)
    // exclude a set
    var exclude = options.exclude
    if (Array.isArray(exclude)) {
      exclude.forEach(function (name) {
        var i = include.indexOf(name)
        if (~i) include.splice(i, 1)
      })
    }

    // setup the list of polyfills
    Polyfill.prototype.polyfills = include.map(function (name) {
      var polyfill = _polyfills[name]
      if (!polyfill) return false
      polyfill.name = name
      return polyfill
    }).filter(Boolean)
  }

  { // setup the caching folder
    Polyfill.prototype.dir = path.join(__dirname, '..', 'polyfills')
    var folder = Polyfill.prototype.folder = options.cache
      ? path.resolve(options.cache)
      : path.join(__dirname, '..', 'cache')

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
