
var fs = require('mz/fs')
var path = require('path')
var ua = require('useragent')
var lru = require('lru-cache')
var minify = require('uglify-js').minify
var _compress = require('node-zopfli').gzip

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

  Polyfills.prototype.build = function* (minified, gzipped) {
    // default to `true` in production
    if (minified == null) minified = production
    var existing = yield* this._cacheLookup(minified, gzipped)
    if (existing) return existing

    var res = yield* this._build()
    yield* this._cacheSave(res)

    if (minified) return gzipped ? res[3] : res[1]
    return gzipped ? res[2] : res[0]
  }

  // lookup a build from cache
  Polyfills.prototype._cacheLookup = function* (minified, gzipped) {
    try {
      return yield fs.readFile(this.name
        + (minified ? '.min' : '')
        + '.js'
        + (gzipped ? '.gz' : ''),
        gzipped ? null : 'utf8')
    } catch (err) {
      return ''
    }
  }

  // save a build to cache
  Polyfills.prototype._cacheSave = function* (res) {
    yield [
      fs.writeFile(this.name + '.js', res[0]),
      fs.writeFile(this.name + '.min.js', res[1]),
      fs.writeFile(this.name + '.js.gz', res[2]),
      fs.writeFile(this.name + '.min.js.gz', res[3]),
    ]
  }

  // create a build
  Polyfills.prototype._build = function* () {
    var names = this.names
    var polyfills = yield this.bundle.map(function* (include, index) {
      if (!include) return ''
      return yield* this._read(names[index])
    }, this)

    var js = polyfills.filter(Boolean).join(';\n\n')
    var min = minify(js, {
      fromString: true
    }).code
    var gzipped = yield [
      compress(js),
      compress(min)
    ]
    return [js, min].concat(gzipped)
  }

  // read a polyfill
  Polyfills.prototype._read = function* (name) {
    return yield fs.readFile(path.join(this.dir, name + '.js'), 'utf8')
  }

  return Polyfills
}

function compress(string) {
  return function (done) {
    _compress(new Buffer(string), done)
  }
}
