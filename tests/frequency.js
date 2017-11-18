'use strict';

var getChiSquared = require('./libs/chi-squared');

function getFrequencyTest(generator, options) {
	var observations = {};
	var observationType;
	
	for (var i = 0; i < options.sequenceLength; i++) {
		observationType = generator.next();
		
		if (observations[observationType] === undefined) {
			observations[observationType] = 0;
		}
		
		observations[observationType]++;
	}
	
	var expectedObservations = options.sequenceLength / options.valuesNumber;
	
	return	getChiSquared(observations, expectedObservations, options.valuesNumber);
}

module.exports = getFrequencyTest;