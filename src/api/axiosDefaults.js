import axios from "axios";

// Set base URL
axios.defaults.baseURL = process.env.REACT_APP_API_URL || 'https://bookhub-drf.onrender.com/';
axios.defaults.withCredentials = true;

// Function to get CSRF token from cookies
const getCSRFToken = () => {
    const csrfCookie = document.cookie.split("; ")
        .find(row => row.startsWith("csrftoken="));
    return csrfCookie ? csrfCookie.split("=")[1] : null;
};

// Function to fetch CSRF token
export const fetchCSRFToken = async () => {
    try {
        await axios.get('get-csrf-token/');
        console.log("CSRF token fetched successfully");
    } catch (error) {
        console.error("Error fetching CSRF token:", error);
    }
};

// Add CSRF token to all requests
axios.interceptors.request.use(config => {
    const csrfToken = getCSRFToken();
    if (csrfToken) {
        config.headers["X-CSRFToken"] = csrfToken;
    }
    return config;
});

// Create axios instances with proper headers
export const axiosReq = axios.create({
    headers: { 'Content-Type': 'multipart/form-data' }
});

export const axiosRes = axios.create();