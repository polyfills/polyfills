/*!
* contains.js - A simple ES6 String.prototype.contains Polyfill
* v1.0.0 - 2013-03-18
* https://github.com/robertkowalski/contains.js
* Copyright (c) 2013 Robert Kowalski; Licensed MIT
*/
;(function() {
  'use strict';

  if (typeof String.prototype.contains == 'function') {
    return;
  }

  String.prototype.contains = function(value, pos) {
    var string = this;
    if (pos) {
      string = string.slice(pos);
    }
    return string.indexOf(value.toString()) !== -1;
  };

})();
