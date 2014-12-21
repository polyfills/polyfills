
var Promise = require('native-or-bluebird')
var request = require('requisition')
var db = require('polyfills-db')
var minify = require('mnfy').js
var lru = require('lru-cache')
var assert = require('assert')

var _polyfills = db.polyfills.polyfills
var agents = db.agents

module.exports = function (options) {
  options = options || {}

  // useragent -> build lookup
  var cache = lru(options.cache || {
    max: 1000
  })

  // setup which polyfills to use
  var polyfills
  if (Array.isArray(options.include)) {
    polyfills = _polyfills.filter(function (polyfill) {
      return ~options.include.indexOf(polyfill.name)
        || ~options.include.indexOf(polyfill.shortName)
    })
  } else if (Array.isArray(options.exclude)) {
    polyfills = _polyfills.filter(function (polyfill) {
      return !~options.exclude.indexOf(polyfill.name)
        && !~options.exclude.indexOf(polyfill.shortName)
    })
  } else {
    polyfills = _polyfills.slice()
  }

  return polyfill

  // create a useragent -> [polyfills] bundle and cache it
  function bundle(useragent) {
    var val = cache.get(useragent)
    if (val) return val

    // create a bundle
    val = agents.filter(polyfills, agents.parse(useragent))
    cache.set(useragent, val)
    return val
  }

  function polyfill(useragent) {
    return bundle(useragent).map(toJS).join('')
  }
}

module.exports.load = update()
module.exports.update = update

function update() {
  return Promise.all(_polyfills.map(_getJS))
}

function _getJS(polyfill) {
  return request(polyfill.url).then(function (response) {
    assert(response.status === 200)
    return response.text()
  }).then(function (js) {
    // remove when they make it auto polyfilling
    if (polyfill.name === 'promise') js += ';ES6Promise.polyfill();'
    return minify(js)
  }).then(function (res) {
    return polyfill.js = res.code
  })
}

function toJS(x) {
  return x.js
}
