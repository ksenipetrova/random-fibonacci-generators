class CombinedGenerator:
    def __init__(self, random1, random2, aperiodic, choiceFunction):
        self._random1 = random1
        self._random2 = random2
        self._aperiodic = aperiodic
        self._choiceFunction = choiceFunction

    def next(self):
        if self._choiceFunction(self._aperiodic.next()) == 0:
            # self._random2.next()
            return self._random1.next()

        #self._random1.next()
        return self._random2.next()

    def generateSequence(self, n):
        sequence = []

        for i in range(n):
            sequence.append(self.next())

        return sequence
