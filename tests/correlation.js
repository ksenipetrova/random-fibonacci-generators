'use strict';

var getChiSquared = require('./libs/chi-squared');

function getCorrelationTest(generator, options) {
    var c = 0;
    var pairValuesSum = 0;
    var valuesSum = 0;
    var squaredValuesSum = 0;
    
    var firstValue = generator.next();
    var previousValue = firstValue;
    
    for (var i = 0; i < options.sequenceLength; i++) {
        var currentValue = generator.next();
        
        if (i + 1 >= options.sequenceLength) {
            currentValue = firstValue;
        }
        
       var normalizedValue = previousValue / (options.valuesNumber - 1);
        
        pairValuesSum += normalizedValue * currentValue / (options.valuesNumber - 1);
        valuesSum += normalizedValue;
        squaredValuesSum += normalizedValue * normalizedValue;
        
        previousValue = currentValue;
    }
    
    var squaredSum = valuesSum * valuesSum;
    
    c = (options.sequenceLength * pairValuesSum - squaredSum) /
        (options.sequenceLength * squaredValuesSum - squaredSum);
        
    var mean = -1 / (options.sequenceLength - 1);
    var deviation = Math.sqrt(options.sequenceLength * options.sequenceLength / 
                    (options.sequenceLength - 1) / (options.sequenceLength - 1) / (options.sequenceLength - 2));
    var border1 = mean - 2 * deviation;
    var border2 = mean + 2 * deviation;
    var good = false;
    
    if (c > border1 && c < border2) {
        good = true;
    }
    
    return {
        c: c,
        good: good,
		border1: border1,
		border2: border2
    };
}

module.exports = getCorrelationTest;