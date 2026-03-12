import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL, // Adjust to your backend URL
  withCredentials: true, // Allows cookies to be sent/received
});

export default api;
