export const initialStateCreateItem = {
    "tags": ['']
}

export const reducerCreateItem = (state: IItemCreateFields, action): IItemCreateFields => {

    switch (action.type) {
        case 'tag':
            return {
                ...state,
                "tags": [...state.tags, action.tag]
            };
        default:
            state
    }

}