import { useMutation } from '@tanstack/react-query';
import { axiosInstance } from '../instance';
import { endpoint } from '../path';

const signUpRequest = async (data) => {
  const requestData = {
    username: data.id,
    password: data.password,
    nickname: data.nickname,
  };
  const response = await axiosInstance.post(`${endpoint.AUTH}/signup`, requestData);
  return { userId: response.data.userId, nickname: data.nickname };
};

const useSignUp = () => {
  return useMutation({
    mutationFn: signUpRequest,
    onSuccess: (data) => {
      const { nickname } = data;
      if (nickname) localStorage.setItem('nickname', nickname);
    },
  });
};

export default useSignUp;
