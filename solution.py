import os
import csv


class CarBase:
    def __init__(self, brand, photo_file_name, carrying):
        self.car_type = ''
        self.photo_file_name = photo_file_name
        self.brand = brand
        self.carrying = float(carrying)

    def get_photo_file_ext(self):
        return str(os.path.splitext(self.photo_file_name)[1])


class Truck(CarBase):
    def __init__(self, brand, photo_file_name, carrying, body_whl):
        super().__init__(brand, photo_file_name, carrying)
        self.car_type = 'truck'
        lst = body_whl.split('x')
        try:
            self.body_length = float(lst[0])
            self.body_width = float(lst[1])
            self.body_height = float(lst[2])
        except ValueError:
            self.body_length = 0.0
            self.body_width = 0.0
            self.body_height = 0.0
        finally:
            if not len(lst) == 3:
                self.body_length = 0.0
                self.body_width = 0.0
                self.body_height = 0.0

    def get_body_volume(self):
        return self.body_height * self.body_length * self.body_width


class Car(CarBase):
    def __init__(
        self,
        brand,
        photo_file_name,
        carrying,
        passenger_seats_count
    ):
        super().__init__(brand, photo_file_name, carrying)
        self.car_type = 'car'
        self.passenger_seats_count = int(passenger_seats_count)


class SpecMachine(CarBase):
    def __init__(self, brand, photo_file_name, carrying, extra):
        super().__init__(brand, photo_file_name, carrying)
        self.extra = extra
        self.car_type = 'spec_machine'


def get_car_list(csv_filename):
    car_list = []
    try:
        with open(csv_filename, 'r') as csv_file:
            csv_reader = csv.reader(csv_file, delimiter=';')
            next(csv_reader)
            for Str in csv_reader:
                if Str[0] == 'car':
                    if Str[3] and Str[1] and Str[5] and Str[2]:
                        car_list.append(Car(Str[1], Str[3], Str[5], Str[2]))
                        continue
                if Str[0] == 'truck':
                    if Str[3] and Str[1] and Str[5]:
                        car_list.append(Truck(Str[1], Str[3], Str[5], Str[4]))
                        continue
                if Str[0] == 'spec_machine':
                    if (
                        Str[3] and
                        Str[1] and
                        Str[5] and
                        Str[6] and
                        str(os.path.splitext(Str[3])[1])
                    ):
                        car_list.append(SpecMachine(
                                                    Str[1],
                                                    Str[3],
                                                    Str[5],
                                                    Str[6]
                                                    ))
                        continue
    except FileNotFoundError:
        print('Problem')
    finally:
        return car_list


if __name__ == "__main__":
    f = '/home/cuzkov/Projects/pythonCoursera/12.csv'
    print(
        get_car_list(f)
        )
