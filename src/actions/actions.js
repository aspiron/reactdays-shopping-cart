export const t = {
    ADD_ITEM_TO_SHOPPING_CART: "ADD_ITEM_TO_SHOPPING_CART"
}

export const actions = {
    addItemToShoppingCart: item => ({
        type: t.ADD_ITEM_TO_SHOPPING_CART,
        item
    })
}