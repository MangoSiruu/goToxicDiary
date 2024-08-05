import { useSuspenseQuery } from '@tanstack/react-query';

import { axiosInstance } from '../instance';
import { getDynamicPoint } from '../path';

export const getChallenge = async (id) => {
  const response = await axiosInstance.get(getDynamicPoint.CHALLENGE_BY_ID(id));
  return response.data;
};

export const useChallenge = (id) =>
  useSuspenseQuery({
    queryKey: ['challenge', id],
    queryFn: () => getChallenge(id),
  });
