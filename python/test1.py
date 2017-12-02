from sequences.infinite_binary_fibonacci import InfiniteBinaryFibonacci
from sequences.infinite_tribonacci import InfiniteTribonacci
from generators.linear_generator import LinearGenerator
from generators.combined_generator import CombinedGenerator
from tests.frequency import getFrequencyTest
from tests.serial import getSerialTest
from tests.interval import getIntervalTest
from tests.poker import getPokerTest
from tests.permutation import getPermutationTest
from tests.correlation import getCorrelationTest

it = InfiniteTribonacci()
bits = ''

for i in range(100):
    bits += str(it.next()) + ', '

print bits
