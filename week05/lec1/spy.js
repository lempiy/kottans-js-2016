var spy = Spy(console, 'log')
var spy2 = Spy(Math, 'random')
    
    console.log('calling console.log')
    console.log('calling console.log')
    console.log('calling console.log')
    console.log('calling console.log')

    Math.random()
    Math.random()
    Math.random()
    
    console.dir(spy.count) // 4
    console.dir(spy2.count) // 3

function Spy (target, method) {
	var nonchanged = target[method];
	var spy = {};
	spy.count = 0;
	target[method] = function() {
		spy.count++;
		nonchanged.apply(target, arguments);
		console.dir('calling ' + method);
	};
	return spy;
}

module.exports = Spy
