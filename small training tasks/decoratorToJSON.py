import json
from functools import wraps


def to_json(old_func):
    @wraps(old_func)
    def wrapper_around(*args, **kwargs):
        some_object = old_func(*args, **kwargs)
        return json.dumps(some_object)
    return wrapper_around
