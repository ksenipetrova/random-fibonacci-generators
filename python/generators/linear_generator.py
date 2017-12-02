class LinearGenerator:
    def __init__(self, a, b, m, x0):
        self._a = a
        self._b = b
        self._m = m
        self._current = x0

    def next(self):
        current = self._current
        self._current = (self._a * self._current + self._b) % self._m

        return current
