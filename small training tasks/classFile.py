import tempfile
import os


class File:
    def __init__(self, file_path):
        self.counter = 1
        if os.path.exists(file_path):
            self.file_path = file_path
            with open(file_path, 'r') as fg:
                self.currStr = fg.readline()
        else:
            self.file_path = file_path
            with open(file_path, 'w'):
                self.currStr = ''

    def read(self):
        with open(self.file_path) as f:
            f.seek(0)
            strr = ''
            for st in f:
                strr += st
            return strr

    def write(self, rewrite_string):
        with open(self.file_path, "w") as f:
            return f.write(rewrite_string)

    def __add__(self, other):
        fd1 = tempfile.NamedTemporaryFile().name
        with open(fd1, 'w'):
            pass
        fd2 = File(fd1)
        fd2.write(self.read() + other.read())
        return fd2

    def __str__(self):
        return self.file_path

    def __iter__(self):
        return self

    def __next__(self):
        with open(self.file_path, 'r') as f:
            for _ in range(self.counter):
                self.currStr = f.readline()
                if self.currStr == '':
                    raise StopIteration
        self.counter += 1
        return self.currStr
