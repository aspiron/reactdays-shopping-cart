const axios = require('axios');

const baseURL = "https://restapinator.herokuapp.com/api/v1";

export const createItem = (item) => {
    return axios.post(`${baseURL}/items`, item);
};

export const getItem = () => {
    return axios.get(`${baseURL}/items`)
}

export const createCartItem = (cartItem) => {
    return axios.post(`${baseURL}/cartItems`, cartItem)
}

export const getCartItems = () => {
    return axios.get(`${baseURL}/cartItems`)
}

export const deleteAllCartItems = () => {
    return getCartItems().then(({data}) => {
        data.forEach(cartItem => deleteCartItem(cartItem))
    })
}

export const updateCartItem = (cartItem) => {
    return axios.put(`${baseURL}/cartItems/${cartItem.id}`, cartItem)
}

export const deleteCartItem = (cartItem) => {
    return axios.delete(`${baseURL}/cartItems/${cartItem.id}`)
}