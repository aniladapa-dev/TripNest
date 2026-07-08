import axios from 'axios';

// Set up for Spring Boot API
// In development, this points to localhost:8080 (default Spring Boot port)
// We use a relative path here assuming Vite proxy will be configured, or full URL
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080/api/v1';

export const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
});

// Request Interceptor: Attach JWT Token if available
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('tripnest_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response Interceptor: Global Error Handling
apiClient.interceptors.response.use(
  (response) => response.data,
  (error) => {
    // You can dispatch a global toast event here if you use an event emitter,
    // or handle specific status codes (e.g., 401 Unauthorized for logout)
    if (error.response?.status === 401) {
      console.warn("Unauthorized access. Redirecting to login...");
      localStorage.removeItem('tripnest_token');
      // window.location.href = '/login'; // Optional: auto-logout
    }
    return Promise.reject(error.response?.data || error);
  }
);
