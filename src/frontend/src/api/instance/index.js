import { QueryClient } from '@tanstack/react-query';
import axios from 'axios';

const initInstance = () => {
  const instance = axios.create({
    timeout: 5000,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  });

  return instance;
};

export const BASE_URL = 'http://localhost:3000';

export const fetchInstance = initInstance({
  baseURL: 'http://localhost:3000',
});

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnMount: true,
      refetchOnReconnect: true,
      refetchOnWindowFocus: true,
    },
  },
});
