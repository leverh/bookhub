import axios from "axios";

axios.defaults.baseURL = 'https://bookhub-rdf-api-9aad7672239c.herokuapp.com/'
axios.defaults.withCredentials = true

export const axiosReq = axios.create({
    headers: {
        'Content-Type': 'multipart/form-data',
    },
});

export const axiosRes = axios.create();
