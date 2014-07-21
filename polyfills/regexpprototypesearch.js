/*! http://mths.be/regexp-prototype-search v0.1.0 by @mathias */
if (!RegExp.prototype.search) {
	(function() {
		var defineProperty = (function() {
			// IE 8 only supports `Object.defineProperty` on DOM elements.
			try {
				var object = {};
				var $defineProperty = Object.defineProperty;
				var result = $defineProperty(object, object, object) && $defineProperty;
			} catch (exception) {}
			return result;
		}());
		var object = {};
		var toString = object.toString;
		var RegExpExec = function(R, S) {
			// This is an implementation of http://mths.be/es6#sec-regexpexec, with
			// the redundant steps for this particular use case omitted.
			if (typeof R.exec == 'function') {
				var result = R.exec(S);
				if (typeof result != 'object') {
					throw TypeError();
				}
				return result;
			}
			if (toString.call(R) != '[object RegExp]') {
				throw TypeError();
			}
			return RegExp.prototype.exec.call(R, S);
		};
		var search = function(string) {
			var rx = this;
			if (rx === null || typeof rx != 'object') {
				throw TypeError();
			}
			var S = String(string);
			var previousLastIndex = rx.lastIndex;
			rx.lastIndex = 0;
			var result = RegExpExec(rx, S);
			rx.lastIndex = previousLastIndex;
			return result === null ? -1 : result.index;
		};
		if (defineProperty) {
			defineProperty(RegExp.prototype, 'search', {
				'value': search,
				'configurable': true,
				'writable': true
			});
		} else {
			RegExp.prototype.search = search;
		}
	}());
}
