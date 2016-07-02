"use strict"

const add = strings =>
{
	let array = strings.match(/^\/\/(.+)+\n/)

	if(array)
	{
		let length = array[0].length
		let delim = array[1]

		let multdelim = delim.match(/[^[\]]+(?=])/g)

		if(multdelim) {
			multdelim = multdelim.map((str) => str.split('').map((item) => '\\' + item).join('')) //character escaping
			delim = multdelim.join('|')
		}

		strings = strings.slice(length)
		var pattern = RegExp(delim, 'g')	
	}
	else pattern = /[,\n]/g

	strings = strings
		.split(pattern)
		.map(Number)
	let negatives = strings.filter((num) => num < 0)

	if(negatives.length) throw Error('Negative numbers like ' + negatives.join(', ') + ' are not allowed')

	return strings
		.filter((num) => num <= 1000)
		.reduce((sum, num) => sum + num)
}

module.exports = add