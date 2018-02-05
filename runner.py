# -*- coding: utf-8 -*-
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
from tests.next_bit import getNextBitTest

import copy
import argparse
import numpy as np

parser = argparse.ArgumentParser(description='Запуск тестов')
parser.add_argument('--generators', type=str, help='Используемые генераторы через запятую. Возможные значения: bbs, isaac. Если 2 - комбинированные через фибоначчи, если 3 - через трибоначчи')
parser.add_argument('--tests', type=str, help='Используемые тесты через запятую. Возможные значения: frequency, correlation, interval, permutation, poker, serial, pnb.Вместо всех тестов Кнута можно написать knuth.')
parser.add_argument('--bits', help='Число бит в сгенерированных элементах', type=int, default=32)
parser.add_argument('--number', help='Количество элементов в сгенерированной последовательности ', type=int, default=1000)
parser.add_argument('--out', help='Сохранить последовательность в файл', type=str)

args = parser.parse_args()

knuth_tests = ['correlation', 'frequency', 'interval', 'permutation', 'poker', 'serial']

generators = args.generators.split(',')

sequence = None
if len(generators) == 2:
    sequence = InfiniteBinaryFibonacci()
if len(generators) == 3:
    sequence = InfiniteTribonacci()

for i in xrange(len(generators)):
    if generators[i] == 'bbs':
        generators[i] = BlumBlumShubGenerator(result_bits=args.bits)
    if generators[i] == 'isaac':
        generators[i] = IsaacGenerator(result_bits=args.bits)

generator = CombinedGenerator(generators, sequence, lambda arg: arg)

if args.out:
    file = open('./out/' + args.out, 'wb')

    bytes = bytearray()

    i = 0
    while i < args.number:
        byte = 0
        for j in xrange(8):
            bit = generator.next()
            byte += bit << (7 - j)

        bytes.append(byte)

        if (len(bytes) == 102400):
            file.write(bytes)
            bytes = bytearray()

        i += 8

    file.write(bytes)
    exit()

tests = args.tests.split(',')

for i in xrange(len(tests)):
    if tests[i] == 'knuth':
        tests[i] = knuth_tests

tests = np.array(tests).flatten()

options = {
    'valuesNumber': 1 << args.bits,
    'sequenceLength': args.number
}

for i in xrange(len(tests)):
    generator_copy = copy.deepcopy(generator)

    if tests[i] == 'correlation':
        correlationResult = getCorrelationTest(generator_copy, options)

        print 'Correlation test:       ' + 'c = ' + str(correlationResult['c'])
        print str(correlationResult['good']) + '- good.'
        print 'Borders: ' + str(correlationResult['border1']) + ' ' + str(correlationResult['border2'])

    if tests[i] == 'frequency':
        print 'Frequency test:      ' + str(getFrequencyTest(generator_copy, options)['pvalue'])

    if tests[i] == 'serial':
        print 'Serial test:         ' + str(getSerialTest(generator_copy, options)['pvalue'])

    if tests[i] == 'interval':
        print 'Interval test:         ' + str(getIntervalTest(generator_copy, options, 0, 0.5, 25)['pvalue'])
        print 'Interval test:         ' + str(getIntervalTest(generator_copy, options, 0.5, 1, 25)['pvalue'])

    if tests[i] == 'poker':
        print 'Poker test:             ' + str(getPokerTest(generator_copy, options)['pvalue'])

    if tests[i] == 'permutation':
         print 'Permutation test(t=17):    ' + str(getPermutationTest(generator_copy, options, 17)['pvalue'])

    if tests[i] == 'pnb':
         print 'Next bit test: ' + str(getNextBitTest(generator_copy, { 'sequenceLength': 1 << 17 }))
