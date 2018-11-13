const axios = require('axios');

const baseURL = "https://restapinator.herokuapp.com/api/v1";

export const createItem = (item) => {
    axios.post(`${baseURL}/items`, item);
};

export const getItem = () => {
    return axios.get(`${baseURL}/items`)
}