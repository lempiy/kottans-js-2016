"use strict";

(function()
{

	var isEnumerable = Object.prototype.propertyIsEnumerable;

	Object.defineProperty(Object, "deepAssign",
	{
		value: function deepAssign(target, sources)
		{
			if (target == null) throw new TypeError('Target object cannot be null');

			var to = new target.constructor(target);

			for (var i = 1; i < arguments.length; i++)
			{
				var from = arguments[i];
				if (!isObject(from)) continue;

				Reflect.ownKeys(from).forEach(function(key)
				{
					if (isEnumerable.call(from, key)) {

						if(isObject(from[key]) && isObject(to[key])) {

							to[key] = Object.deepAssign(to[key], from[key]);

						} else {

							to[key] = from[key];
						}
					}
				});
			}

			return to;
		},
		writable: true,
		configurable: true
	})

	function isObject(value) {
		return value != null && typeof value === 'object';
	}
})()

//Object.deepAssign({a: {b: 0}}, {a: {b: 1, c: 2}}, {a: {c: 3}});
//=> {a: {b: 1, c: 3}}