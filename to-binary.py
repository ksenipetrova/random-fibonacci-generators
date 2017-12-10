from sequences.infinite_binary_fibonacci import InfiniteBinaryFibonacci
from sequences.infinite_tribonacci import InfiniteTribonacci
from generators.linear_generator import LinearGenerator
from generators.isaac_generator import IsaacGenerator
from generators.blum_blum_shub_generator import BlumBlumShubGenerator
from generators.combined_generator import CombinedGenerator
from tests.frequency import getFrequencyTest
from tests.serial import getSerialTest
from tests.interval import getIntervalTest
from tests.poker import getPokerTest
from tests.permutation import getPermutationTest
from tests.correlation import getCorrelationTest

import sys, getopt

def main(argv):
    outputfile = 'out'
    number = 0

    opts, args = getopt.getopt(argv, 'o:n:b:')

    for opt, arg in opts:
        if opt in ('-o'):
            outputfile = arg
        elif opt in ('-n'):
            number = int(arg)
        elif opt in ('-b'):
            number = 1 << int(arg)

    bbs = BlumBlumShubGenerator()
    bbs2 = BlumBlumShubGenerator()
    fib = InfiniteBinaryFibonacci()
    comb = CombinedGenerator([bbs, bbs2], fib, lambda arg: arg)

    file = open('./out/' + outputfile, 'wb')

    bytes = bytearray()

    i = 0
    while i < number:
        byte = 0
        for j in xrange(8):
            bit = comb.next()
            byte += bit << (7 - j)

        bytes.append(byte)

        if (len(bytes) == 102400):
            file.write(bytes)
            bytes = bytearray()

        i += 8

    file.write(bytes)


if __name__ == '__main__':
   main(sys.argv[1:])
