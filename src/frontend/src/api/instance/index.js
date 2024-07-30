import axios from 'axios';

export const axiosInstance = axios.create({
  timeout: 5000,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

export const BASE_URL = 'http://3.37.98.95:8080';

export const fetchInstance = axiosInstance({
  baseURL: 'http://3.37.98.95:8080',
});
