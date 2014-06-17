
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
  filter: function (agent) {
    switch (agent.family) {
    case 'IE':
      return agent.satisfies('< 10')
    default:
      return true
    }
  }
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

exports.stringprototypecontains = {
  url: '/robertkowalski/contains.js/master/contains.js',
  filter: function (agent) {
    switch (agent.family) {
    case 'Firefox':
      return agent.satisfies('< 18')
    default:
      return true
    }
  }
}

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
