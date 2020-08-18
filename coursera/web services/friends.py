import requests
import json
import datetime


def calc_age(uid):
    ACCESS_TOKEN = """99213552992135529921355271995209
    6e9992199213552c6010afa84949f20a196be7d"""

    r1 = requests.get(
        f"""https://api.vk.com/method/users.get?v=5.71&access_token
            ={ACCESS_TOKEN}&user_ids={uid}""")

    user_id = json.loads(r1.text)['response'][0]['id']

    r2 = requests.get(f"""https://api.vk.com/method/friends.get?v=5.71
        &access_token={ACCESS_TOKEN}&user_id={user_id}&fields=bdate""")

    friends_list = json.loads(r2.text)['response']['items']
    now = datetime.datetime.now()

    friends_dict = {}

    for friend in friends_list:

        if friend.get('bdate'):
            year = friend['bdate'].split('.')
        else:
            continue

        if len(year) == 3:
            year = year[2]
        else:
            continue

        if not now.year - int(year) in friends_dict:
            friends_dict[now.year - int(year)] = 1
        else:
            friends_dict[now.year - int(year)] += 1

    friends_list = []

    for key in friends_dict:
        friends_list.append((key, friends_dict[key]))

    array = sorted(friends_list, key=lambda tup: (tup[0], 0))
    array2 = sorted(array, key=lambda tup: (0, -tup[1]))

    return array2


if __name__ == '__main__':
    res = calc_age('cuzkov')
    print(res)
