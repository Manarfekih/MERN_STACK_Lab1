import axios from 'axios';

// WHEN TO DECLARE? Once inside a dedicated src/services/api.js module
const api = axios.create({
  baseURL: 'http://localhost:5000/api'
});

export default api;