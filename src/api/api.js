
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const API_URL = "https://beanscene-backend-cl7t.onrender.com";

export const api = axios.create({
  baseURL: `${API_URL}/api`,
});

// Automatically attach JWT token to every request
api.interceptors.request.use(
  async (config) => {
    // safety: ensure config and headers exist
    if (!config) return config;
    config.headers = config.headers || {};
    const token = await AsyncStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);
