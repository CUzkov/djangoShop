export const initialStateCreateItem = {
    "tags": [],
    "category": {
        "id": 1,
        "new_title": '',
        "sub_category": {
            "id": 1,
            "new_title": '',
        },
    },
    "name": '',
    "description": '',
    "price": 0,
    "new_tags": [],
}

export const reducerCreateItem = (state: IItemCreateFields, action): IItemCreateFields => {

    switch (action.type) {

        case 'tag':

            let bufferTag = [...state.tags];
            bufferTag[action.tagIndex].isSelect = !bufferTag[action.tagIndex].isSelect;

            return {
                ...state,
                "tags": bufferTag,
            };

        case "init-tags":
            return {
                ...state,
                "tags": action.tags,
            };

        case 'init-categories':
            return {
                ...state,
                "category": {
                    "id": action.categotyId,
                    "new_title": '',
                    "sub_category": {
                        "id": action.subCategoryId,
                        "new_title": '',
                    }
                },
            };

        case 'sub_category':
            return {
                ...state,
                category: {
                    ...state.category,
                    "sub_category": {
                        "id": action.subСategoryId,
                        "new_title": '',
                    }
                },
            };

        case 'name': 
            return {
                ...state,
                "name": action.name,
            };

        case 'description':
            return {
                ...state,
                "description": action.description,
            };

        case 'price':
            return {
                ...state,
                "price": action.price,
            };

        case 'new_tag':
            return {
                ...state,
                "new_tags": [...state.new_tags, {
                    "name": action.new_tag,
                    "isSelect": true,
                }],
            };

        case 'new_tag_select':

            let bufferNewTag = [...state.new_tags];
            bufferNewTag[action.tagIndex].isSelect = !bufferNewTag[action.tagIndex].isSelect;

            return {
                ...state,
                "new_tags": bufferNewTag,
            };
        
        case 'click_create_category':
            return {
                ...state,
                category: {
                    "id": -1,
                    "new_title": '',
                    "sub_category": {
                        "id": -1,
                        "new_title": '',
                    }
                },
            };

        case 'click_create_sub_category':
            return {
                ...state,
                category: {
                    ...state.category,
                    "sub_category": {
                        "id": -1,
                        "new_title": '',
                    }
                },
            };

        case 'refresh-categories':
            return {
                ...state,
                category: {
                    "id": action.categoryId,
                    "new_title": '',
                    "sub_category": {
                        "id": action.subCategoryId,
                        "new_title": '',
                    }
                },
            };

        case 'category':
            return {
                ...state,
                category: {
                    "id": action.categoryId,
                    "new_title": '',
                    "sub_category": {
                        "id": action.subCategoryId,
                        "new_title": '',
                    }
                },
            };

        case 'new_category':
            return {
                ...state,
                category: {
                    ...state.category,
                    "new_title": action.new_category,
                },
            };

        case 'new_sub_category':
            return {
                ...state,
                category: {
                    ...state.category,
                    "sub_category": {
                        "id": state.category.sub_category.id,
                        "new_title": action.new_sub_category,
                    }
                },
            };

        case 'clear':
            return {
                ...initialStateCreateItem,
                'tags': state.tags
            };

        default: 
            return state;    

    }

}