var chi = require('chi-squared');
var math = require('mathjs');

//var InfiniteTribonacci = require('./sequences/infinite-tribonacci.js');
//var tri = new InfiniteTribonacci();

var InfiniteBinaryFibonacci = require('./sequences/infinite-binary-fibonacci.js');
var BinaryFibonacci = require('./sequences/binary-fibonacci.js');
var LinearGenerator = require('./generators/linear-generator.js');
var CombinedGenerator = require('./generators/combined-generator.js');
var IsaacGenerator = require('./generators/isaac-generator.js');
var BlumBlumShubGenerator = require('./generators/blum-blum-shub-generator.js');

var valuesNumber = 5651 * 5623;
var r1 = new LinearGenerator(106, 1283, valuesNumber, 223);
var r2 = new LinearGenerator(1366, 1283, valuesNumber, 1654);
var f = new InfiniteBinaryFibonacci();
var isaac1 = new IsaacGenerator('rererererer');
var isaac2 = new IsaacGenerator('w3t23g22ff3t4v2c3432v5344');

var bbs1 = new BlumBlumShubGenerator(13);
var bbs2 = new BlumBlumShubGenerator(17);

var combo = new CombinedGenerator(bbs1, bbs2, f, function (arg) { return arg; });

combo.generateSequence(1000);
combo.generateSequence(1000);
combo.generateSequence(1000);
var sequence = combo.generateSequence(1000);

console.log('Частотный тест:            ' + getFrequencyTest(sequence, valuesNumber).pvalue);

console.log('Тест серий:                ' + getSerialTest(sequence, valuesNumber).pvalue);

console.log('Интервальный тест:         ' + getIntervalTest(sequence, valuesNumber, 0, 0.5, 25).pvalue);

console.log('Интервальный тест:         ' + getIntervalTest(sequence, valuesNumber, 0.5, 1, 25).pvalue);

console.log('Покерный тест:             ' + getPokerTest(sequence, valuesNumber).pvalue);

console.log('Тест перестановок(t=7):    ' + getPermutationTest(sequence, valuesNumber, 7).pvalue);

console.log('Тест перестановок(t=10):   ' + getPermutationTest(sequence, valuesNumber, 10).pvalue);

console.log('Тест перестановок(t=17):   ' + getPermutationTest(sequence, valuesNumber, 17).pvalue);

var correlationResult = getSerailCorrelationTest(sequence, valuesNumber);

console.log('Корреляционный тест:       ' + 'c = ' + correlationResult.c + ', ' +
    (correlationResult.good? 'хорошее' : 'плохое') + ' значение.\n Границы: ' + 
	correlationResult.border1 + ' ' + correlationResult.border2
);

function getFrequencyTest(sequence, valuesNumber) {
	var observations = {};
	var observationType;
	
	for (var i = 0; i < sequence.length; i++) {
		observationType = sequence[i];
		
		if (observations[observationType] === undefined) {
			observations[observationType] = 0;
		}
		
		observations[observationType]++;
	}
	
	var expectedObservations = sequence.length / valuesNumber;
	
	return	getChiSquared(observations, expectedObservations, valuesNumber);
}

function getSerialTest(sequence, valuesNumber) {
	var observations = {};
	var observationType;

	for (var i = 0; i + 1 < sequence.length; i += 2) {
		observationType = sequence[i] + ';' + sequence[i+1];
		
		if (observations[observationType] === undefined) {
			observations[observationType] = 0;
		}
		
		observations[observationType]++;
	}
	
	var expectedObservations = Math.floor(sequence.length / 2) / valuesNumber / valuesNumber;
	
	return getChiSquared(observations, expectedObservations, valuesNumber * valuesNumber);
}

function getIntervalTest (sequence, valuesNumber, alpha, beta, intervalLength) {
	var observations = {};
    var observationType;

    var s = 0;
    var j = -1;
    var r = 0;
    
    while(j + 1 < sequence.length) {
        j++;
        
        var normalizedValue = sequence[j] / (valuesNumber - 1);
       
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

function getPokerTest(sequence, valuesNumber) {
	var observations = {};
    var observationType;

	for (var i = 0; i + 4 < sequence.length; i += 5) {
        var valuesCount = {};
        var valueType;
        
        for (var j = 0; j < 5; j++) {
            valueType = sequence[i + j];
            
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
	
    var tp = 1 / (valuesNumber * valuesNumber * valuesNumber * valuesNumber);
    var d = valuesNumber;
    
    var statistics = 0;
        
    for (var r = 0; r < 5; r++) {
        var p = tp * math.stirlingS2(5, r + 1);
        
        d--;
        tp *= d;
        
        if (observations[r + 1] === undefined) {
            observations[r + 1] = 0;
        }
        
        var diff = (observations[r + 1] - Math.floor(sequence.length / 5) * p);
        
        statistics +=  diff * diff  / (Math.floor(sequence.length / 5) * p);
    }
    
   	var pvalue = chi.cdf(statistics, 4);
	
	return {
        statistics: statistics,
        probability: 1 - pvalue,
        pvalue: pvalue
    };    
}

function getPermutationTest(sequence, valuesNumber, groupLength) {
    var observations = {};
	var observationType;
	
	for (var i = 0; i + groupLength - 1 < sequence.length; i += groupLength) {
		var group = [];
        
        for (var j = 0; j < groupLength; j++) {
            group.push(sequence[i + j]);        
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
	
	var expectedObservations = Math.floor(sequence.length / groupLength) / permutationsNumber;
	
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

function getSerailCorrelationTest(sequence, valuesNumber) {
    var c = 0;
    var pairValuesSum = 0;
    var valuesSum = 0;
    var squaredValuesSum = 0;
    
    for (var i = 0; i < sequence.length; i++) {
        var index = i + 1;
        
        if (index >= sequence.length) {
            index = 0;
        }
        
        normalizedValue = sequence[i] / (valuesNumber - 1);
        
        pairValuesSum += normalizedValue * sequence[index] / (valuesNumber - 1);
        valuesSum += normalizedValue;
        squaredValuesSum += normalizedValue * normalizedValue;
    }
    
    var squaredSum = valuesSum * valuesSum;
    
    c = (sequence.length * pairValuesSum - squaredSum) /
        (sequence.length * squaredValuesSum - squaredSum);
        
    var mean = -1 / (sequence.length - 1);
    var deviation = Math.sqrt(sequence.length * sequence.length / 
                    (sequence.length - 1) / (sequence.length - 1) / (sequence.length - 2));
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

function getChiSquared(observations, expectedObservations, observationTypesNumber) {
	var statistics = 0;
	
	var observedKeys = Object.keys(observations);
	
	for (var i = 0; i < observedKeys.length; i++) {
		statistics += 
			(observations[observedKeys[i]] - expectedObservations) * 
			(observations[observedKeys[i]] - expectedObservations);
	}
	
	statistics += (observationTypesNumber - observedKeys.length) * expectedObservations * expectedObservations;
	statistics /= expectedObservations;
	
  	var pvalue = chi.cdf(statistics, observationTypesNumber - 1);
	
	return {
        statistics: statistics,
        probability: 1 - pvalue,
        pvalue: pvalue
    };
}