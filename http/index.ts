import axios from 'axios';

const api = axios.create({
  baseURL: process.env.API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${process.env.BACKEND_API_KEY}`,
  },
});

// categories
export const fetchCategories = async () => api.get('/api/categories');
