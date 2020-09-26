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

interface IItemCreateFields {
    "tags": any[],
    "category": {
        "id": number,
        "new_title": string,
        "sub_category": {
            "id": number,
            "new_title": string,
        },
    }
    "name": string,
    "description": string,
    "price": number,
    "new_tags": {
        "name": string,
        "isSelect": boolean,
    }[],
}

interface IItem {
    "id": number,
    "name": string,
    "price": number,
    "description": string,
    "likes": number,
    "dislikes": number,
    "item_level": string,
    "user": number,
    "sub_category": number,
    "tags": any[],
    "is_for_sell": boolean,
}

interface ITag {
    "id": number,
    "name": string,
}