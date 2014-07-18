
var fs = require('mz/fs')
var path = require('path')
var assert = require('assert')
var decompress = require('mz/zlib').gunzip
var Promise = require('native-or-bluebird')

var polyfill

var chrome = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_9_2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/36.0.1944.0 Safari/537.36'
var ie8 = 'Mozilla/5.0 (compatible; MSIE 8.0; Windows NT 5.2; Trident/4.0; Media Center PC 4.0; SLCC1; .NET CLR 3.0.04320)'
var ios51 = 'Mozilla/5.0 (iPad; CPU OS 5_0 like Mac OS X) AppleWebKit/534.46 (KHTML, like Gecko) Version/5.1 Mobile/9A334 Safari/7534.48.3'
var android403 = 'Mozilla/5.0 (Linux; U; Android 4.0.3; ko-kr; LG-L160L Build/IML74K) AppleWebkit/534.30 (KHTML, like Gecko) Version/4.0 Mobile Safari/534.30'

before(function () {
  require('rimraf').sync(path.join(__dirname, '..', 'cache'))
  // require polyfill after rimrafing
  polyfill = require('..')()
})

describe('Polyfills', function () {
  describe('describing bundles', function () {
    it('should allow specific inclusions', function () {
      var p = require('..')({
        include: ['requestanimationframe']
      })

      return p(chrome).then(function (out) {
        assert(!out.trim())
      })
    })

    it('should allow specific exclusions', function () {
      var p = require('..')({
        exclude: ['domelements']
      })

      return p(chrome).then(function (out) {
        assert(!~out.indexOf('elementsPrototype.queryAll'))
      })
    })
  })

  describe('building a bundle', function () {
    var p

    it('should build', function () {
      p = polyfill(chrome)
      return p.then(function (out) {
        new Function(out) // make sure there are no syntax errors
      })
    })

    it('should minify', function () {
      return polyfill(chrome).build(true).then(function (out) {
        new Function(out)
        assert(!/\s{2,}/.test(out))
      })
    })

    it('should gzip', function () {
      return Promise.all([
        polyfill(chrome).build(true, true),
        polyfill(chrome).build(true, false),
      ]).then(function (out) {
        return decompress(out[0]).then(function (decompressed) {
          assert.equal(out[1], decompressed)
        })
      })
    })

    it('should cache', function () {
      return Promise.all([
        fs.stat(path.join(__dirname, '..', 'cache', 'polyfill.' + p.hash + '.js')),
        fs.stat(path.join(__dirname, '..', 'cache', 'polyfill.' + p.hash + '.min.js')),
      ])
    })
  })
})

describe('Browsers', function () {
  describe('IE8', function () {
    it('should include ES5', function () {
      return polyfill(ie8).then(function (out) {
        new Function(out)
        assert(~out.indexOf('https://github.com/es-shims/es5-shim'))
      })
    })
  })

  describe('iOS 5.1', function () {
    it('should include RAF', function () {
      return polyfill(ios51).then(function (out) {
        new Function(out)
        assert(~out.indexOf('requestAnimationFrame'))
      })
    })
  })

  describe('Android 4.0.3', function () {
    it('should include RAF', function () {
      return polyfill(android403).then(function (out) {
        new Function(out)
        assert(~out.indexOf('requestAnimationFrame'))
      })
    })
  })
})
