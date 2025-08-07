import axios from 'axios';

// Create an Axios instance with the base URL from environment variables
const API = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
});

// Add a request interceptor to include the JWT token in the headers
API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      // Ensure the header is set correctly for Spring Security
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default API;