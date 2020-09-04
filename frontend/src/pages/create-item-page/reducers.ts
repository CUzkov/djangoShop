export const initialStateCreateItem = {
    "tags": [],
    "category": -1,
}

export const reducerCreateItem = (state: IItemCreateFields, action): IItemCreateFields => {

    switch (action.type) {
        case 'tag':

            let bufferTag = [...state.tags];

            bufferTag[action.tagIndex].isSelect = !bufferTag[action.tagIndex].isSelect;

            return {
                "tags": bufferTag,
                "category": state.category,
            };
        case "all-tags":
            return {
                "tags": action.tags,
                "category": state.category,
            };
        case 'category':

            let categoryId = -1;

            for(let i = 0; i < action.categories.data.lenth; i++)
            {
                if(action.categories.data[i].title === action.category) {
                    categoryId = action.categories.data[i].id;
                    break;
                }
            }

            return {
                "tags": state.tags,
                "category": categoryId,
            };
        default:
            state
    }

}