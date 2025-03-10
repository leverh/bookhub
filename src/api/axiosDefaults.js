import axios from "axios";

axios.defaults.baseURL = process.env.REACT_APP_API_URL || 'https://bookhub-drf.onrender.com/';
axios.defaults.withCredentials = true;

const getCSRFToken = () => {
    const csrfCookie = document.cookie.split("; ").find(row => row.startsWith("csrftoken="));
    return csrfCookie ? csrfCookie.split("=")[1] : null;
};

axios.interceptors.request.use(config => {
    const csrfToken = getCSRFToken();
    if (csrfToken) {
        config.headers["X-CSRFToken"] = csrfToken;
    }
    return config;
});

export const axiosReq = axios.create({
    headers: { 'Content-Type': 'multipart/form-data' }
});

export const axiosRes = axios.create();
