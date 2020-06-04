class FileReader:

    def __init__(self, path):
        self.path = path

    def read(self):
        try:
            with open(self.path, 'r') as file:
                return file.read()
        except FileNotFoundError:
            return ''


if __name__ == '__main__':
    obj = FileReader('/home/cuzkov/Projects/text.txt')
    text = obj.read()
    print(text)
