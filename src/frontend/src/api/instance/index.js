/* eslint-disable no-alert */
import { QueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { endpoint } from '../path';
import { path } from '../../routes/path';

export const BASE_URL = 'http://3.37.98.95:8080';

export const axiosInstance = axios.create({
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  },
  baseURL: `${BASE_URL}`,
  withCredentials: 'true',
});

const reissueToken = async () => {
  const res = await axios.post(
    `${endpoint.AUTH}/refresh`,
    {},
    {
      baseURL: `${BASE_URL}`,
      withCredentials: true,
    },
  );
  const newToken = res.headers.authorization.split(' ')[1];
  return newToken;
};

export const handleLogout = async () => {
  try {
    const res = await axios.post(
      `${endpoint.AUTH}/logout`,
      {},
      {
        baseURL: `${BASE_URL}`,
        withCredentials: true,
      },
    );
    if (res.status === 200) {
      localStorage.clear();
    }
  } catch (error) {
    alert('로그아웃 실패');
  }
};

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      // eslint-disable-next-line no-param-reassign
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalConfig = error.config;
    const redirectUrl = `${window.location.origin}${path.login}`;
    if (error.response.status === 401) {
      try {
        const newToken = await reissueToken();
        localStorage.setItem('token', newToken);
        originalConfig.headers.authorization = `Bearer ${newToken}`;
        return await axios(error.config);
      } catch (refreshError) {
        window.alert('자동으로 로그인 연장 되었습니다.');
        window.location.replace(redirectUrl);
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  },
);

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
