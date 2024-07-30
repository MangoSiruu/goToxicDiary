import { useEffect } from 'react';
import useAuthStore from '../actions/useAuthStore';

function AuthProvider({ children }) {
  const { setAuthInfo, setIsReady, isReady } = useAuthStore();

  useEffect(() => {
    const currentAuthName = localStorage.getItem('nickname');
    const currentAuthToken = localStorage.getItem('token');
    if (currentAuthName && currentAuthToken) {
      const authInfo = {
        nickname: currentAuthName,
        token: currentAuthToken,
      };
      setAuthInfo(authInfo);
      setIsReady(true);
    } else {
      setIsReady(true);
    }
  }, [setAuthInfo, setIsReady]);

  if (!isReady) return null;

  return { children };
}

export default AuthProvider;
