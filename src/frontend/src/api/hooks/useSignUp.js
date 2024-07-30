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
  return response.status;
};

const useSignUp = () => {
  return useMutation({
    mutationFn: signUpRequest,
    onSuccess: (status) => {
      if (status === 201) {
        console.log('회원가입 성공');
      }
    },
  });
};

export default useSignUp;
