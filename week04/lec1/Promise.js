function deferredMapper(val) {
	return new Promise((resolve, reject) => {
	setTimeout(() => {resolve(val*2), 10});
});
}

const arr = (() => {

	let arr = []

	for(var i = 0; i < 5; i++) {
		p = new Promise(function(resolve, reject){
			resolve(deferredMapper(Math.random() * (100 - 1) + 1))
		})
		arr.push(p)
	}
	arr.splice(1, 0, 5)
	arr.push(5)
	arr.push(5)

	return arr
})()

class MyPromise extends Promise
{
	constructor(func)
	{
		super(func)
	}
	static map(iterable, mapper)
	{
		return new this((resolve, reject) =>
		{
			let result = []
			let noPromise = []
			let pending = 0
			let counter = 0

			for (let promise of iterable)
			{
				if (typeof promise.then == 'function') {
					pending++
					promise.then(value =>
					{
						let item = mapper(value)
						if(typeof item.then == 'function') {
							Promise.resolve(item.then(value => {
								result.push(value)
							}))
						} else {
							result.push(item)
						}
						pending--

						if (!pending) {
							for(let item of noPromise) {
								result.splice(item.index, 0, item.value)
							}

							resolve(result)
						}
					},  reject)

				} else {
					let item = mapper(promise)

					if(typeof item.then == 'function') {
						pending++
						Promise.resolve(item.then(value => {
							noPromise.push({value: value, index: counter})
						pending--
						if (!pending) {
							for(let item of noPromise) {
								result.splice(item.index, 0, item.value)
							}

							resolve(result)
						}
						}, reject))
					} else {
							noPromise.push({value: item, index: counter})
					}
				}
				counter++
			}

			//if last item wasn't a promise
			if(!pending) {

				for(let item of noPromise) {
					result.splice(item.index, 0, item.value)
				}

				resolve(result)
			}
		})
	}

	static reduce(iterable, reducer, initial)
	{
		return new this((resolve, reject) =>
		{
			let result = []
			let noPromise = []
			let pending = 0
			let counter = 0

			for (let promise of iterable)
			{			  
				if (typeof promise.then == 'function') {
					pending++

					promise.then(value =>
					{
						result.push(value)
						pending--
						if (!pending) {
							for(let item of noPromise) {
								result.splice(item.index, 0, item.value)
							}
							if(initial) {
								//why not? :)
								result = result.reduce(function(previousValue, currentValue, index, array) {
									return reducer(previousValue, currentValue, index, array)
								}, initial)
							} else {
								//why not? :)
								result = result.reduce(function(previousValue, currentValue, index, array) {
									return reducer(previousValue, currentValue, index, array)
								})
							}
							resolve(result)
						}
					},  reject)

				} else {
					noPromise.push({value: promise, index: counter})
				}
				counter++
			}

			//if last item wasn't a promise			
			if (!pending) {
				for(let item of noPromise) {
					result.splice(item.index, 0, item.value)
				}
				if(initial) {
					result = result.reduce(function(previousValue, currentValue, index, array) {
						return reducer(previousValue, currentValue, index, array)
					}, initial)
				} else {
					result = result.reduce(function(previousValue, currentValue, index, array) {
						return reducer(previousValue, currentValue, index, array)
					})
				}
				resolve(result)
			}
		})
	}

	static some(iterable, num)
	{
		return new this((resolve, reject) =>
		{
			let result = []
			let pending = 0

			for (let promise of iterable)
			{
				if (typeof promise.then == 'function') {
					pending++
					promise.then(value => {
						result.push(value)
						pending--

						if (result.length > num) {
							result.length = 2
							resolve(result)
						}
					},  reject)

				} else {				
					result.push(promise)
				}
			}

			//if last item wasn't a promise
			if(result.length > num) {
				result.length = 2
				resolve(result)
			}
		})
	}
}
