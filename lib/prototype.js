
var fs = require('mz/fs')
var path = require('path')
var ua = require('useragent')
var crypto = require('crypto')
var compress = require('mz/zlib').gzip
var minify = require('uglify-js').minify
var Promise = require('native-or-bluebird')

require('useragent/features')

exports.build = function () {
  var self = this
  var bundle = this._bundle()
  return this.constructor.read(bundle.hash, '.json').then(stringify, function () {
    return self._build(bundle)
  })
}

exports.then = function (resolve, reject) {
  return this.build().then(resolve, reject)
}

exports.catch = function (reject) {
  return this.build().catch(reject)
}

// create a useragent -> [polyfills] bundle and cache it
exports._bundle = function () {
  var useragent = this.useragent
  var val = this.cache.get(useragent)
  if (val) return val

  // create a bundle
  var agent = ua.parse(useragent)

  var polyfills = this.polyfills.filter(function (polyfill) {
    return polyfill.filter(agent)
  })

  var val = {
    polyfills: polyfills,
    hash: polyfills.map(toShortName).join('-')
  }

  this.cache.set(useragent, val)
  return val
}

// build the bundle
exports._build = function (bundle) {
  var self = this
  var name = bundle.hash
  var write = this.constructor.write

  return Promise.all(bundle.polyfills.map(function (polyfill) {
    return fs.readFile(path.join(self.dir, polyfill.name + '.js'), 'utf8')
  })).then(function (polyfills) {
    var js = polyfills.join(';\n\n')
    var minified = minify(js, {
      fromString: true
    }).code

    return Promise.all([
      compress(js),
      compress(minified),
    ]).then(function (compressed) {
      var data = {
        name: name,
        date: new Date().toUTCString(),
        hash: calculate(js),
        polyfills: bundle.polyfills.map(toName),
        length: {
          '.js': Buffer.byteLength(js),
          '.js.gz': compressed[0].length,
          '.min.js': Buffer.byteLength(minified),
          '.min.js.gz': compressed[1].length,
        }
      }

      return Promise.all([
        write(name, '.json', JSON.stringify(data)),
        write(name, '.js', js),
        write(name, '.js.gz', compressed[0]),
        write(name, '.min.js', minified),
        write(name, '.min.js.gz', compressed[1])
      ]).then(function () {
        return data
      })
    })
  })
}

function toName(x) {
  return x.name
}

function toShortName(x) {
  return x.shortName || x.name
}

function calculate(js) {
  return crypto.createHash('sha256').update(js).digest('base64')
}

function stringify(buf) {
  buf = JSON.parse(buf.toString())
  buf.date = new Date(buf.date)
  return buf
}
