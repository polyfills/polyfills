
var fs = require('mz/fs')
var path = require('path')
var ua = require('useragent')
var minify = require('uglify-js').minify
require('useragent/features')

var _polyfills = require('./polyfills')

var production = process.env.NODE_ENV === 'production'

module.exports = function (options) {
options = options || {}

function Polyfills(useragent) {
  if (!(this instanceof Polyfills)) return new Polyfills(useragent)

  this.useragent = useragent
  var agent = this.agent = ua.lookup(useragent)
  this.hash = agent.family === 'Other'
    ? 'Other'
    : [
        agent.family,
        agent.major || '0',
        agent.minor || '0',
        agent.patch || '0'
      ].join('_')
  this.name = path.join(this.cache, this.hash)
}

// only include a subset of polyfills
var include = options.polyfills
if (!Array.isArray(include)) include = Object.keys(_polyfills)
Polyfills.prototype.polyfills = {}
include.forEach(function (name) {
  if (_polyfills[name])
    Polyfills.prototype.polyfills[name] = _polyfills[name]
})
Polyfills.prototype.names = Object.keys(Polyfills.prototype.polyfills)

Polyfills.prototype.dir = path.join(__dirname, '..', 'polyfills')
Polyfills.prototype.cache = options.cache
  ? path.resolve(options.cache)
  : path.join(__dirname, '..', 'cache')

require('mkdirp').sync(Polyfills.prototype.cache)

Polyfills.prototype.build = function* (minified) {
  // default to `true` in production
  if (minified == null) minified = production
  var existing = yield* this._cacheLookup(minified)
  if (existing) return existing

  var res = yield* this._build()
  var js = res[0]
  var min = res[1]

  yield* this._cacheSave(js, min)

  return minified ? min : js
}

// lookup a build from cache
Polyfills.prototype._cacheLookup = function* (minified) {
  try {
    return yield fs.readFile(this.name + (minified ? '.min' : '')  + '.js', 'utf8')
  } catch (err) {
    return ''
  }
}

// save a build to cache
Polyfills.prototype._cacheSave = function* (string, minified) {
  yield [
    fs.writeFile(this.name + '.js', string),
    fs.writeFile(this.name + '.min.js', minified)
  ]
}

// create a build
Polyfills.prototype._build = function* () {
  var self = this

  var polyfills = yield this.names.map(function (name) { return function* () {
    // don't include
    if (!self.polyfills[name].filter(self.agent)) return ''
    return yield* self._read(name)
  }})
  var js = polyfills.filter(Boolean).join(';\n\n')
  var min = minify(js, {
    fromString: true
  }).code
  return [js, min]
}

// read a build
Polyfills.prototype._read = function* (name) {
  var string = yield fs.readFile(path.join(this.dir, name + '.js'), 'utf8')
  return string.replace(/^['"]use strict['"];?/, '')
}

return Polyfills
}
