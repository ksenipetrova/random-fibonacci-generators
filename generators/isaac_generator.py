from libs.isaac import Isaac


class IsaacGenerator:
    def __init__(self, **kwargs):
        self._result_bits = kwargs.get('result_bits', False)

        self._isaac = Isaac()
        self._mask = 0
        deg = 1
        for i in xrange(self._result_bits):
            self._mask += deg
            deg *= 2
			
    def next(self):
        value = self._isaac.rand()

        return value & self._mask 
