'use strict';

class InfiniteTribonacci:
    def __init__(self):
        self.index = 0
        self._isFirst = True
        self._currentSequence = [0, 1, 0, 2]
        self._prevSequence = [0, 1]
        self._prevPrevSequence = [0]

    def next(self):
        value = self._currentSequence[self.index]

        self.index += 1

        if self.index == len(self._currentSequence):
            self.index = 0

            current = self._prevSequence + self._prevPrevSequence

            self._prevPrevSequence = self._prevSequence

            if self._isFirst:
                self._prevSequence = self._currentSequence
            else:
                self._prevSequence = self._prevSequence + self._currentSequence

            self._currentSequence = current

            self._isFirst = False

        return value
