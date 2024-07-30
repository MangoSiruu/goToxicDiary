import create from 'zustand';

const useAuthStore = create((set) => ({
  authInfo: undefined,
  isReady: false,
  setAuthInfo: (authInfo) => set({ authInfo }),
  setIsReady: (isReady) => set({ isReady }),
}));

export default useAuthStore;
