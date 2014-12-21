!function(t,e){"use strict";"function"==typeof define&&define.amd?define(e):"object"==typeof exports?module.exports=e():t.returnExports=e()}(this,function(){function t(t){var e=+t;return e!==e?e=0:0!==e&&e!==1/0&&e!==-(1/0)&&(e=(e>0||-1)*Math.floor(Math.abs(e))),e}function e(t){var e=typeof t;return null===t||"undefined"===e||"boolean"===e||"number"===e||"string"===e}function r(t){var r,n,i;if(e(t))return t;if(n=t.valueOf,y(n)&&(r=n.call(t),e(r)))return r;if(i=t.toString,y(i)&&(r=i.call(t),e(r)))return r;throw new TypeError}var n,i=Array.prototype,o=Object.prototype,a=Function.prototype,u=String.prototype,l=Number.prototype,s=i.slice,c=i.splice,f=i.push,p=i.unshift,h=a.call,g=o.toString,y=function(t){return"[object Function]"===g.call(t)},d=function(t){return"[object RegExp]"===g.call(t)},v=function(t){return"[object Array]"===g.call(t)},m=function(t){return"[object String]"===g.call(t)},b=function(t){var e=g.call(t),r="[object Arguments]"===e;return r||(r=!v(t)&&null!==t&&"object"==typeof t&&"number"==typeof t.length&&t.length>=0&&y(t.callee)),r},w=Object.defineProperty&&function(){try{return Object.defineProperty({},"x",{}),!0}catch(t){return!1}}();n=w?function(t,e,r,n){!n&&e in t||Object.defineProperty(t,e,{configurable:!0,enumerable:!1,writable:!0,value:r})}:function(t,e,r,n){!n&&e in t||(t[e]=r)};var x=function(t,e,r){for(var i in e)o.hasOwnProperty.call(e,i)&&n(t,i,e[i],r)},O={ToObject:function(t){if(null==t)throw new TypeError("can't convert "+t+" to object");return Object(t)},ToUint32:function(t){return t>>>0}},T=function(){};x(a,{bind:function(t){var e=this;if(!y(e))throw new TypeError("Function.prototype.bind called on incompatible "+e);for(var r,n=s.call(arguments,1),i=function(){if(this instanceof r){var i=e.apply(this,n.concat(s.call(arguments)));return Object(i)===i?i:this}return e.apply(t,n.concat(s.call(arguments)))},o=Math.max(0,e.length-n.length),a=[],u=0;o>u;u++)a.push("$"+u);return r=Function("binder","return function ("+a.join(",")+"){ return binder.apply(this, arguments); }")(i),e.prototype&&(T.prototype=e.prototype,r.prototype=new T,T.prototype=null),r}});var j=h.bind(o.hasOwnProperty),S=function(){var t=[1,2],e=t.splice();return 2===t.length&&v(e)&&0===e.length}();x(i,{splice:function(){return 0===arguments.length?[]:c.apply(this,arguments)}},!S);var E=function(){var t={};return i.splice.call(t,0,0,1),1===t.length}();x(i,{splice:function(e,r){if(0===arguments.length)return[];var n=arguments;return this.length=Math.max(t(this.length),0),arguments.length>0&&"number"!=typeof r&&(n=s.call(arguments),n.length<2?n.push(this.length-e):n[1]=t(r)),c.apply(this,n)}},!E);var N=1!==[].unshift(0);x(i,{unshift:function(){return p.apply(this,arguments),this.length}},N),x(Array,{isArray:v});var I=Object("a"),D="a"!==I[0]||!(0 in I),M=function(t){var e=!0,r=!0;return t&&(t.call("foo",function(t,r,n){"object"!=typeof n&&(e=!1)}),t.call([1],function(){"use strict";r="string"==typeof this},"x")),!!t&&e&&r};x(i,{forEach:function(t){var e=O.ToObject(this),r=D&&m(this)?this.split(""):e,n=arguments[1],i=-1,o=r.length>>>0;if(!y(t))throw new TypeError;for(;++i<o;)i in r&&t.call(n,r[i],i,e)}},!M(i.forEach)),x(i,{map:function(t){var e=O.ToObject(this),r=D&&m(this)?this.split(""):e,n=r.length>>>0,i=Array(n),o=arguments[1];if(!y(t))throw new TypeError(t+" is not a function");for(var a=0;n>a;a++)a in r&&(i[a]=t.call(o,r[a],a,e));return i}},!M(i.map)),x(i,{filter:function(t){var e,r=O.ToObject(this),n=D&&m(this)?this.split(""):r,i=n.length>>>0,o=[],a=arguments[1];if(!y(t))throw new TypeError(t+" is not a function");for(var u=0;i>u;u++)u in n&&(e=n[u],t.call(a,e,u,r)&&o.push(e));return o}},!M(i.filter)),x(i,{every:function(t){var e=O.ToObject(this),r=D&&m(this)?this.split(""):e,n=r.length>>>0,i=arguments[1];if(!y(t))throw new TypeError(t+" is not a function");for(var o=0;n>o;o++)if(o in r&&!t.call(i,r[o],o,e))return!1;return!0}},!M(i.every)),x(i,{some:function(t){var e=O.ToObject(this),r=D&&m(this)?this.split(""):e,n=r.length>>>0,i=arguments[1];if(!y(t))throw new TypeError(t+" is not a function");for(var o=0;n>o;o++)if(o in r&&t.call(i,r[o],o,e))return!0;return!1}},!M(i.some));var F=!1;i.reduce&&(F="object"==typeof i.reduce.call("es5",function(t,e,r,n){return n})),x(i,{reduce:function(t){var e=O.ToObject(this),r=D&&m(this)?this.split(""):e,n=r.length>>>0;if(!y(t))throw new TypeError(t+" is not a function");if(!n&&1===arguments.length)throw new TypeError("reduce of empty array with no initial value");var i,o=0;if(arguments.length>=2)i=arguments[1];else for(;;){if(o in r){i=r[o++];break}if(++o>=n)throw new TypeError("reduce of empty array with no initial value")}for(;n>o;o++)o in r&&(i=t.call(void 0,i,r[o],o,e));return i}},!F);var R=!1;i.reduceRight&&(R="object"==typeof i.reduceRight.call("es5",function(t,e,r,n){return n})),x(i,{reduceRight:function(t){var e=O.ToObject(this),r=D&&m(this)?this.split(""):e,n=r.length>>>0;if(!y(t))throw new TypeError(t+" is not a function");if(!n&&1===arguments.length)throw new TypeError("reduceRight of empty array with no initial value");var i,o=n-1;if(arguments.length>=2)i=arguments[1];else for(;;){if(o in r){i=r[o--];break}if(--o<0)throw new TypeError("reduceRight of empty array with no initial value")}if(0>o)return i;do o in r&&(i=t.call(void 0,i,r[o],o,e));while(o--);return i}},!R);var U=Array.prototype.indexOf&&-1!==[0,1].indexOf(1,2);x(i,{indexOf:function(e){var r=D&&m(this)?this.split(""):O.ToObject(this),n=r.length>>>0;if(!n)return-1;var i=0;for(arguments.length>1&&(i=t(arguments[1])),i=i>=0?i:Math.max(0,n+i);n>i;i++)if(i in r&&r[i]===e)return i;return-1}},U);var C=Array.prototype.lastIndexOf&&-1!==[0,1].lastIndexOf(0,-3);x(i,{lastIndexOf:function(e){var r=D&&m(this)?this.split(""):O.ToObject(this),n=r.length>>>0;if(!n)return-1;var i=n-1;for(arguments.length>1&&(i=Math.min(i,t(arguments[1]))),i=i>=0?i:n-Math.abs(i);i>=0;i--)if(i in r&&e===r[i])return i;return-1}},C);var k=!{toString:null}.propertyIsEnumerable("toString"),A=function(){}.propertyIsEnumerable("prototype"),P=["toString","toLocaleString","valueOf","hasOwnProperty","isPrototypeOf","propertyIsEnumerable","constructor"],Z=P.length;x(Object,{keys:function(t){var e=y(t),r=b(t),n=null!==t&&"object"==typeof t,i=n&&m(t);if(!n&&!e&&!r)throw new TypeError("Object.keys called on a non-object");var o=[],a=A&&e;if(i||r)for(var u=0;u<t.length;++u)o.push(String(u));else for(var l in t)a&&"prototype"===l||!j(t,l)||o.push(String(l));if(k)for(var s=t.constructor,c=s&&s.prototype===t,f=0;Z>f;f++){var p=P[f];c&&"constructor"===p||!j(t,p)||o.push(p)}return o}});var J=Object.keys&&function(){return 2===Object.keys(arguments).length}(1,2),z=Object.keys;x(Object,{keys:function(t){return z(b(t)?i.slice.call(t):t)}},!J);var $=-621987552e5,B="-000001",H=Date.prototype.toISOString&&-1===new Date($).toISOString().indexOf(B);x(Date.prototype,{toISOString:function(){var t,e,r,n,i;if(!isFinite(this))throw new RangeError("Date.prototype.toISOString called on non-finite value.");for(n=this.getUTCFullYear(),i=this.getUTCMonth(),n+=Math.floor(i/12),i=(i%12+12)%12,t=[i+1,this.getUTCDate(),this.getUTCHours(),this.getUTCMinutes(),this.getUTCSeconds()],n=(0>n?"-":n>9999?"+":"")+("00000"+Math.abs(n)).slice(n>=0&&9999>=n?-4:-6),e=t.length;e--;)r=t[e],10>r&&(t[e]="0"+r);return n+"-"+t.slice(0,2).join("-")+"T"+t.slice(2).join(":")+"."+("000"+this.getUTCMilliseconds()).slice(-3)+"Z"}},H);var L=!1;try{L=Date.prototype.toJSON&&null===new Date(0/0).toJSON()&&-1!==new Date($).toJSON().indexOf(B)&&Date.prototype.toJSON.call({toISOString:function(){return!0}})}catch(X){}L||(Date.prototype.toJSON=function(){var t,e=Object(this),n=r(e);if("number"==typeof n&&!isFinite(n))return null;if(t=e.toISOString,"function"!=typeof t)throw new TypeError("toISOString property is not callable");return t.call(e)});var Y=1e15===Date.parse("+033658-09-27T01:46:40.000Z"),q=!isNaN(Date.parse("2012-04-04T24:00:00.500Z"))||!isNaN(Date.parse("2012-11-31T23:59:59.000Z")),G=isNaN(Date.parse("2000-01-01T00:00:00.000Z"));(!Date.parse||G||q||!Y)&&(Date=function(t){function e(r,n,i,o,a,u,l){var s=arguments.length;if(this instanceof t){var c=1===s&&String(r)===r?new t(e.parse(r)):s>=7?new t(r,n,i,o,a,u,l):s>=6?new t(r,n,i,o,a,u):s>=5?new t(r,n,i,o,a):s>=4?new t(r,n,i,o):s>=3?new t(r,n,i):s>=2?new t(r,n):s>=1?new t(r):new t;return c.constructor=e,c}return t.apply(this,arguments)}function r(t,e){var r=e>1?1:0;return o[e]+Math.floor((t-1969+r)/4)-Math.floor((t-1901+r)/100)+Math.floor((t-1601+r)/400)+365*(t-1970)}function n(e){return Number(new t(1970,0,1,0,0,0,e))}var i=new RegExp("^(\\d{4}|[+-]\\d{6})(?:-(\\d{2})(?:-(\\d{2})(?:T(\\d{2}):(\\d{2})(?::(\\d{2})(?:(\\.\\d{1,}))?)?(Z|(?:([-+])(\\d{2}):(\\d{2})))?)?)?)?$"),o=[0,31,59,90,120,151,181,212,243,273,304,334,365];for(var a in t)e[a]=t[a];return e.now=t.now,e.UTC=t.UTC,e.prototype=t.prototype,e.prototype.constructor=e,e.parse=function(e){var o=i.exec(e);if(o){var a,u=Number(o[1]),l=Number(o[2]||1)-1,s=Number(o[3]||1)-1,c=Number(o[4]||0),f=Number(o[5]||0),p=Number(o[6]||0),h=Math.floor(1e3*Number(o[7]||0)),g=Boolean(o[4]&&!o[8]),y="-"===o[9]?1:-1,d=Number(o[10]||0),v=Number(o[11]||0);return(f>0||p>0||h>0?24:25)>c&&60>f&&60>p&&1e3>h&&l>-1&&12>l&&24>d&&60>v&&s>-1&&s<r(u,l+1)-r(u,l)&&(a=60*(24*(r(u,l)+s)+c+d*y),a=1e3*(60*(a+f+v*y)+p)+h,g&&(a=n(a)),a>=-864e13&&864e13>=a)?a:0/0}return t.parse.apply(this,arguments)},e}(Date)),Date.now||(Date.now=function(){return(new Date).getTime()});var K=l.toFixed&&("0.000"!==8e-5.toFixed(3)||"1"!==.9.toFixed(0)||"1.25"!==1.255.toFixed(2)||"1000000000000000128"!==0xde0b6b3a7640080.toFixed(0)),Q={base:1e7,size:6,data:[0,0,0,0,0,0],multiply:function(t,e){for(var r=-1;++r<Q.size;)e+=t*Q.data[r],Q.data[r]=e%Q.base,e=Math.floor(e/Q.base)},divide:function(t){for(var e=Q.size,r=0;--e>=0;)r+=Q.data[e],Q.data[e]=Math.floor(r/t),r=r%t*Q.base},numToString:function(){for(var t=Q.size,e="";--t>=0;)if(""!==e||0===t||0!==Q.data[t]){var r=String(Q.data[t]);""===e?e=r:e+="0000000".slice(0,7-r.length)+r}return e},pow:function le(t,e,r){return 0===e?r:e%2===1?le(t,e-1,r*t):le(t*t,e/2,r)},log:function(t){for(var e=0;t>=4096;)e+=12,t/=4096;for(;t>=2;)e+=1,t/=2;return e}};x(l,{toFixed:function(t){var e,r,n,i,o,a,u,l;if(e=Number(t),e=e!==e?0:Math.floor(e),0>e||e>20)throw new RangeError("Number.toFixed called with invalid number of decimals");if(r=Number(this),r!==r)return"NaN";if(-1e21>=r||r>=1e21)return String(r);if(n="",0>r&&(n="-",r=-r),i="0",r>1e-21)if(o=Q.log(r*Q.pow(2,69,1))-69,a=0>o?r*Q.pow(2,-o,1):r/Q.pow(2,o,1),a*=4503599627370496,o=52-o,o>0){for(Q.multiply(0,a),u=e;u>=7;)Q.multiply(1e7,0),u-=7;for(Q.multiply(Q.pow(10,u,1),0),u=o-1;u>=23;)Q.divide(1<<23),u-=23;Q.divide(1<<u),Q.multiply(1,1),Q.divide(2),i=Q.numToString()}else Q.multiply(0,a),Q.multiply(1<<-o,0),i=Q.numToString()+"0.00000000000000000000".slice(2,2+e);return e>0?(l=i.length,i=e>=l?n+"0.0000000000000000000".slice(0,e-l+2)+i:n+i.slice(0,l-e)+"."+i.slice(l-e)):i=n+i,i}},K);var V=u.split;2!=="ab".split(/(?:ab)*/).length||4!==".".split(/(.?)(.?)/).length||"t"==="tesst".split(/(s)*/)[1]||4!=="test".split(/(?:)/,-1).length||"".split(/.?/).length||".".split(/()()/).length>1?!function(){var t="undefined"==typeof/()??/.exec("")[1];u.split=function(e,r){var n=this;if("undefined"==typeof e&&0===r)return[];if("[object RegExp]"!==g.call(e))return V.call(this,e,r);var i,o,a,u,l=[],s=(e.ignoreCase?"i":"")+(e.multiline?"m":"")+(e.extended?"x":"")+(e.sticky?"y":""),c=0;for(e=new RegExp(e.source,s+"g"),n+="",t||(i=new RegExp("^"+e.source+"$(?!\\s)",s)),r="undefined"==typeof r?-1>>>0:O.ToUint32(r);(o=e.exec(n))&&(a=o.index+o[0].length,!(a>c&&(l.push(n.slice(c,o.index)),!t&&o.length>1&&o[0].replace(i,function(){for(var t=1;t<arguments.length-2;t++)"undefined"==typeof arguments[t]&&(o[t]=void 0)}),o.length>1&&o.index<n.length&&f.apply(l,o.slice(1)),u=o[0].length,c=a,l.length>=r)));)e.lastIndex===o.index&&e.lastIndex++;return c===n.length?(u||!e.test(""))&&l.push(""):l.push(n.slice(c)),l.length>r?l.slice(0,r):l}}():"0".split(void 0,0).length&&(u.split=function(t,e){return"undefined"==typeof t&&0===e?[]:V.call(this,t,e)});var W=u.replace,_=function(){var t=[];return"x".replace(/x(.)?/g,function(e,r){t.push(r)}),1===t.length&&"undefined"==typeof t[0]}();_||(u.replace=function(t,e){var r=y(e),n=d(t)&&/\)[*?]/.test(t.source);if(r&&n){var i=function(r){var n=arguments.length,i=t.lastIndex;t.lastIndex=0;var o=t.exec(r)||[];return t.lastIndex=i,o.push(arguments[n-2],arguments[n-1]),e.apply(this,o)};return W.call(this,t,i)}return W.call(this,t,e)});var te=u.substr,ee="".substr&&"b"!=="0b".substr(-1);x(u,{substr:function(t,e){return te.call(this,0>t&&(t=this.length+t)<0?0:t,e)}},ee);var re="	\n\f\r   ᠎             　\u2028\u2029﻿",ne="​",ie="["+re+"]",oe=new RegExp("^"+ie+ie+"*"),ae=new RegExp(ie+ie+"*$"),ue=u.trim&&(re.trim()||!ne.trim());x(u,{trim:function(){if("undefined"==typeof this||null===this)throw new TypeError("can't convert "+this+" to object");return String(this).replace(oe,"").replace(ae,"")}},ue),(8!==parseInt(re+"08")||22!==parseInt(re+"0x16"))&&(parseInt=function(t){var e=/^0[xX]/;return function(r,n){return r=String(r).trim(),Number(n)||(n=e.test(r)?16:10),t(r,n)}}(parseInt))});