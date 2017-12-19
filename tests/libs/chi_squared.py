import scipy.stats as stats

def getChiSquared(observations, expectedObservations, observationTypesNumber):

    statistics = 0

    observedKeys = observations.keys()

    for i in xrange(len(observedKeys)):
        statistics += (observations[observedKeys[i]] - expectedObservations) * (observations[observedKeys[i]] - expectedObservations)

    notObservedTypesNumber = observationTypesNumber - len(observedKeys)
    statistics += notObservedTypesNumber  * expectedObservations * expectedObservations

    statistics = float(statistics) / expectedObservations

    pvalue = 1 - stats.chi2.cdf(x=statistics, df=observationTypesNumber - 1)

    return {
        'statistics': statistics,
        'probability': 1 - pvalue,
        'pvalue': pvalue
    }
