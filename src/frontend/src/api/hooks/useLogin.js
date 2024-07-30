import { useMutation } from '@tanstack/react-query';
import { axiosInstance } from '../instance';
import { endpoint } from '../path';

const loginRequest = async (data) => {
  const response = await axiosInstance.post(`${endpoint.AUTH}/login`, {
    username: data.id,
    password: data.password,
  });
  return response.data;
};

const useSignUp = () => {
  return useMutation({
    mutationFn: loginRequest,
    onSuccess: () => {
      // 토큰 저장
    },
  });
};

export default useSignUp;
