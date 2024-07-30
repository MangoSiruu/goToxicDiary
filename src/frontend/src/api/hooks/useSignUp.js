import { useMutation } from '@tanstack/react-query';
import { axiosInstance } from '../instance';
import { endpoint } from '../path';

const signUpRequest = async (data) => {
  const response = await axiosInstance.post(`${endpoint.AUTH}/signup`, {
    username: data.id,
    password: data.password,
    nickname: data.nickname,
  });
  return response.data;
};

const useSignUp = () => {
  return useMutation({
    mutationFn: signUpRequest,
    onSuccess: (data) => {
      const { username, nickname } = data;
      if (username) localStorage.setItem('username', username);
      if (nickname) localStorage.setItem('nickname', nickname);
    },
  });
};

export default useSignUp;
