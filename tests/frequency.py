from libs.chi_squared import getChiSquared

def getFrequencyTest(generator, options):
    observations = {};
    observationType = None;

    for i in range(options['sequenceLength']):
        observationType = generator.next();

        if not observationType in observations:
            observations[observationType] = 0;

        observations[observationType] += 1;

    expectedObservations = float(options['sequenceLength']) / options['valuesNumber']

    return	getChiSquared(observations, expectedObservations, options['valuesNumber'])
