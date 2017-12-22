# -*- coding: utf-8 -*-
import math
import scipy

chiSquared = 3.84146
mean = 105
deviation = 154.04 # for 2^17

def getNextBitTest(generator, options):
    n = options['sequenceLength']

    alpha = (1 + math.sqrt(chiSquared / n)) / 2.

    l = int(round(math.log(n, 2) - 2))

    layer_l = {} # ключ - битовая последовательность, например, 101, значение массив из двух элементов:
                 # [0, 1]: индекс 0 - это сколько если добавить 0, 1010, индекс 1 - соответсвует 1011

    start_bits = []

    for i in xrange(l):
        start_bits.append(generator.next())

    def scan(index):
        sequence = ''

        for i in xrange(l):
            sequence += str(get_elem(index + i))

        if not sequence in layer_l:
            layer_l[sequence] = [0, 0]

        layer_l[sequence][get_elem(index + l)] += 1

    def get_elem(index):
        overflow_count = index - n

        if overflow_count >= 0:
            return start_bits[overflow_count]

        return generator.next()

    for i in xrange(n):
        scan(i)

    obserservedSequences = layer_l.keys()

    Y_obs = 0

    for i in xrange(len(obserservedSequences)):
        sequence = obserservedSequences[i]
        layer = layer_l[sequence]
        sequence_count = layer[0] + layer[1]

        if sequence_count < 10:
            continue

        predict_0 = float(layer[0]) / sequence_count
        predict_1 = float(layer[1]) / sequence_count

        if predict_0 > alpha or predict_1 > alpha:
            Y_obs += 1

    p_value = scipy.special.erfc((Y_obs - mean) / math.sqrt(2 * deviation)) / 2.

    return p_value
