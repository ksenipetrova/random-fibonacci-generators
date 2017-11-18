'use strict';

var BigNumber = require('bignumber.js');

var tribonacciConstant = new BigNumber('1.839286755214161132551852564653286600424178746097592246778758639404203222081966425738435419428307014141979826859240974164178450746507436943831545820499513796249655539644613666121540277972678118941041');
var tribonacciConstant2 = tribonacciConstant.times(tribonacciConstant);
var tribonacciConstant3 = tribonacciConstant2.times(tribonacciConstant);

function InfiniteTribonacci() {
	this.index = 1;
	this._sequences = [
		new SequenceA(),
		new SequenceB(),
		new SequenceC()
	];
}

InfiniteTribonacci.prototype.next = function () {
	var sequence = this._sequences.find(function (seq) {
		return seq.current === this.index;
	});

	var result = sequence.current;
	
	sequence.next();
	this.index++;
	
	return result;
};

function SequenceA() {
	this.index = 0;
	this.next();
}

SequenceA.prototype.next = function () {
	var result = tribonacciConstant.times(this.index).floor();
	
	this.index++;
	this.current = result;
		
	return result;
};

function SequenceB() {
	this.index = 0;
	this.next();
}

SequenceB.prototype.next = function () {
	var result = tribonacciConstant2.times(this.index).floor();
	
	this.index++;
	this.current = result;
		
	return result;
};

function SequenceC() {
	this.index = 0;
	this.next();
}

SequenceC.prototype.next = function () {
	var result = tribonacciConstant3.times(this.index).floor();
	
	this.index++;
	this.current = result;
		
	return result;
};


var sequence = new SequenceC();
var seq = [];
for (var k = 0; k < 100; k++) {
	seq.push(sequence.next());
}
console.log(seq.join(', '));

module.exports = InfiniteTribonacci;