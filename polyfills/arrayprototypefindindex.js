!function(){if(!Array.prototype.findIndex){var t=function(t){var r=Object(this),e=Math.max(0,r.length)>>>0;if(0===e)return-1;if("function"!=typeof t||"[object Function]"!==Object.prototype.toString.call(t))throw new TypeError("Array#findIndex: predicate must be a function");for(var n=arguments.length>1?arguments[1]:void 0,o=0;e>o;o++)if(t.call(n,r[o],o,r))return o;return-1};if(Object.defineProperty)try{Object.defineProperty(Array.prototype,"findIndex",{value:t,configurable:!0,writable:!0})}catch(r){}Array.prototype.findIndex||(Array.prototype.findIndex=t)}}(this);