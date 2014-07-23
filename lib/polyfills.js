// to do:
// https://github.com/medikoo/es6-symbol
// https://github.com/tvcutsem/harmony-reflect


exports.domelements = {
  url: '/barberboy/dom-elements/master/lib/dom-elements.js',
  filter: always,
}

exports.dom4 = {
  url: '/webreflection/dom4/master/build/dom4.js',
  filter: always,
}

// http://caniuse.com/requestanimationframe
exports.requestanimationframe = {
  url: '/darius/requestAnimationFrame/master/requestAnimationFrame.js',
  filter: function (agent) {
    switch (agent.family) {
    case 'Chrome':
      return agent.satisfies('< 24')
    case 'Firefox':
      return agent.satisfies('< 23')
    case 'Safari':
      return agent.satisfies('< 6.1')
    case 'Mobile Safari':
      return agent.satisfies('< 7')
    case 'Android':
      return agent.satisfies('< 4.4')
    case 'Opera':
      return agent.satisfies('< 15')
    case 'IE':
      return agent.satisfies('< 10')
    default:
      return true
    }
  }
}

// https://developer.mozilla.org/en-US/docs/Web/API/Window.setImmediate
exports.setimmediate = {
  url: '/YuzuJS/setImmediate/master/setImmediate.js',
  filter: ie('10')
}

// http://caniuse.com/eventsource
exports.eventsource = {
  url: '/Yaffle/EventSource/master/eventsource.js',
  filter: function (agent) {
    switch (agent.family) {
    case 'Chrome':
      return agent.satisfies('< 6')
    case 'Firefox':
      return agent.satisfies('< 6')
    case 'Safari':
      return agent.satisfies('< 5')
    case 'Mobile Safari':
      return agent.satisfies('< 4')
    case 'Android':
      return agent.satisfies('< 4.4')
    case 'Opera':
      return agent.satisfies('< 11')
    default:
      return true
    }
  }
}

// http://caniuse.com/promises
exports.promise = {
  url: 'http://s3.amazonaws.com/es6-promises/promise-1.0.0.js',
  filter: function (agent) {
    switch (agent.family) {
    case 'Chrome':
      return agent.satisfies('< 33')
    case 'Firefox':
      return agent.satisfies('< 29')
    case 'Safari':
      return agent.satisfies('< 8')
    case 'Mobile Safari':
      return agent.satisfies('< 8')
    case 'Opera':
      return agent.satisfies('< 20')
    case 'IE':
      return agent.satisfies('< 12')
    default:
      return true
    }
  }
}

exports.es5 = {
  url: '/es-shims/es5-shim/master/es5-shim.js',
  filter: es5
}

exports.base64 = {
  url: '/davidchambers/Base64.js/master/base64.js',
  filter: function (agent) {
    switch (agent.family) {
    case 'IE':
      return agent.satisfies('< 10')
    default:
      return false
    }
  }
}

exports.performancenow = {
  url: 'https://gist.githubusercontent.com/paulirish/5438650/raw/9912fea136c32c58ae086372a2083813d984c6da/performance.now()-polyfill.js',
  filter: function (agent) {
    switch (agent.family) {
    case 'Chrome':
      return agent.satisfies('< 24')
    case 'Firefox':
      return agent.satisfies('< 15')
    case 'Opera':
      return agent.satisfies('< 15')
    case 'IE':
      return agent.satisfies('< 10')
    default:
      return true
    }
  }
}

exports.matchmedia = {
  url: '/paulirish/matchMedia.js/master/matchMedia.js',
  filter: function (agent) {
    switch (agent.family) {
    case 'Chrome':
      return agent.satisfies('< 9')
    case 'Firefox':
      return agent.satisfies('< 6')
    case 'Safari':
      return agent.satisfies('< 5.1')
    case 'Mobile Safari':
      return agent.satisfies('< 5')
    case 'Android':
      return agent.satisfies('< 3')
    case 'Opera':
      return agent.satisfies('< 12.1')
    case 'IE':
      return agent.satisfies('< 10')
    default:
      return true
    }
  }
}

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/fromCodePoint
exports.stringfromcodepoint = {
  url: '/mathiasbynens/String.fromCodePoint/master/fromcodepoint.js',
  filter: ff('29')
}

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/codePointAt
exports.stringprototypecodepointat = {
  url: '/mathiasbynens/String.prototype.codePointAt/master/codepointat.js',
  filter: ff('29')
}

// exports.stringprototypeat = {
//   url: '/mathiasbynens/String.prototype.at/master/at.js',
//   filter: always,
// }

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/repeat
exports.stringprototyperepeat = {
  url: '/mathiasbynens/String.prototype.repeat/master/repeat.js',
  filter: ff('24')
}

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/startsWith
exports.stringprototypestartswith = {
  url: '/mathiasbynens/String.prototype.startsWith/master/startswith.js',
  filter: ff('17')
}

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/endsWith
exports.stringprototypeendswith = {
  url: '/mathiasbynens/String.prototype.endsWith/master/endswith.js',
  filter: ff('17')
}

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/contains
exports.stringprototypecontains = {
  url: '/mathiasbynens/String.prototype.contains/master/contains.js',
  filter: ff('18')
}

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/from
exports.arrayfrom = {
  url: '/mathiasbynens/Array.from/master/array-from.js',
  filter: ff('32')
}

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/of
exports.arrayof = {
  url: '/mathiasbynens/Array.of/master/array-of.js',
  filter: ff('25')
}

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/find
exports.arrayprototypefind = {
  url: '/paulmillr/Array.prototype.find/master/index.js',
  filter: ff('25')
}

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/findIndex
exports.arrayprototypefindindex = {
  url: '/paulmillr/Array.prototype.findIndex/master/index.js',
  filter: ff('25')
}

// https://github.com/mathiasbynens/RegExp.prototype.search
exports.regexpprototypesearch = {
  url: '/mathiasbynens/RegExp.prototype.search/master/regexp-prototype-search.js',
  filter: always
}

// https://github.com/mathiasbynens/RegExp.prototype.match
exports.regexpprototypematch = {
  url: '/mathiasbynens/RegExp.prototype.match/master/regexp-prototype-match.js',
  filter: always,
}

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/setPrototypeOf#Browser_compatibility
exports.objectsetprototypeof = {
  url: '/polyfills/Object.setPrototypeOf/master/index.js',
  filter: function (agent) {
    switch (agent.family) {
    case 'Chrome':
      return agent.satisfies('< 34')
    case 'Firefox':
      return agent.satisfies('< 31')
    }
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
  switch (agent.family) {
  case 'Chrome':
    return agent.satisfies('< 7')
  case 'Firefox':
    return agent.satisfies('< 4')
  case 'Safari':
    return agent.satisfies('< 5.1.4')
  case 'Mobile Safari':
    return agent.satisfies('< 6')
  case 'Opera':
    return agent.satisfies('< 12')
  case 'IE':
    return agent.satisfies('< 9')
  default:
    // we're only concerned about IE < 8
    return false
  }
}

function ff(version) {
  return function (agent) {
    switch (agent.family) {
    case 'Firefox':
      return agent.satisfies('< ' + version)
    default:
      return true
    }
  }
}

function ie(version) {
  return function (agent) {
    switch (agent.family) {
    case 'IE':
      return agent.satisfies('< ' + version)
    default:
      return false
    }
  }
}
