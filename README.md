
# Polyfills

[![NPM version][npm-image]][npm-url]
[![Build status][travis-image]][travis-url]
[![Test coverage][coveralls-image]][coveralls-url]
[![Dependency Status][david-image]][david-url]
[![License][license-image]][license-url]
[![Downloads][downloads-image]][downloads-url]
[![Gittip][gittip-image]][gittip-url]

Create polyfill builds based on the client's browser and serve only what's needed.
This allows you to write modern JavaScript without worrying too much
(you should still do due diligence) about browser support as well as
not penalizing modern browsers with unnecessary polyfills.

This library is merely the "logic" and does not handle any HTTP serving.
It essentially does the following:

- Parses user agent strings for `<family> <major>.<minor>.<version>` and creates polyfill bundles based on these variables.
- Caches builds locally.
- Creates minified and gzipped builds.
- Returns metadata for the `Content-Length` and `ETag` headers.

It also stores nothing in memory, making it suitable for production usage within existing node apps.

For some middleware implementations for your favorite node.js framework:

- [koa-polyfills](https://github.com/polyfills/koa) for [koa](https://github.com/koajs/koa).
- [polyfills-middleware](https://github.com/polyfills/middleware) for Connect, Express, Restify, etc.

This is inspired by [jonathantneal/polyfill](https://github.com/jonathantneal/polyfill)
but has a couple of different philosophies:

- It does not use its own polyfills and instead uses well-tested 3rd party polyfills.
  All polyfills are tracked in [polyfills-db](https://github.com/polyfills/db).
- It does not attempt to optimize bundle sizes.
- It does not use its own user agent parser.

This library will only use small, well tested polyfills.
The only exceptions are `ECMAScript` bundles such as [es5-shim](https://github.com/es-shims/es5-shim)

## Included Polyfills

- [barberyboy/dom-elements](https://github.com/barberboy/dom-elements)
  - `Element.prototype.query()`
  - `Element.prototype.queryAll()`
- [webreflection/dom4](https://github.com/webreflection/dom4)
  - `Element.prototype.prepend()`
  - `Element.prototype.append()`
  - `Element.prototype.before()`
  - `Element.prototype.after()`
  - `Element.prototype.replace()`
  - `Element.prototype.remove()`
  - `Element.prototype.matches()`
  - `Element.prototype.classList`
- [darius/requestAnimationFrame](https://github.com/darius/requestAnimationFrame)
  - `window.requestAnimationFrame()`
  - `window.cancelAnimationFrame()`
- [YuzuJS/setImmediate](https://github.com/YuzuJS/setImmediate)
  - `window.setImmediate()`
  - `window.clearImmediate()`
- [Yaffle/EventSource](https://github.com/Yaffle/EventSource)
  - `window.EventSource`
- [jakearchibald/es6-promise](https://github.com/jakearchibald/es6-promise)
  - `window.Promise()`
- [es-shims/es5-shim](https://github.com/es-shims/es5-shim)
- All of [Mathias Bynens](https://github.com/mathiasbynens) and [Paul Miller](https://github.com/paulmillr)'s various polyfills

## Installation

```bash
npm install polyfills
```

## Usage

### var polyfill = Polyfills([options])

```js
var polyfill = require('polyfills')()
```

Return a new instance of `polyfill` based on `options`.

- `include` - which polyfills to include.
  This is an __inclusive__ list.
  The names are included in [polyfills/db](https://github.com/polyfills/db/blob/master/lib/polyfills.js).
- `exclude` - conversely, you can exclude specific polyfills.
- `cache` - folder to cache polyfill bundles. Defaults to this module's `cache/` folder.

### polyfill.clean()

Clean all the bundles from the cache.

### polyfill(useragent).then( data => )

Build and cache the bundle. Returns data with:

- `name` - the name of the build
- `date` - the date this build was created for `Last-Modified` headers
- `hash` - a `sha256` sha sum of the JS file in `hex` encoding for `ETag` headers
- `polyfills[]` - an array of all the polyfill names used
- `length[extension]` - the byte size of each build for `Content-Length` headers

The possible extensions are:

- `.json` - the returns data
- `.js`
- `.js.gz`
- `.min.js`
- `.min.js.gz`

### polyfill.read(name, ext).then( buf => )

Example Express usage (don't use this code, use [polyfills-middleware](https://github.com/polyfills/middleware) instead):

```js
app.use(function (req, res) {
  if (req.path !== '/polyfills.js') return next()

  polyfill(req.headers['user-agent']).then(function (data) {
    // you probably want to do content negotiation here
    res.setHeader('Content-Encoding', 'gzip')
    res.setHeader('Content-Length', data.length['.min.js.gz'])
    res.setHeader('Content-Type', 'application/javascript')
    res.setHeader('ETag', '"' + data.hash + '"')

    if (req.fresh) {
      res.statusCode = 304
      res.end()
      return
    }

    return polyfill.read(data.name, '.min.js.gz').then(function (buf) {
      res.end(buf)
    })
  }).catch(next)
})
```

## Adding polyfills

Checkout [polyfills/db](https://github.com/polyfills/db).

[npm-image]: https://img.shields.io/npm/v/polyfills.svg?style=flat-square
[npm-url]: https://npmjs.org/package/polyfills
[github-tag]: http://img.shields.io/github/tag/polyfills/polyfills.svg?style=flat-square
[github-url]: https://github.com/polyfills/polyfills/tags
[travis-image]: https://img.shields.io/travis/polyfills/polyfills.svg?style=flat-square
[travis-url]: https://travis-ci.org/polyfills/polyfills
[coveralls-image]: https://img.shields.io/coveralls/polyfills/polyfills.svg?style=flat-square
[coveralls-url]: https://coveralls.io/r/polyfills/polyfills?branch=master
[david-image]: http://img.shields.io/david/polyfills/polyfills.svg?style=flat-square
[david-url]: https://david-dm.org/polyfills/polyfills
[license-image]: http://img.shields.io/npm/l/polyfills.svg?style=flat-square
[license-url]: LICENSE
[downloads-image]: http://img.shields.io/npm/dm/polyfills.svg?style=flat-square
[downloads-url]: https://npmjs.org/package/polyfills
[gittip-image]: https://img.shields.io/gittip/jonathanong.svg?style=flat-square
[gittip-url]: https://www.gittip.com/jonathanong/
