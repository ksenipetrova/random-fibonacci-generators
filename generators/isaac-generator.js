var isaac = require('isaac');

function IsaacGenerator(seed) {
	this._seed = seed;
	this._isaac = isaac
	this._isaac.seed(seed);
}

IsaacGenerator.prototype.next = function () {
	return Math.round(this._isaac.rand());
}

module.exports = IsaacGenerator;