function LinearGenerator(a, b, m, x0) {
	this._a = a;
	this._b = b;
	this._m = m;
	this._current = x0;
}

LinearGenerator.prototype.next = function () {
	var current = this._current;
	this._current = (this._a * this._current + this._b) % this._m;
	return current;
}

module.exports = LinearGenerator;