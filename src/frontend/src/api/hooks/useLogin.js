import { useMutation } from '@tanstack/react-query';
import { axiosInstance } from '../instance';
import { endpoint } from '../path';

const loginRequest = async (data) => {
  const requestData = {
    username: data.id,
    password: data.password,
  };
  const response = await axiosInstance.post(`${endpoint.AUTH}/login`, requestData);
  return response.data;
};

const useSignUp = () => {
  return useMutation({
    mutationFn: loginRequest,
    onSuccess: (response) => {
      if (response.status === 200) {
        const accessToken = response.headers.authorization;
        localStorage.setItem('token', accessToken);
      }
    },
  });
};

export default useSignUp;
