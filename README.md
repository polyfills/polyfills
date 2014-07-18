
# Polyfills

[![NPM version][npm-image]][npm-url]
[![build status][travis-image]][travis-url]
[![Test coverage][coveralls-image]][coveralls-url]
[![Gittip][gittip-image]][gittip-url]

A user-agent-based polyfill combinator.
Create polyfill builds based on the client's browser and send only what's needed.

- Parses user agent strings for `<family> <major>.<minor>.<version>` and creates polyfill bundles based on these variables.
- Caches builds locally to a `cache/` folder.
- Optionally minimizes builds (defaults to `true` in production).
- Stores nothing in memory, allowing you to use it within your app with minimal overhead.

This is based on [jonathantneal/polyfill](https://github.com/jonathantneal/polyfill),
but it has a couple of different philosophies:

- It does not use its own polyfills and instead uses well tested polyfill libraries instead.
- It does not try to optimize bundle sizes.
- It does not use its own user agent parsing.

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
- All of [Mathias Bynens](https://github.com/mathiasbynens) and [Paul Miller](https://github.com/paulmillr)'s string and array polyfills
## Installation

```bash
npm install polyfills
```

## Usage

### var polyfill = Polyfills([options])

```js
var polyfill = require('polyfills')({
  include: []
})
```

Return a new instance of `polyfill` based on `options`.

- `include` - which polyfills to include.
  This is an __inclusive__ list.
  The names are included in [lib/polyfills.js](lib/polyfills.js).
- `cache` - folder to cache polyfill bundles.

### polyfill(useragent).build([minified], [gzipped]).then()

This is the primary function.

- `minified` - defaults to `process.env.NODE_ENV === 'production'`
- `gzipped` - whether to return a compressed buffer instead of a string.

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
