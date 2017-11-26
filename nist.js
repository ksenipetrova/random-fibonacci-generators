var TestSuit = require('nist-randomness-test-suite');

var alpha = 0.001;

var testSuite = new TestSuit(alpha);

// you can also pass in a PRNG/RNG and the testsuite would generate 10^5 bits to test
var generator = () => Math.round(Math.random());
var frequency = testSuite.frequencyTest(generator);
var runs = testSuite.runsTest(generator);
var matrix = testSuite.binaryMatrixRankTest(generator);
var nonOverlapping = testSuite.nonOverlappingTemplateMatchingTest(generator);

console.log(frequency);
console.log(runs);
console.log(matrix);
console.log(nonOverlapping);
