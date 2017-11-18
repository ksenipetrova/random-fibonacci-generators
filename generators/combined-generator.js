'use strict';

function CombinedGenerator(random1, random2, aperiodic, choiceFunction) {
	this._random1 = random1;
	this._random2 = random2;
	this._aperiodic = aperiodic;
	this._choiceFunction = choiceFunction;
}

CombinedGenerator.prototype.next = function () {
	if (this._choiceFunction(this._aperiodic.next()) === 0) {
		//this._random2.next();
		return this._random1.next();
	}
	//this._random1.next();
	return this._random2.next();
}

CombinedGenerator.prototype.generateSequence = function (n) {
	var sequence = [];
	for (var i = 0; i < n; i++) {
		sequence.push(this.next());
	}
	return sequence;
};


module.exports = CombinedGenerator;