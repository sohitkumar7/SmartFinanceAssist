
import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

// Request interceptor to add fresh Clerk token
api.interceptors.request.use(async (config) => {
  // Try to get fresh token from window.Clerk (available after Clerk loads)
  if (window.Clerk) {
    try {
      const token = await window.Clerk.session.getToken();
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    } catch (error) {
      console.error("Error getting Clerk token:", error);
    }
  }
  
  // Fallback to sessionStorage if Clerk not available
  const storedToken = sessionStorage.getItem("clerk_token");
  if (!config.headers.Authorization && storedToken) {
    config.headers.Authorization = `Bearer ${storedToken}`;
  }
  
  return config;
});

export default api;

