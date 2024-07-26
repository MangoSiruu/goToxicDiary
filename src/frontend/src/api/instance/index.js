import axios from 'axios';

export const axiosInstance = axios.create({
  timeout: 5000,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

export const BASE_URL = 'http://localhost:3000';

export const fetchInstance = axiosInstance({
  baseURL: 'http://localhost:3000',
});
