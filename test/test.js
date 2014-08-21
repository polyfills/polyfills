
var fs = require('mz/fs')
var path = require('path')
var assert = require('assert')
var decompress = require('mz/zlib').gunzip
var Promise = require('native-or-bluebird')

var polyfill = require('..')()
polyfill.clean()

var chrome = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_9_2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/36.0.1944.0 Safari/537.36'
var ie8 = 'Mozilla/5.0 (compatible; MSIE 8.0; Windows NT 5.2; Trident/4.0; Media Center PC 4.0; SLCC1; .NET CLR 3.0.04320)'
var ios51 = 'Mozilla/5.0 (iPad; CPU OS 5_0 like Mac OS X) AppleWebKit/534.46 (KHTML, like Gecko) Version/5.1 Mobile/9A334 Safari/7534.48.3'
var android403 = 'Mozilla/5.0 (Linux; U; Android 4.0.3; ko-kr; LG-L160L Build/IML74K) AppleWebkit/534.30 (KHTML, like Gecko) Version/4.0 Mobile Safari/534.30'

describe('Polyfills(options)', function () {
  it('options.include', function () {
    var p = require('..')({
      include: ['requestanimationframe']
    })

    return p(chrome).then(function (data) {
      return p.read(data.name, '.js')
    }).then(function (out) {
      assert(!out.toString().trim())
    })
  })

  it('options.exclude', function () {
    var p = require('..')({
      exclude: ['domelements']
    })

    return p(chrome).then(function (data) {
      return p.read(data.name, '.js')
    }).then(function (out) {
      assert(!~out.toString().indexOf('elementsPrototype.queryAll'))
    })
  })

  describe('polyfill(useragent)', function () {
    var data

    it('.catch().then()', function () {
      return polyfill(ie8).catch(function (err) {
        throw err
      }).then(function () {
        
      })
    })

    it('.then( data => )', function () {
      return polyfill(chrome).then(function (data) {
        return polyfill(chrome)
      }).then(function (_data) {
        assert(data = _data)
        assert(data.name)
        assert(data.date)
        assert(data.hash)
      })
    })

    it('.read(name, .js)', function () {
      return polyfill.read(data.name, '.js').then(function (out) {
        new Function(out.toString())
      })
    })

    it('.read(name, .min.js)', function () {
      return polyfill.read(data.name, '.min.js').then(function (out) {
        out = out.toString()
        new Function(out)
        assert(!/\s{2,}/.test(out))
      })
    })

    it('.read(name, .min.js.gz)', function () {
      return polyfill.read(data.name, '.min.js.gz')
    })
  })
})

/*
return polyfill().then(function (data) {
  return polyfill.read(data.name, '.js')
}).then(function (out) {
  out = out.toString()
  new Function(out)
})
*/

describe('Browsers', function () {
  describe('IE8', function () {
    it('should include ES5', function () {
      return polyfill(ie8).then(function (data) {
        return polyfill.read(data.name, '.js')
      }).then(function (out) {
        out = out.toString()
        new Function(out)
        assert(~out.indexOf('https://github.com/es-shims/es5-shim'))
      })
    })
  })

  describe('iOS 5.1', function () {
    it('should include RAF', function () {
      return polyfill(ios51).then(function (data) {
        return polyfill.read(data.name, '.js')
      }).then(function (out) {
        out = out.toString()
        new Function(out)
        assert(~out.indexOf('requestAnimationFrame'))
      })
    })
  })

  describe('Android 4.0.3', function () {
    it('should include RAF', function () {
      return polyfill(android403).then(function (data) {
        return polyfill.read(data.name, '.js')
      }).then(function (out) {
        out = out.toString()
        new Function(out)
        assert(~out.indexOf('requestAnimationFrame'))
      })
    })
  })
})
