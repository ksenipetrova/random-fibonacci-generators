from libs.isaac import Isaac


class IsaacGenerator:
    def __init__(self, **kwargs):
        self._binary = kwargs.get('binary', False)

        self._isaac = Isaac()

    def next(self):
        value = self._isaac.rand()

        if self._binary:
            return value % 2
        else:
            return value
