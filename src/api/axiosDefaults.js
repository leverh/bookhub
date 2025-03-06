import axios from "axios";

axios.defaults.baseURL = process.env.REACT_APP_API_URL || 'https://bookhub-drf.onrender.com/';
axios.defaults.withCredentials = true;

axios.interceptors.request.use((config) => {
    const csrfToken = document.cookie.split('; ')
        .find(row => row.startsWith('csrftoken='))
        ?.split('=')[1];

    if (csrfToken) {
        config.headers["X-CSRFToken"] = csrfToken;
    }
    return config;
});

export const axiosReq = axios.create({
    withCredentials: true,
    headers: {
        'Content-Type': 'multipart/form-data',
    },
});

export const axiosRes = axios.create({
    withCredentials: true,
});
