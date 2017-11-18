'use strict';

//var InfiniteTribonacci = require('./sequences/infinite-tribonacci.js');
//var tri = new InfiniteTribonacci();
var InfiniteBinaryFibonacci = require('./sequences/infinite-binary-fibonacci.js');
var BinaryFibonacci = require('./sequences/binary-fibonacci.js');
var LinearGenerator = require('./generators/linear-generator.js');
var CombinedGenerator = require('./generators/combined-generator.js');
var IsaacGenerator = require('./generators/isaac-generator.js');
var BlumBlumShubGenerator = require('./generators/blum-blum-shub-generator.js');

var getFrequencyTest = require('./tests/frequency');
var getSerialTest = require('./tests/serial');
var getIntervalTest = require('./tests/interval');
var getPokerTest = require('./tests/poker');
var getPermutationTest = require('./tests/permutation');
var getCorrelationTest = require('./tests/correlation');

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

var correlationResult = getCorrelationTest(sequence, valuesNumber);

console.log('Корреляционный тест:       ' + 'c = ' + correlationResult.c + ', ' +
    (correlationResult.good? 'хорошее' : 'плохое') + ' значение.\n Границы: ' + 
	correlationResult.border1 + ' ' + correlationResult.border2
);
