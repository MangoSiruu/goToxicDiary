import { useSuspenseQuery } from '@tanstack/react-query';

import { axiosInstance } from '../instance';
import { endpoint } from '../path';

export const getChallengeList = async ({ finished, size }) => {
  const response = await axiosInstance.get(endpoint.CHALLENGE, {
    params: { finished, size },
  });
  return response.data;
};

const challengeListKey = [endpoint.CHALLENGE];

export const useChallengeList = ({ finished, size }) =>
  useSuspenseQuery({
    queryKey: [challengeListKey, { finished, size }],
    queryFn: () => getChallengeList({ finished, size }),
  });
