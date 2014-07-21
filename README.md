
# Polyfills

[![NPM version][npm-image]][npm-url]
[![build status][travis-image]][travis-url]
[![Test coverage][coveralls-image]][coveralls-url]
[![Gittip][gittip-image]][gittip-url]

Create polyfill builds based on the client's browser and serve only what's needed.
This allows you to write modern JavaScript without worrying too much
(you should still do due diligence) about browser support as well as
not penalizing modern browsers with unnecessary polyfills.

- Parses user agent strings for `<family> <major>.<minor>.<version>` and creates polyfill bundles based on these variables.
- Caches builds locally to a `cache/` folder.
- Optionally minimizes builds (defaults to `true` in production).
- Stores nothing in memory, allowing you to use it within your app with minimal overhead.

This is simply the builder. For some middleware implementations for your app:

- [koa-polyfills](https://github.com/polyfills/koa) for [koa](https://github.com/koajs/koa) - supports SPDY pushing the polyfills as well.

This is inspired by [jonathantneal/polyfill](https://github.com/jonathantneal/polyfill)
but has a couple of different philosophies:

- It does not use its own polyfills and instead uses well tested polyfill libraries.
- It does not attempt to optimize bundle sizes.
- It does not use its own user agent parser.

This library will only use small, well tested polyfills.
The only exceptions are `ECMAScript` bundles such as [es5-shim](https://github.com/es-shims/es5-shim).
An ES6 shim will be included once ES6 is finalized and a majority of browsers support all ES6 features.
Until then, ES6 features will be included piecewise.

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
  The names are included in [lib/polyfills.js](lib/polyfills.js).
- `exclude` - conversely, you can exclude specific polyfills.
- `cache` - folder to cache polyfill bundles. Defaults to this module's `cache/` folder.

### polyfill(useragent).build([minified], [gzipped]).then(js => )

Build and cache the bundle.

- `minified` - defaults to `process.env.NODE_ENV === 'production'`
- `gzipped` - whether to return a compressed buffer instead of a string (it's always compressed and cached anyways).

`js` is the final JS bundle that you can serve to the client.
You could also skip the `.build()` option and simply do `.then()`:

```js
polyfill(req.headers['user-agent']).then(function (js) {

})
```

Example Express usage:

```js
app.use(function (req, res) {
  if (req.path !== '/polyfills.js') return next()

  polyfill(req.headers['user-agent']).then(function (js) {
    res.set('Content-Type', 'application/javascript')
    res.set('Content-Length', Buffer.byteLength(js))
    res.end(js)
  }, next)
})
```

## Adding polyfills

Feel free to create PRs to add polyfills.
Checkout [lib/polyfills.js](lib/polyfills.js) to see what is needed.

[npm-image]: https://img.shields.io/npm/v/polyfills.svg?style=flat
[npm-url]: https://npmjs.org/package/polyfills
[travis-image]: https://img.shields.io/travis/polyfills/polyfills.svg?style=flat
[travis-url]: https://travis-ci.org/polyfills/polyfills
[coveralls-image]: https://img.shields.io/coveralls/polyfills/polyfills.svg?style=flat
[coveralls-url]: https://coveralls.io/r/polyfills/polyfills?branch=master
[gittip-image]: https://img.shields.io/gittip/jonathanong.svg?style=flat
[gittip-url]: https://www.gittip.com/jonathanong/
