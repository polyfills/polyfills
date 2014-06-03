
var fs = require('mz/fs')
var co = require('co')
var path = require('path')
var mkdirp = require('mkdirp')
var request = require('cogent')

var polyfills = require('./polyfills')

var out = path.join(__dirname, '..', 'polyfills')

mkdirp.sync(out)

co(function* () {
  yield Object.keys(polyfills).map(function (name) { return function* () {
    var polyfill = polyfills[name]
    var url = polyfill.url
    if (url[0] === '/') url = 'https://cdn.rawgit.com' + url
    var destination = path.join(out, name + '.js')
    if (yield fs.exists(destination)) return
    yield* request(url, destination)
  }})
})()
