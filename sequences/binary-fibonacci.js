function BinaryFibonacci(n) {
	this.sequence = this.generateSequence(n);
	this.i = 0;
}

BinaryFibonacci.prototype.generateSequence = function (n) {
	var sequence = [1];
	var oldSequence;
	
	while (sequence.length < n) {
		oldSequence = sequence;
		sequence = [];
		for (var j = 0; j < oldSequence.length; j++) {
			if (oldSequence[j] === 0) {
				sequence.push(1);
			} else {
				sequence.push(0, 1);
			}
		}
	}

	console.log(sequence.length);
	
	return sequence;
};

BinaryFibonacci.prototype.next = function () {
	var result = this.sequence[this.i];
	
	this.i++;
	
	if (this.i >= this.sequence.length) {
		this.i = 0;
	}
	
	return result;
};

module.exports = BinaryFibonacci;