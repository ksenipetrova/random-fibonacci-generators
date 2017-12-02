from libs.blum_blum_shub.blum import BlumBlumShub

class BlumBlumShubGenerator:
    def __init__(self, **kwargs):
        bits = kwargs.get('bits', 32)

        self._result_bits = kwargs.get('result_bits', False)

        self._bbs = BlumBlumShub(bits)

    def next(self, **kwargs):
        bits = kwargs.get('bits', 1)

        if (self._result_bits):
            return self._bbs.next(self._result_bits)
        else:
            return self._bbs.next(bits)
