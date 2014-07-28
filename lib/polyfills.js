// to do:
// https://github.com/medikoo/es6-symbol
// https://github.com/tvcutsem/harmony-reflect

var chrome = /\bchrome\b/i
var ios = /\bmobile safari\b/i
var safari = /\bsafari\b/i
var opera = /\bopera\b/i
var ff = /\bfirefox\b/i
var ie = /\bie\b/i
var android = /\bandroid\b/i

/*
function (agent) {
  var family = agent.family
  if (ie.test(family)) return agent.satisfies('< ')
  if (ff.test(family)) return agent.satisfies('< ')
  if (chrome.test(family)) return agent.satisfies('< ')
  if (ios.test(family)) return agent.satisfies('< ')
  if (safari.test(family)) return agent.satisfies('< ')
  if (android.test(family)) return agent.satisfies('< ')
  if (opera.test(family)) return agent.satisfies('< ')
  return true
}
*/

exports.domelements = {
  shortName: 'domels',
  url: '/barberboy/dom-elements/master/lib/dom-elements.js',
  filter: always,
}

exports.dom4 = {
  url: '/webreflection/dom4/master/build/dom4.js',
  filter: always,
}

// http://caniuse.com/requestanimationframe
exports.requestanimationframe = {
  shortName: 'raf',
  url: '/darius/requestAnimationFrame/master/requestAnimationFrame.js',
  filter: function (agent) {
    var family = agent.family
    if (ie.test(family)) return agent.satisfies('< 10')
    if (ff.test(family)) return agent.satisfies('< 23')
    if (chrome.test(family)) return agent.satisfies('< 24')
    if (ios.test(family)) return agent.satisfies('< 7')
    if (safari.test(family)) return agent.satisfies('< 6.1')
    if (android.test(family)) return agent.satisfies('< 4.4')
    if (opera.test(family)) return agent.satisfies('< 15')
    return true
  }
}

// https://developer.mozilla.org/en-US/docs/Web/API/Window.setImmediate
exports.setimmediate = {
  shortName: 'si',
  url: '/YuzuJS/setImmediate/master/setImmediate.js',
  filter: iev('10')
}

// http://caniuse.com/eventsource
exports.eventsource = {
  shortName: 'es',
  url: '/Yaffle/EventSource/master/eventsource.js',
  filter: function (agent) {
    var family = agent.family
    // if (ie.test(family)) return agent.satisfies('< ')
    if (ff.test(family)) return agent.satisfies('< 6')
    if (chrome.test(family)) return agent.satisfies('< 6')
    if (ios.test(family)) return agent.satisfies('< 4')
    if (safari.test(family)) return agent.satisfies('< 5')
    if (android.test(family)) return agent.satisfies('< 4.4')
    if (opera.test(family)) return agent.satisfies('< 11')
    return true
  }
}

// http://caniuse.com/promises
exports.promise = {
  url: 'http://s3.amazonaws.com/es6-promises/promise-1.0.0.js',
  filter: function (agent) {
    var family = agent.family
    if (ie.test(family)) return agent.satisfies('< 12')
    if (ff.test(family)) return agent.satisfies('< 29')
    if (chrome.test(family)) return agent.satisfies('< 33')
    if (ios.test(family)) return agent.satisfies('< 8')
    if (safari.test(family)) return agent.satisfies('< 8')
    // if (android.test(family)) return agent.satisfies('< ')
    if (opera.test(family)) return agent.satisfies('< 22')
    return true
  }
}

exports.es5 = {
  url: '/es-shims/es5-shim/master/es5-shim.js',
  filter: es5
}

exports.base64 = {
  shortName: 'b64',
  url: '/davidchambers/Base64.js/master/base64.js',
  filter: function (agent) {
    if (ie.test(agent.family)) return agent.satisfies('< 10')
    return false
  }
}

// https://developer.mozilla.org/en-US/docs/Web/API/Performance.now()
exports.performancenow = {
  shortName: 'pnow',
  url: 'https://gist.githubusercontent.com/paulirish/5438650/raw/9912fea136c32c58ae086372a2083813d984c6da/performance.now()-polyfill.js',
  filter: function (agent) {
    var family = agent.family
    if (ie.test(family)) return agent.satisfies('< 10')
    if (ff.test(family)) return agent.satisfies('< 15')
    if (chrome.test(family)) return agent.satisfies('< 24')
    // if (ios.test(family)) return agent.satisfies('< ')
    // if (safari.test(family)) return agent.satisfies('< ')
    if (android.test(family)) return agent.satisfies('< 4')
    if (opera.test(family)) return agent.satisfies('< 15')
    return true
  }
}

// https://developer.mozilla.org/en-US/docs/Web/API/Window.matchMedia
exports.matchmedia = {
  shortName: 'mm',
  url: '/paulirish/matchMedia.js/master/matchMedia.js',
  filter: function (agent) {
    var family = agent.family
    if (ie.test(family)) return agent.satisfies('< 10')
    if (ff.test(family)) return agent.satisfies('< 6')
    if (chrome.test(family)) return agent.satisfies('< 9')
    if (ios.test(family)) return agent.satisfies('< 5')
    if (safari.test(family)) return agent.satisfies('< 5.1')
    if (android.test(family)) return agent.satisfies('< 3')
    if (opera.test(family)) return agent.satisfies('< 12.1')
    return true
  }
}

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/fromCodePoint
exports.stringfromcodepoint = {
  shortName: 'sfcp',
  url: '/mathiasbynens/String.fromCodePoint/master/fromcodepoint.js',
  filter: ffv('29')
}

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/codePointAt
exports.stringprototypecodepointat = {
  shortName: 'spcpa',
  url: '/mathiasbynens/String.prototype.codePointAt/master/codepointat.js',
  filter: ffv('29')
}

// exports.stringprototypeat = {
//   url: '/mathiasbynens/String.prototype.at/master/at.js',
//   filter: always,
// }

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/repeat
exports.stringprototyperepeat = {
  shortName: 'spr',
  url: '/mathiasbynens/String.prototype.repeat/master/repeat.js',
  filter: ffv('24')
}

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/startsWith
exports.stringprototypestartswith = {
  shortName: 'spsw',
  url: '/mathiasbynens/String.prototype.startsWith/master/startswith.js',
  filter: ffv('17')
}

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/endsWith
exports.stringprototypeendswith = {
  shortName: 'spew',
  url: '/mathiasbynens/String.prototype.endsWith/master/endswith.js',
  filter: ffv('17')
}

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/contains
exports.stringprototypecontains = {
  shortName: 'spc',
  url: '/mathiasbynens/String.prototype.contains/master/contains.js',
  filter: ffv('18')
}

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/from
exports.arrayfrom = {
  shortName: 'afrom',
  url: '/mathiasbynens/Array.from/master/array-from.js',
  filter: ffv('32')
}

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/of
exports.arrayof = {
  shortName: 'aof',
  url: '/mathiasbynens/Array.of/master/array-of.js',
  filter: ffv('25')
}

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/find
exports.arrayprototypefind = {
  shortName: 'apf',
  url: '/paulmillr/Array.prototype.find/master/index.js',
  filter: ffv('25')
}

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/findIndex
exports.arrayprototypefindindex = {
  shortName: 'apfi',
  url: '/paulmillr/Array.prototype.findIndex/master/index.js',
  filter: ffv('25')
}

// https://github.com/mathiasbynens/RegExp.prototype.search
exports.regexpprototypesearch = {
  shortName: 'reps',
  url: '/mathiasbynens/RegExp.prototype.search/master/regexp-prototype-search.js',
  filter: always
}

// https://github.com/mathiasbynens/RegExp.prototype.match
exports.regexpprototypematch = {
  shortName: 'repm',
  url: '/mathiasbynens/RegExp.prototype.match/master/regexp-prototype-match.js',
  filter: always,
}

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/setPrototypeOf#Browser_compatibility
exports.objectsetprototypeof = {
  shortName: 'ospo',
  url: '/polyfills/Object.setPrototypeOf/master/index.js',
  filter: function (agent) {
    var family = agent.family
    // if (ie.test(family)) return agent.satisfies('< ')
    if (ff.test(family)) return agent.satisfies('< 31')
    if (chrome.test(family)) return agent.satisfies('< 34')
    // if (ios.test(family)) return agent.satisfies('< ')
    // if (safari.test(family)) return agent.satisfies('< ')
    // if (android.test(family)) return agent.satisfies('< ')
    // if (opera.test(family)) return agent.satisfies('< ')
    return true
  }
}

// exports.functioncreate = {
//   url: '/walling/Function.create.js/master/Function.create.js',
//   filter: always,
// }

// always include
function always() {
  return true
}

// http://kangax.github.io/compat-table/es5/
function es5(agent) {
  var family = agent.family
  if (chrome.test(family)) return agent.satisfies('< 7')
  if (ios.test(family)) return agent.satisfies('< 6')
  if (safari.test(family)) return agent.satisfies('< 5.1.4')
  if (opera.test(family)) return agent.satisfies('< 12')
  if (ff.test(family)) return agent.satisfies('< 4')
  if (ie.test(family)) return agent.satisfies('< 9')
  if (android.test(family)) return agent.satisfies('< 4')
  return false
}

function ffv(version) {
  return function (agent) {
    if (ff.test(agent.family)) return agent.satisfies('< ' + version)
    return true
  }
}

function iev(version) {
  return function (agent) {
    if (ie.test(agent.family)) return agent.satisfies('< ' + version)
    return false
  }
}
