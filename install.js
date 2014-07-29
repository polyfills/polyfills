
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
    if (url[0] === '/') url = 'https://rawgit.com' + url
    var destination = path.join(out, name + '.js')
    yield* request(url, destination)
  })
})()
