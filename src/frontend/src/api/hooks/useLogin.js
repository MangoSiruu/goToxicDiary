import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { axiosInstance } from '../instance';
import { endpoint } from '../path';
import { path } from '../../routes/path';
import useAuthStore from '../../actions/useAuthStore';

const loginRequest = async (data) => {
  const requestData = {
    username: data.id,
    password: data.password,
  };
  const response = await axiosInstance.post(`${endpoint.AUTH}/login`, requestData);
  return response;
};

const useLogin = () => {
  const navigate = useNavigate();
  const setAuthInfo = useAuthStore((state) => state.setAuthInfo);
  const setIsAuthenticated = useAuthStore((state) => state.setIsAuthenticated);

  return useMutation({
    mutationFn: loginRequest,
    onSuccess: (response) => {
      const { nickname } = response.data.user;
      const authorizationHeader = response.headers.authorization;
      const accessToken = authorizationHeader ? authorizationHeader.split(' ')[1] : null;

      if (response.status === 200) {
        localStorage.setItem('nickname', nickname);
        localStorage.setItem('token', accessToken);
        const authInfo = {
          nickname,
          accessToken,
        };

        setAuthInfo(authInfo);
        setIsAuthenticated(true);

        navigate(path.main);
      }
    },
  });
};

export default useLogin;
