import { t } from "../actions/actions";

const items = [];

export const itemsReducer = (state = items, action) => {
    switch (action.type) {
        case t.GET_ITEMS_SUCCESS: {
            return action.items;
        }
    }

    return state;
}