interface ISideBar {
    "data"?: ICategory[]
}

interface ICategory {
    "id": number,
    "title": string,
    "sub_categories": ISubCategory[]
}

interface ISubCategory {
    "id": number,
    "title": string,
    "category": number
}

interface IPostCreateUserFields {
    "username": string,
    "password": string,
    "email": string,
    "repeat_password": string
}