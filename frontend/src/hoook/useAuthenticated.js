import axios from 'axios';
import { useAuth } from '@clerk/clerk-react';

export const useAuthenticatedAxios = () => {
  // This hook requires a component context (cannot be used inside a Redux thunk)
  const { getToken } = useAuth(); 

  const instance = axios.create();

  // Interceptor runs BEFORE every request to attach the token
  instance.interceptors.request.use(
    async (config) => {
      // Get a fresh JWT token for the current session
      const token = await getToken(); 
      
      if (token) {
        // Attach the token to the request headers
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => Promise.reject(error)
  );

  return instance;
};