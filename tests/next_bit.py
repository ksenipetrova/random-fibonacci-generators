import math

chiSquared = 3.84146

def getNextBitTest(generator, options):
    n = options['sequenceLength']
    alfa = (1 + math.sqrt(chiSquared / n)) / 2
    l = int(round(math.log(n, 2)))
    print alfa
    print l
    return generator.next()
