import axios from "axios";

axios.defaults.baseURL = process.env.REACT_APP_API_URL || "https://bookhub-drf.onrender.com/";
axios.defaults.withCredentials = true;

// Function to extract CSRF token from cookies
function getCSRFToken() {
    const cookies = document.cookie.split("; ");
    for (let cookie of cookies) {
        const [name, value] = cookie.split("=");
        if (name === "csrftoken") {
            return value;
        }
    }
    return "";
}

// Request interceptor to attach CSRF token to every request
axios.interceptors.request.use((config) => {
    const csrfToken = getCSRFToken();
    if (csrfToken) {
        config.headers["X-CSRFToken"] = csrfToken;
    }
    return config;
});

export const axiosReq = axios.create({
    headers: {
        "Content-Type": "multipart/form-data",
    },
});

export const axiosRes = axios.create();
