from libs.chi_squared import getChiSquared
import math

def getCorrelationTest(generator, options):
    c = 0
    pairValuesSum = 0
    valuesSum = 0
    squaredValuesSum = 0

    firstValue = generator.next()
    previousValue = firstValue

    for i in range(options['sequenceLength']):
        currentValue = generator.next();

        if i + 1 >= options['sequenceLength']:
            currentValue = firstValue

        normalizedValue = float(previousValue) / (options['valuesNumber'] - 1)

        pairValuesSum += float(normalizedValue * currentValue) / (options['valuesNumber'] - 1)
        valuesSum += normalizedValue
        squaredValuesSum += normalizedValue * normalizedValue

        previousValue = currentValue

    squaredSum = valuesSum * valuesSum

    c = float(options['sequenceLength'] * pairValuesSum - squaredSum) / (options['sequenceLength'] * squaredValuesSum - squaredSum)

    mean = float(-1) / (options['sequenceLength'] - 1)
    deviation = math.sqrt(float(options['sequenceLength'] * options['sequenceLength']) / (options['sequenceLength'] - 1) / (options['sequenceLength'] - 1) / (options['sequenceLength'] - 2))
    border1 = mean - 2 * deviation
    border2 = mean + 2 * deviation
    good = False

    if c > border1 and c < border2:
        good = True

    return {
        'c': c,
        'good': good,
		'border1': border1,
		'border2': border2
    }
