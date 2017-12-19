import scipy.stats as stats
import math

def getPokerTest(generator, options):
    observations = {}
    observationType = None

    for i in xrange(0, options['sequenceLength'] - 4, 5):
        valuesCount = {}
        valueType = None

        for j in xrange(5):
            valueType = generator.next()

            if not valueType in valuesCount:
                valuesCount[valueType] = 0

            valuesCount[valueType] += 1

        differentValuesCount = len(valuesCount.keys())

        if not differentValuesCount in observations:
            observations[differentValuesCount] = 0

        observations[differentValuesCount] += 1

    tp = float(1) / math.pow(options['valuesNumber'], 4)
    d = options['valuesNumber']

    statistics = 0

    groupsNumber = math.floor(float(options['sequenceLength']) / 5)

    stirling2_5_i = [0, 1, 15, 25, 10, 1]

    for r in xrange(5):
        p = tp * stirling2_5_i[r + 1]

        d -= 1
        tp *= d

        if not (r + 1) in observations:
            observations[r + 1] = 0

        expected = groupsNumber * p;

        diff = observations[r + 1] - expected

        statistics +=  float(diff * diff)  / expected

    pvalue = 1 - stats.chi2.cdf(x=statistics, df=4)

    return {
        'statistics': statistics,
        'probability': 1 - pvalue,
        'pvalue': pvalue
    }
