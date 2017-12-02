from libs.chi_squared import getChiSquared
import math

def getPermutationTest(generator, options, groupLength):
    observations = {}
    observationType = None

    for i in xrange(0, options['sequenceLength'] - groupLength + 1, groupLength):
        group = []

        for j in xrange(groupLength):
            group.append(generator.next())

        observationType = getPermutationType(group)

        if not observationType in observations:
            observations[observationType] = 0

        observations[observationType] += 1

    permutationsNumber = 1

    for i in xrange(2, groupLength):
        permutationsNumber *= i

    expectedObservations = math.floor(float(options['sequenceLength']) / groupLength) / permutationsNumber

    return getChiSquared(observations, expectedObservations, permutationsNumber)

def getPermutationType(group):
    f = 0
    r = len(group)

    while r > 1:
        maxValue = -1
        maxIndex = -1

        for i in xrange(r):
            if maxValue < group[i]:
                maxValue = group[i]
                maxIndex = i

        f = r * f + maxIndex

        group[maxIndex] = group[r - 1]
        group[r - 1] = maxValue

        r -= 1

    return f
