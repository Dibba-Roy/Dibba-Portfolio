import axios from 'axios';

const baseURL = import.meta.env.VITE_API_URL;
const token = import.meta.env.VITE_API_TOKEN;


if (!baseURL || !token) {
  throw new Error('Missing API config: Check VITE_API_URL and VITE_API_TOKEN');
}

const api = axios.create({
  baseURL,
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

export default api;