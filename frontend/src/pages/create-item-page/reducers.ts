export const initialStateCreateItem = {
    "tags": [],
    "sub_category": 1,
    "name": '',
    "description": '',
    "price": 0,
    "new_tags": []
}

export const reducerCreateItem = (state: IItemCreateFields, action): IItemCreateFields => {

    switch (action.type) {

        case 'tag':

            let bufferTag = [...state.tags];

            bufferTag[action.tagIndex].isSelect = !bufferTag[action.tagIndex].isSelect;

            return {
                "tags": bufferTag,
                "sub_category": state.sub_category,
                "description": state.description,
                "name": state.name,
                "price": state.price,
                "new_tags": state.new_tags,
            };

        case "all-tags":
            return {
                "tags": action.tags,
                "sub_category": state.sub_category,
                "name": state.name,
                "price": state.price,
                "description": state.description,
                "new_tags": state.new_tags,
            };

        case 'sub_category':

            return {
                "tags": state.tags,
                "sub_category": action.sub_categoryId,
                "name": state.name,
                "description": state.description,
                "price": state.price,
                "new_tags": state.new_tags,
            };

        case 'name': 

            return {
                "tags": state.tags,
                "sub_category": state.sub_category,
                "name": action.name,
                "description": state.description,
                "price": state.price,
                "new_tags": state.new_tags,
            };

        case 'description':

            return {
                "tags": state.tags,
                "sub_category": state.sub_category,
                "name": state.name,
                "description": action.description,
                "price": state.price,
                "new_tags": state.new_tags,
            };

        case 'price':

            return {
                "tags": state.tags,
                "sub_category": state.sub_category,
                "name": state.name,
                "description": state.description,
                "price": action.price,
                "new_tags": state.new_tags,
            };

        case 'new_tag':

            return {
                "tags": state.tags,
                "sub_category": state.sub_category,
                "name": state.name,
                "description": state.description,
                "price": state.price,
                "new_tags": [...state.new_tags, {
                    "name": action.new_tag,
                    "isSelect": false,
                }],
            };

        case 'new_tag_select':

            let bufferNewTag = [...state.new_tags];

            bufferNewTag[action.tagIndex].isSelect = !bufferNewTag[action.tagIndex].isSelect;

            return {
                "tags": state.tags,
                "sub_category": state.sub_category,
                "name": state.name,
                "description": state.description,
                "price": state.price,
                "new_tags": bufferNewTag,
            };
        
        default:
            
            return state;    

    }

}