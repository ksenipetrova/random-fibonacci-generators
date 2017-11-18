'use strict';

var getChiSquared = require('./libs/chi-squared');

function getPermutationTest(generator, options, groupLength) {
    var observations = {};
	var observationType;
	
	for (var i = 0; i + groupLength - 1 < options.sequenceLength; i += groupLength) {
		var group = [];
        
        for (var j = 0; j < groupLength; j++) {
            group.push(generator.next());        
        }
        
        observationType = getPermutationType(group);
		
		if (observations[observationType] === undefined) {
			observations[observationType] = 0;
		}
		
		observations[observationType]++;
	}

    var permutationsNumber = 1;

    for (i = 2 ; i < groupLength; i++) {
        permutationsNumber *= i;
    }
	
	var expectedObservations = Math.floor(options.sequenceLength / groupLength) / permutationsNumber;
	
	return	getChiSquared(observations, expectedObservations, permutationsNumber);
}

function getPermutationType(group) {
    var f = 0;
    var r = group.length;
    
    while (r > 1) {
        var maxValue = -1;
        var maxIndex = -1;

        for( var i = 0; i < r; i++) {
            if (maxValue < group[i]) {
                maxValue = group[i];
                maxIndex = i;
            }
        }
        
        f = r * f + maxIndex;
        
        group[maxIndex] = group[r - 1];
        group[r - 1] = maxValue;
        
        r--;
    }
    
    return f;
}

module.exports = getPermutationTest;
