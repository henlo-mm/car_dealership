import axios from 'axios';

const api = axios.create({
  baseURL: 'https://backend.auto-haus.link/',
});

export default api;