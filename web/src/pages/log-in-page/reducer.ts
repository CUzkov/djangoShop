export const initialState = {
    "username": '',
    "email": '',
    "password": '',
    "repeat_password": ''
}

export const reducer = (state: IPostCreateUserFields, action): IPostCreateUserFields => {

    switch (action.type) {
        case 'login':
            return {
                ...state,
                "username": action.login,
            };
        case 'email':
            return {
                ...state,
                "email": action.email,
            };
        case 'password':
            return {
                ...state,
                "password": action.password,
            };
        case 'repeat_password':
            return {
                ...state,
                "repeat_password": action.repeat_password
            };
        default:
            state
    }

}