import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { axiosInstance } from '../instance';
import { endpoint } from '../path';
import { path } from '../../routes/path';

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
  const navigate = useNavigate();
  return useMutation({
    mutationFn: signUpRequest,
    onSuccess: (status) => {
      if (status === 201) {
        navigate(path.login);
      }
    },
  });
};

export default useSignUp;
