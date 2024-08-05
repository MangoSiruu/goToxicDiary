import { useSuspenseQuery } from '@tanstack/react-query';

import { axiosInstance } from '../instance';
import { getDynamicPoint } from '../path';
import { getTodayDate } from '../../utils/Calendar/getTodayDate';

const todayDate = getTodayDate();
const getTodayEatFoodPath = getDynamicPoint.CALENDAR_BY_DATE(todayDate);
export const getTodayEatFoods = async () => {
  const response = await axiosInstance.get(getTodayEatFoodPath);
  return response.data;
};

const todayEatQueryKey = [getTodayEatFoodPath];

export const useGetTodayEatFoods = () =>
  useSuspenseQuery({
    queryKey: todayEatQueryKey,
    queryFn: getTodayEatFoods,
  });
