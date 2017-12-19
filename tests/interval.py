import scipy.stats as stats

def getIntervalTest (generator, options, alpha, beta, intervalLength):
    observations = {}
    observationType = None

    s = 0
    j = -1
    r = 0

    while j + 1 < options['sequenceLength']:
        j += 1

        normalizedValue = float(generator.next()) / (options['valuesNumber'] - 1)

        if normalizedValue >= alpha and normalizedValue < beta:
            if r >= intervalLength:
                observationType = intervalLength
            else:
                observationType = r;

            if not observationType in observations:
                observations[observationType] = 0

            observations[observationType] += 1
            s += 1
            r = 0
        else:
            r += 1

    p = beta - alpha
    pr = p
    pt = 1
    statistics = 0

    for i in xrange(intervalLength):
        if not i in observations:
            observations[i] = 0

        diff = (observations[i] - s * pr)

        statistics +=  float(diff * diff)  / (s * pr)
        pr *= 1 - p
        pt *= 1 - p

    if not intervalLength in observations:
        observations[intervalLength] = 0;

    diff = observations[intervalLength] - s * pt

    statistics +=  float(diff * diff)  / (s * pt);

    pvalue = 1 - stats.chi2.cdf(x=statistics, df=intervalLength)

    return {
        'statistics': statistics,
        'probability': 1 - pvalue,
        'pvalue': pvalue
    }
