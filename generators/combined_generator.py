class CombinedGenerator:
    def __init__(self, generators, aperiodic, choiceFunction):
        self._generators = generators
        self._aperiodic = aperiodic
        self._choiceFunction = choiceFunction

    def next(self):
        index = self._choiceFunction(self._aperiodic.next())

        return self._generators[index].next()

    def generateSequence(self, n):
        sequence = []

        for i in xrange(n):
            sequence.append(self.next())

        return sequence
