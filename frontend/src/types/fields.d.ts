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

interface IUserProfile {
    "username"?: string,
    "email"?: string,
    "balance"?: number,
    "birthday"?: string,
    "date_joined"?: string,
    "dislikes"?: number,
    "first_name"?: string,
    "id"?: number,
    "last_name"?: string,
    "likes"?: number,
    "status"?: string,
}

interface ICreateCategory {

}

interface IItemCreateFields {
    "tags": {
        "id": number,
        "name": string,
        "isSelect": boolean
    }[],
    "sub_category": any,
    "name": string,
    "description": string,
    "price": number,
    "new_tags": {
        "name": string,
        "isSelect": boolean,
    }[],
}