import useTodayEatFoodStore from '../actions/useTodayEatFoodStore';

const useTodayFoods = () => {
  const { todayFoods } = useTodayEatFoodStore();
  return todayFoods;
};

export default useTodayFoods;
