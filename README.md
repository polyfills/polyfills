
# Polyfills

A user-agent-based polyfill combinator.
Create polyfill builds based on the client's browser and only send only what's needed.

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
The only exception are `ECMAScript` bundles such as [es5-shim](https://github.com/es-shims/es5-shim).
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

## Installation

```bash
npm install polyfills
```

This library uses promises.
If you're running a version of node that does not support Promises (anything lower than 0.11.13),
then you __must__ install `bluebird` as well:

```bash
npm install bluebird
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

### var js = yield* polyfill(useragent).build([minified])

This is the primary function.

- `minified` - defaults to `process.env.NODE_ENV === 'production'`

`js` is the final JS bundle that you can serve to the client.

Example Express usage:

```js
app.use(function (req, res) {
  if (req.path !== '/polyfills.js') return next()

  co(polyfill(req.headers['user-agent']).build())(function (err, string) {
    if (err) return next(err)

    res.set('Content-Type', 'application/javascript')
    res.send(string)
  })
})
```

## Adding polyfills

Feel free to create PRs to add polyfills.
Checkout [lib/polyfills.js](lib/polyfills.js) to see what is needed.
