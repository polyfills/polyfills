/*! http://mths.be/regexp-prototype-match v0.1.0 by @mathias */
if (!RegExp.prototype.match) {
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
		var match = function(string) {
			var rx = this;
			if (rx === null || typeof rx != 'object') {
				throw TypeError();
			}
			var S = String(string);
			var global = Boolean(rx.global);
			if (global !== true) {
				return RegExpExec(rx, S);
			}
			rx.lastIndex = 0;
			var A = [];
			var previousLastIndex = 0;
			var n = 0;
			while (true) {
				var result = RegExpExec(rx, S);
				if (result === null) {
					return n == 0 ? result : A;
				}
				var matchStr = result[0];
				A[n] = matchStr;
				++n;
			}
		};
		if (defineProperty) {
			defineProperty(RegExp.prototype, 'match', {
				'value': match,
				'configurable': true,
				'writable': true
			});
		} else {
			RegExp.prototype.match = match;
		}
	}());
}
