var goldenRatio = (1 + Math.pow(5, .5)) / 2;

function InfiniteBinaryFibonacci(start) {
	this.index = (start || 0) + 1;
}

InfiniteBinaryFibonacci.prototype.next = function () {
	var result = getElement(this.index);
	
	this.index++;
	
	return result;
};

function getElement(index) {
	return 2 + Math.floor(index * goldenRatio) - Math.floor((index + 1) * goldenRatio);
}

module.exports = InfiniteBinaryFibonacci;