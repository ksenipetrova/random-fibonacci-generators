from sequences.infinite_binary_fibonacci import InfiniteBinaryFibonacci
from generators.linear_generator import LinearGenerator
from generators.combined_generator import CombinedGenerator
from tests.frequency import getFrequencyTest
from tests.serial import getSerialTest
from tests.interval import getIntervalTest
from tests.poker import getPokerTest
from tests.permutation import getPermutationTest
from tests.correlation import getCorrelationTest

valuesNumber = 5000;
r1 = LinearGenerator(106, 1283, valuesNumber, 223);
r2 = LinearGenerator(1366, 1283, valuesNumber, 1654);
f = InfiniteBinaryFibonacci();

combo = CombinedGenerator(r1, r2, f, lambda arg: arg);

# bits = []

# for index in range(100):
#     bits.append(combo.next())

# print bits

combo.generateSequence(1000);
combo.generateSequence(1000);
combo.generateSequence(1000);

options = {
    'valuesNumber': valuesNumber,
    'sequenceLength': 1000
};

# print 'Frequency test:      ' + str(getFrequencyTest(combo, options)['pvalue'])
# print 'Serial test:         ' + str(getSerialTest(combo, options)['pvalue'])
# print 'Interval test:         ' + str(getIntervalTest(combo, options, 0, 0.5, 25)['pvalue'])
# print 'Interval test:         ' + str(getIntervalTest(combo, options, 0.5, 1, 25)['pvalue'])
# print 'Poker test:             ' + str(getPokerTest(combo, options)['pvalue'])
# print 'Permutation test(t=7):    ' + str(getPermutationTest(combo, options, 7)['pvalue'])
# print 'Permutation test(t=10):    ' + str(getPermutationTest(combo, options, 10)['pvalue'])
# print 'Permutation test(t=17):    ' + str(getPermutationTest(combo, options, 17)['pvalue'])

correlationResult = getCorrelationTest(combo, options)

print 'Correlation test:       ' + 'c = ' + str(correlationResult['c'])
print str(correlationResult['good']) + '- good.'
print 'Borders: ' + str(correlationResult['border1']) + ' ' + str(correlationResult['border2'])

