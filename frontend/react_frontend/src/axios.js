import axios from 'axios';
import { useAuthStore } from './store/useAuthStore';


const api = axios.create({
  baseURL: 'http://127.0.0.1:8000/api',
  timeout: 20000,
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${useAuthStore.getState().token}`,
  },
});

api.defaults.withCredentials = true;
api.defaults.withXSRFToken = true;

api.interceptors.request.use((config) => {
  const token = useAuthStore.getState().token;

  console.log('protected token', token)
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
},
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response) {
      console.error('API Error:', error.response.data);
    } else {
      console.error('Network Error:', error.message);
    }
    return Promise.reject(error);
  }
);

export default api;
