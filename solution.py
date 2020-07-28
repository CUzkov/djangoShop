class MyRangeIterator:
    def __init__(self, count):
        self.top = count
        self.current = 0

    def __iter__(self):
        return self

    def __next__(self):
        if(self.current > self.top):
            raise StopIteration

        current = self.current
        self.current += 1

        return current


if __name__ == "__main__":
    counter = MyRangeIterator(2)

    for it in counter:
        print(it)
