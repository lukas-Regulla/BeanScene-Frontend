import axios from "axios";

export const API_URL = "https://beanscene-backend-cl7t.onrender.com";

export const api = axios.create({
  baseURL: `${API_URL}/api`,
});
