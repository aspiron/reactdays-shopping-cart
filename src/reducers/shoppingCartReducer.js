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

        case t.GET_CART_ITEMS_SUCCESS: {
            console.log(action);
            return {
                cart: action.cartItems
            }
        }    

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

        case t.REMOVE_ITEM_FROM_SHOPPING_CART: {
            const currentCartItem = state.cart
                .find(cartItem => cartItem.itemId === action.item.id)

            if (currentCartItem) {
                if (currentCartItem.count > 1) {
                    return {
                        cart: state.cart.map(cartItem => {
                            if (cartItem.id === currentCartItem.id) {
                                return {
                                    ...cartItem,
                                    count: cartItem.count - 1
                                }
                            } else {
                                return cartItem
                            }
                        })
                    }
                } else {
                    return {
                        cart: state.cart.filter(cartItem => cartItem.id !== currentCartItem.id)
                    }
                }
                
            } else { 
                return state
            }
        }

        default:
            return state;
    }
}