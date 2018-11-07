import { t } from "../actions/actions";

const initState = {
    cart: []
}

let nextId = 0;

const generateId = () => {
    nextId += 1;
    return nextId;
}

export const shoppingCartReducer = (state = initState, action) => {
    switch(action.type) {
        case t.ADD_ITEM_TO_SHOPPING_CART: {
            const currentCartItem = state.cart
                .find(cartItem => cartItem.itemId === action.item.id)

            if (currentCartItem) {
                return {
                    cart: state.cart.map(cartItem => {
                        if (cartItem.id === currentCartItem.id) {
                            return {
                                ...cartItem,
                                count: cartItem.count + 1
                            }
                        } else {
                            return cartItem
                        }
                    })
                }
            } else {
                return {
                    cart: [
                        ...state.cart, 
                        {
                            id: generateId(),
                            itemId: action.item.id,
                            count: 1
                        }

                    ]
                }
            }
        }

        default:
            return state;
    }
}