import { create } from 'zustand';

const getFromStorage = () => {
  const storedData = sessionStorage.getItem('todayFoods');
  return storedData ? JSON.parse(storedData) : undefined;
};

const setToStorage = (todayFoods) => {
  sessionStorage.setItem('todayFoods', JSON.stringify(todayFoods));
};

const useTodayEatFoodsStore = create((set) => ({
  todayFoods: getFromStorage(),
  setTodayFoods: (todayFoods) => {
    set({ todayFoods });
    setToStorage(todayFoods);
  },
}));

export default useTodayEatFoodsStore;
