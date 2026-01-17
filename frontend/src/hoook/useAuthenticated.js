import axios from "axios";
import { useAuth } from "@clerk/clerk-react";

export const useAuthenticatedAxios = () => {
  const { getToken } = useAuth();

  const instance = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    withCredentials: true,
  });

  instance.interceptors.request.use(
    async (config) => {
      const token = await getToken();
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => Promise.reject(error)
  );

  return instance;
};
