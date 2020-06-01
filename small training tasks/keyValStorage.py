import argparse
import json
import tempfile
import os

parser = argparse.ArgumentParser()

parser.add_argument('--key', action="store", dest="key")
parser.add_argument('--val', action="store", dest="val")

args = parser.parse_args()

temp_dict = {}
temp_list = []

storage_path = os.path.join(tempfile.gettempdir(), 'storage.data')

if not os.path.isfile(storage_path):
    with open(storage_path, 'w') as f:
        f.write(r'{}')

with open(storage_path, 'r+') as my_temp_file:
    if not args.key:
        pass
    else:
        temp_dict = json.load(my_temp_file)
        if not args.val:
            temp_list = temp_dict.get(args.key)
            if temp_dict.get(args.key):
                if len(temp_dict.get(args.key)) > 1:
                    print(', '.join(temp_dict.get(args.key)))
                else:
                    print(temp_dict.get(args.key)[0])
            else:
                print(temp_dict.get(args.key))
        else:
            temp_list = temp_dict.get(args.key)
            if not temp_list:
                temp_dict.update({args.key: [args.val]})
            else:
                temp_list.append(args.val)
                temp_dict.update({args.key: temp_list})
            my_temp_file.seek(0)
            json.dump(temp_dict, my_temp_file)