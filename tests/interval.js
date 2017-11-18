'use strict';

var chi = require('chi-squared');

function getIntervalTest (generator, options, alpha, beta, intervalLength) {
	var observations = {};
    var observationType;

    var s = 0;
    var j = -1;
    var r = 0;
    
    while(j + 1 < options.sequenceLength) {
        j++;
        
        var normalizedValue = generator.next() / (options.valuesNumber - 1);
       
        if (normalizedValue >= alpha && normalizedValue < beta) {
            if (r >= intervalLength) {
                observationType = intervalLength;
            } else {
                observationType = r;
            }
            
            if (observations[observationType] === undefined) {
                observations[observationType] = 0;
            }
            
            observations[observationType]++;
            s++;
            r = 0;
        } else {
            r++;
        }
    }
	
    
    var p = beta - alpha;
    var pr = p;
    var pt = 1;
    var statistics = 0;
    
    for (var i = 0; i < intervalLength; i++) {
        if (observations[i] === undefined) {
            observations[i] = 0;
        }

        var diff = (observations[i] - s * pr);
        
        statistics +=  diff * diff  / (s * pr);
        pr *= 1 - p;
        pt *= 1 - p;
        
    }
    
    if (observations[intervalLength] === undefined) {
        observations[intervalLength] = 0;
    }
        
    var diff = (observations[intervalLength] - s * pt);
        
    statistics +=  diff * diff  / (s * pt);
    
   	var pvalue = chi.cdf(statistics, intervalLength);
	
	return {
        statistics: statistics,
        probability: 1 - pvalue,
        pvalue: pvalue
    };    
}

module.exports = getIntervalTest;
