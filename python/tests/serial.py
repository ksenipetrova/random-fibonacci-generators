from libs.chi_squared import getChiSquared
import math

def getSerialTest(generator, options):
    observations = {}
    observationType = None

    pairsNumber = int(math.floor(float(options['sequenceLength']) / 2))

    for i in range(pairsNumber):
        observationType = str(generator.next()) + ';' + str(generator.next())

        if not observationType in observations:
            observations[observationType] = 0

        observations[observationType] += 1

    groupsNumber = options['valuesNumber'] * options['valuesNumber']
    expectedObservations = float(pairsNumber) / groupsNumber

    return getChiSquared(observations, expectedObservations, groupsNumber);
