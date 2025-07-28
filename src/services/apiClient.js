import axios from 'axios';

const api = axios.create({
  // baseURL: "http://localhost:3458/api/v1/",
  baseURL: "https://api-confe-jas-production.up.railway.app/api/v1/",
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;