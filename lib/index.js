
var fs = require('mz/fs')
var path = require('path')
var ua = require('useragent')
var lru = require('lru-cache')
var compress = require('mz/zlib').gzip
var minify = require('uglify-js').minify
var Promise = require('native-or-bluebird')

require('useragent/features')

var _polyfills = require('./polyfills')

var production = process.env.NODE_ENV === 'production'

module.exports = function (options) {
  options = options || {}

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
    Polyfills.prototype.polyfills = {}
    include.forEach(function (name) {
      if (_polyfills[name]) Polyfills.prototype.polyfills[name] = _polyfills[name]
    })
    Polyfills.prototype.names = Object.keys(Polyfills.prototype.polyfills)
  }

  { // setup the caching folder
    Polyfills.prototype.dir = path.join(__dirname, '..', 'polyfills')
    Polyfills.prototype.cache = options.cache
      ? path.resolve(options.cache)
      : path.join(__dirname, '..', 'cache')

    require('mkdirp').sync(Polyfills.prototype.cache)
  }

  { // setup caching user agents -> bundles
    var cache = lru(({
      max: 1000,
      maxAge: Infinity,
    }))

    Polyfills.prototype.lookup = function (useragent) {
      // return the bundle hash if available
      var val = cache.get(useragent)
      if (val) return this.bundle = val

      // create a bundle hash
      var agent = ua.parse(useragent)
      var polyfills = this.polyfills
      var val = this.bundle = this.names.map(function toBoolean(name) {
        return +polyfills[name].filter(agent)
      })
      cache.set(useragent, val)
      return val
    }
  }

  function Polyfills(useragent) {
    if (!(this instanceof Polyfills)) return new Polyfills(useragent)

    this.useragent = useragent
    this.hash = this.lookup(useragent).join('')
    this.name = path.join(this.cache, this.hash)
  }

  Polyfills.prototype.then = function (resolve, reject) {
    return this.build().then(resolve, reject)
  }

  Polyfills.prototype.build = function (minified, gzipped) {
    // default to `true` in production
    if (minified == null) minified = production
    var self = this
    return this._cacheLookup(minified, gzipped).then(function (existing) {
      if (existing) return existing
      return self._build().then(function (res) {
        return self._cacheSave(res).then(function () {
          if (minified) return gzipped ? res[3] : res[1]
          return gzipped ? res[2] : res[0]
        })
      })
    })
  }

  // lookup a build from cache
  Polyfills.prototype._cacheLookup = function (minified, gzipped) {
    var filename = this.name
      + (minified ? '.min' : '')
      + '.js'
      + (gzipped ? '.gz' : '')
    return fs.readFile(filename, gzipped ? null : 'utf8').catch(function () {
      return null
    })
  }

  // save a build to cache
  Polyfills.prototype._cacheSave = function (res) {
    return Promise.all([
      fs.writeFile(this.name + '.js', res[0]),
      fs.writeFile(this.name + '.min.js', res[1]),
      fs.writeFile(this.name + '.js.gz', res[2]),
      fs.writeFile(this.name + '.min.js.gz', res[3]),
    ])
  }

  // create a build
  Polyfills.prototype._build = function () {
    var names = this.names
    var js
    var min
    return Promise.all(this.bundle.map(function (include, index) {
      if (!include) return ''
      return fs.readFile(path.join(this.dir, names[index] + '.js'), 'utf8')
    }, this)).then(function (polyfills) {
      js = polyfills.filter(Boolean).join(';\n\n')
      min = minify(js, { fromString: true }).code
      return Promise.all([
        compress(new Buffer(js)),
        compress(new Buffer(min))
      ])
    }).then(function (gzipped) {
      return [js, min].concat(gzipped)
    })
  }

  return Polyfills
}
