const axios = require('axios');

const baseURL = "https://restapinator.herokuapp.com/api/v1";

export const createItem = (item) => {
    axios.post(`${baseURL}/items`, item);
};