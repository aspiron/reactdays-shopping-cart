import { t } from "../actions/actions";

const initState = {
    selectedCategory: "food"
}

export const categoriesReducer = (state = initState, action) => {
    switch (action.type) {
        case t.SELECT_CATEGORY: {
            return {
                selectedCategory: action.category
            }
        }
        default: 
            return state;
    } 
}