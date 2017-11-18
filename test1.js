'use strict';

var InfiniteBinaryFibonacci = require('./sequences/infinite-binary-fibonacci.js');
var LinearGenerator = require('./generators/linear-generator.js')
var CombinedGenerator = require('./generators/combined-generator.js');
var IsaacGenerator = require('./generators/isaac-generator.js');
var BlumBlumShubGenerator = require('./generators/blum-blum-shub-generator.js');

var getFrequencyTest = require('./tests/frequency');
var getSerialTest = require('./tests/serial');
var getIntervalTest = require('./tests/interval');
var getPokerTest = require('./tests/poker');
var getPermutationTest = require('./tests/permutation');
var getCorrelationTest = require('./tests/correlation');

var valuesNumber = 5000; //количество возможных значений чисел из генератора

var r1 = new LinearGenerator(106, 1283, valuesNumber, 223);
var r2 = new LinearGenerator(1366, 1283, valuesNumber, 1654);
var f = new InfiniteBinaryFibonacci();

/*
var bbs1 = new BlumBlumShubGenerator(13);
var bbs2 = new BlumBlumShubGenerator(17);

console.log(bbs1.next());
console.log(bbs1.next());
console.log(bbs1.next());
console.log(bbs1.next());
console.log(bbs1.next());
console.log(bbs1.next());
console.log(bbs1.next());
*/

var combo = new CombinedGenerator(r1, r2, f, function (arg) { return arg; });

combo.generateSequence(1000);
combo.generateSequence(1000);
combo.generateSequence(1000);

var options = {
    valuesNumber: valuesNumber,
    sequenceLength: 1000
};

/*
console.log('Частотный тест:            ' + getFrequencyTest(combo, options).pvalue);

console.log('Тест серий:                ' + getSerialTest(combo, options).pvalue);

console.log('Интервальный тест:         ' + getIntervalTest(combo, options, 0, 0.5, 25).pvalue);

console.log('Интервальный тест:         ' + getIntervalTest(combo, options, 0.5, 1, 25).pvalue);

console.log('Покерный тест:             ' + getPokerTest(combo, options).pvalue);

console.log('Тест перестановок(t=7):    ' + getPermutationTest(combo, options, 7).pvalue);

console.log('Тест перестановок(t=10):   ' + getPermutationTest(combo, options, 10).pvalue);

console.log('Тест перестановок(t=17):   ' + getPermutationTest(combo, options, 17).pvalue);
*/

var correlationResult = getCorrelationTest(combo, options);

console.log('Корреляционный тест:       ' + 'c = ' + correlationResult.c + ', ' +
    (correlationResult.good? 'хорошее' : 'плохое') + ' значение.\n Границы: ' + 
	correlationResult.border1 + ' ' + correlationResult.border2
);
