
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
See https://polyfills.github.io for more details.

## Description

This library is merely the "logic" and does not handle any HTTP serving.
It essentially does the following:

- Parses user agent strings for `<family> <major>.<minor>.<version>` and creates polyfill bundles based on these variables.
- Returned a bundle of all the minified polyfills.

## Installation

```bash
npm install polyfills
```

## Usage

```js
var polyfills = require('polyfills')
var polyfill = polyfills(options)
var js = polyfill(<useragent>)
```

### polyfills.load.then( => )

The first `.update()` instance.
Wait until the polyfills are loaded before using this library.

### polyfills.update().then( => )

Reload all the polyfills from the source.

### var polyfill = polyfills([options])

The options are:

- `include` - which polyfills to include.
  This is an __inclusive__ list.
  The names are included in [polyfills/db](https://github.com/polyfills/db/blob/master/lib/polyfills.js).
- `exclude` - conversely, you can exclude specific polyfills.

### var js = polyfill(useragent)

Bundle a polyfill for a useragent.

```js
app.use(function (req, res, next) {
  var js = polyfill(req.headers['user-agent')
  res.type('js')
  res.send(js)
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
