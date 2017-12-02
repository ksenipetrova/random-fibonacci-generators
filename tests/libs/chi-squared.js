'use strict';

var chi = require('chi-squared');

function getChiSquared(observations, expectedObservations, observationTypesNumber) {
	var statistics = 0;

	var observedKeys = Object.keys(observations);

	for (var i = 0; i < observedKeys.length; i++) {
		statistics +=
			(observations[observedKeys[i]] - expectedObservations) *
            (observations[observedKeys[i]] - expectedObservations);
    }

	// ��������� ������, ������� � �������� �� �����������
    statistics += (observationTypesNumber - observedKeys.length) * expectedObservations * expectedObservations;

	statistics /= expectedObservations;

  	var pvalue = chi.cdf(statistics, observationTypesNumber - 1);

	return {
        statistics: statistics,
        probability: 1 - pvalue,
        pvalue: pvalue
    };
}

module.exports = getChiSquared;
