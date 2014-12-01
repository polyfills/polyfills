
var co = require('co')
var fs = require('mz/fs')
var path = require('path')
var rimraf = require('rimraf')
var mkdirp = require('mkdirp')
var request = require('cogent')
var polyfills = require('polyfills-db').polyfills.polyfills

var out = path.join(__dirname, 'polyfills')

rimraf.sync(out)
mkdirp.sync(out)

co(function* () {
  yield polyfills.map(function* (polyfill) {
    var url = polyfill.url
    var name = polyfill.name
    var destination = path.join(out, name + '.js')
    yield* request(url, {
      timeout: 30000,
      destination: destination
    })
    console.log('downloading "%s"', url)
  })
  var prom = yield fs.readFile('polyfills/promise.js', 'utf8')
  prom += '\n\nES6Promise.polyfill();\n'
  yield fs.writeFile('polyfills/promise.js', prom)
})()
