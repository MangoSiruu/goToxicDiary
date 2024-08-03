import useAuthStore from '../actions/useAuthStore';

const useAuth = () => {
  const { authInfo } = useAuthStore();
  return authInfo;
};

export default useAuth;
