import math

goldenRatio = (1 + math.pow(5, .5)) / 2;

class InfiniteBinaryFibonacci:
    def __init__(self, **kwargs):
        start = kwargs.get('start', 0)

    	self.index = start + 1

    def next(self):
        result = self.getElement(self.index)
        self.index += 1

        return result

    def getElement(self, index):
	    return int(2 + math.floor(index * goldenRatio) - math.floor((index + 1) * goldenRatio))
