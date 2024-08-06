import { create } from 'zustand';

const useAuthStore = create((set) => ({
  authInfo: undefined,
  isAuthenticated: false,
  setAuthInfo: (authInfo) => set({ authInfo }),
  setIsAuthenticated: (isAuthenticated) => set({ isAuthenticated }),
}));

export default useAuthStore;
