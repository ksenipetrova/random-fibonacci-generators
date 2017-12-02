'use strict';

var getChiSquared = require('./libs/chi-squared');

function getSerialTest(generator, options) {
	var observations = {};
	var observationType;

    var pairsNumber = Math.floor(options.sequenceLength / 2);

	for (var i = 0; i < pairsNumber; i++) {
		observationType = generator.next() + ';' + generator.next();

		if (observations[observationType] === undefined) {
			observations[observationType] = 0;
		}

		observations[observationType]++;
	}

    var groupsNumber = options.valuesNumber * options.valuesNumber;
    var expectedObservations = pairsNumber / groupsNumber;

	return getChiSquared(observations, expectedObservations, groupsNumber);
}

module.exports = getSerialTest;
