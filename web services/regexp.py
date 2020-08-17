import re


def calculate(data, findall):
    matches = findall(
        r"([a-c]{1})([+-]*=)([-+]*\d+|[a-c]{1})([-+]*\d+)*"
    )
    for v1, s, v2, n in matches:
        if bool(re.findall(r"^([+\-]*\d+)$", v2)):
            buffer = int(v2 or 0)
        else:
            buffer = data.get(v2, 0) + int(n or 0)
        if(s == '='):
            data[v1] = buffer
        elif s == '-=':
            data[v1] -= buffer
        elif s == '+=':
            data[v1] += buffer

    return data
