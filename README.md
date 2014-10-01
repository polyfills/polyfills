
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
- Caches builds locally.
- Creates minified and gzipped builds.
- Returns metadata for the `Content-Encoding`, `Content-Length` and `ETag` headers.
- Allows you to choose between which build you'd like and whether to read it or stream it.

It also stores nothing in memory, making it suitable for production usage within existing node apps.

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

### polyfill.clean()

Clean all the bundles from the cache.

### polyfill(useragent).then( data => )

Build and cache the bundle. Returns data with:

- `name` - the name of the build
- `hash` - a `sha256` sha sum of the JS file for `ETag` headers
- `polyfills[]` - an array of all the polyfills' names used
- `length[extension]` - the byte size of each build for `Content-Length` headers

The possible extensions are:

- `.json` - where the metadata is stored
- `.js`
- `.js.gz`
- `.min.js`
- `.min.js.gz`

### polyfill.read(name, ext, [encoding]).then( buf => )

Read a bundle.

### var stream = polyfill.stream(name, ext)

Stream a bundle.

### var filename = polyfill.pathOf(name, ext)

Get the filename of a bundle.

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
