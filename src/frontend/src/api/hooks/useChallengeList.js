/* eslint-disable camelcase */
import { useSuspenseQuery } from '@tanstack/react-query';

import { axiosInstance } from '../instance';
import { endpoint } from '../path';

export const getChallengeList = async ({ finished, page_size }) => {
  const response = await axiosInstance.get(endpoint.CHALLENGE, {
    params: { finished, page_size },
  });
  return response.data;
};

const challengeListKey = [endpoint.CHALLENGE];

export const useChallengeList = ({ finished, page_size }) =>
  useSuspenseQuery({
    queryKey: [challengeListKey, { finished, page_size }],
    queryFn: () => getChallengeList({ finished, page_size }),
  });
