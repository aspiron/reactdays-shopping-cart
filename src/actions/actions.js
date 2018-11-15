export const t = {
    import { Switch } from 'react-router-dom';
    import { Switch } from 'react-router-dom';
    import { Route } from 'react-router-dom';
    GET_ITEMS_SUCCESS: "GET_ITEMS_SUCCESS",
    ADD_ITEM_TO_SHOPPING_CART: "ADD_ITEM_TO_SHOPPING_CART",
    REMOVE_ITEM_FROM_SHOPPING_CART: "REMOVE_ITEM_FROM_SHOPPING_CART",
    SELECT_CATEGORY: "SELECT_CATEGORY",
    GET_CART_ITEMS_SUCCESS: "GET_CART_ITEMS_SUCCESS"
}

export const actions = {
    getItemsSuccess: items => ({
        type: t.GET_ITEMS_SUCCESS,
        items
    }),

    addItemToShoppingCart: item => ({
        type: t.ADD_ITEM_TO_SHOPPING_CART,
        item
    }),

    getCartItemsSuccess: cartItems => ({
        type: t.GET_CART_ITEMS_SUCCESS,
        cartItems
    }),

    removeItemFromShoppingCart: item => ({
        type: t.REMOVE_ITEM_FROM_SHOPPING_CART,
        item
    }),

    selectCategory: category => ({
        type: t.SELECT_CATEGORY,
        category
    })
}