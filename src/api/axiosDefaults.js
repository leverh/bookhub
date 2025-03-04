import axios from "axios";

axios.defaults.baseURL = process.env.REACT_APP_API_URL || 'https://ErrorCodes.pythonanywhere.com/';
axios.defaults.withCredentials = true

export const axiosReq = axios.create({
    headers: {
        'Content-Type': 'multipart/form-data',
    },
});

export const axiosRes = axios.create();
