/* eslint-disable no-alert */
import { useMutation } from '@tanstack/react-query';
import { axiosInstance } from '../instance';
import { endpoint } from '../path';
import { getTodayDate } from '../../utils/Calendar/getTodayDate';
import { removeIcons } from '../../utils/Icons/removeIcons';
import useTodayEatFoodsStore from '../../actions/useTodayEatFoodStore';

export function useSaveTodayEatFoods(onSuccess) {
  const setTodayFoods = useTodayEatFoodsStore((state) => state.setTodayFoods);

  return useMutation({
    mutationFn: async (data) => {
      const toxicFoods = Object.entries(data).map(([name, { count }]) => ({
        name: removeIcons(name),
        count,
      }));
      const foods = {
        date: getTodayDate(),
        toxicFoods,
      };

      const res = await axiosInstance.post(endpoint.CALENDAR, foods);
      if (res.data && res.status === 201) {
        return res.data.dailyRecord.toxicFoods;
      }
      throw new Error('Error saving data');
    },
    onSuccess: (data) => {
      setTodayFoods(data);
      onSuccess(data);
    },
    onError: () => {
      window.alert('다시 시도해 주세요.');
    },
  });
}
