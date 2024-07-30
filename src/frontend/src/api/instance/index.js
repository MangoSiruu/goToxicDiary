import { QueryClient } from '@tanstack/react-query';
import axios from 'axios';

export const BASE_URL = 'http://3.37.98.95:8080';

export const axiosInstance = axios.create({
  timeout: 5000,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
  baseURL: `${BASE_URL}`,
});

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 3,
      refetchOnMount: true,
      refetchOnReconnect: true,
      refetchOnWindowFocus: true,
    },
  },
});
