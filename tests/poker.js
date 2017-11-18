'use strict';

var chi = require('chi-squared');
var math = require('mathjs');

function getPokerTest(generator, options) {
	var observations = {};
    var observationType;

	for (var i = 0; i + 4 < options.sequenceLength; i += 5) {
        var valuesCount = {};
        var valueType;
        
        for (var j = 0; j < 5; j++) {
            valueType = generator.next();
            
            if (valuesCount[valueType] === undefined) {
                valuesCount[valueType] = 0;
            }
            
            valuesCount[valueType]++;        
        }
                
        var differentValuesCount = Object.keys(valuesCount).length;
                
        if (observations[differentValuesCount] === undefined) {
            observations[differentValuesCount] = 0;
        }
        
        observations[differentValuesCount]++
	}
	
    var tp = 1 / (options.valuesNumber * options.valuesNumber * options.valuesNumber * options.valuesNumber);
    var d = options.valuesNumber;
    
    var statistics = 0;
    
    var groupsNumber = Math.floor(options.sequenceLength / 5);
        
    for (var r = 0; r < 5; r++) {
        var p = tp * math.stirlingS2(5, r + 1);
        
        d--;
        tp *= d;
        
        if (observations[r + 1] === undefined) {
            observations[r + 1] = 0;
        }
        
        var expected = groupsNumber * p;
        
        var diff = (observations[r + 1] - expected);
        
        statistics +=  diff * diff  / expected;
    }
    
   	var pvalue = chi.cdf(statistics, 4);
	
	return {
        statistics: statistics,
        probability: 1 - pvalue,
        pvalue: pvalue
    };    
}

module.exports = getPokerTest;
