RegExp.prototype.search||!function(){var e=function(){try{var e={},r=Object.defineProperty,t=r(e,e,e)&&r}catch(o){}return t}(),r={},t=r.toString,o=function(e,r){if("function"==typeof e.exec){var o=e.exec(r);if("object"!=typeof o)throw TypeError();return o}if("[object RegExp]"!=t.call(e))throw TypeError();return RegExp.prototype.exec.call(e,r)},n=function(e){var r=this;if(null===r||"object"!=typeof r)throw TypeError();var t=String(e),n=r.lastIndex;r.lastIndex=0;var c=o(r,t);return r.lastIndex=n,null===c?-1:c.index};e?e(RegExp.prototype,"search",{value:n,configurable:!0,writable:!0}):RegExp.prototype.search=n}();