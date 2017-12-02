'use strict';

var p = 5651;
var q = 5623;
var M = p * q;

var x = undefined;

function BlumBlumShubGenerator(seed) {
	this._seed = seed;
	this._x = null;
	this.seed(seed);
}

BlumBlumShubGenerator.prototype.next = next;

BlumBlumShubGenerator.prototype.seed = seed;

/** Get the gcd of two numbers, A and B. */
function gcd(a, b) {
	while(a != b) {
		if(a > b) {
			a = a - b;
		} else {
			b = b - a;
		}
	}
	return a;
}

/** Seed the random number generator. */
function seed(s) {
	if(s == 0) {
		throw new Error("The seed x[0] cannot be 0");
	} else if(s == 1) {
		throw new Error("The seed x[0] cannot be 1");
	} else if(gcd(s, M) != 1) {
		throw new Error("The seed x[0] must be co-prime to " + M.toString());
	} else {
		x = s;
		return s;
	}
}

/** Get next item from the random number generator. */
function next() {
	var cachedx = x;
	cachedx = cachedx * x;
	cachedx = cachedx % M;
	x = cachedx;
	return x;
}

module.exports = BlumBlumShubGenerator;