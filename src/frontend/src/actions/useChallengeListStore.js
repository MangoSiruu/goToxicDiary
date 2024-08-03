import { create } from 'zustand';
import fetchInstance from '../utils/fetchInstance';
import { BASE_URL } from '../api/instance';

// 서버로부터 챌린지들을 받아오기
const useChallengeListStore = create((set) => ({
  challengeList: [],
  updateChallengeListInfo: async (finished) => {
    try {
      // queryParams로 리스트 10개 씩 받아오기
      const responseData = await fetchInstance(`${BASE_URL}/api/challenge`, {
        method: 'GET',
        queryParams: { finished, page_size: 10, cursor: '' },
      });

      // 정상적으로 갔다면 id, title, category, enddate로 나눠서 set
      if (responseData) {
        const transformedData = responseData.content.map(({ id, title, category, endDate }) => ({
          id,
          title,
          category,
          endDate,
        }));
        set({ challengeList: transformedData });
      } else {
        console.warn('Unexpected response data format:', responseData);
      }
    } catch (error) {
      console.error('업데이트 리스트 에러:', error);
    }
  },
}));

export default useChallengeListStore;
