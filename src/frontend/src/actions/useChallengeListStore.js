import { create } from 'zustand';
import fetchInstance from '../utils/fetchInstance';

/* 서버로부터 챌린지들을 받아오기 -> MyChallengeListView로 return */
const useChallengeListStore = create((set) => ({
    challengeList: [],
    updateChallengeListInfo: async () => {
        try {
            const responseData = await fetchInstance('https://67327f75-71f8-4777-acb0-9e7fee4f7680.mock.pstmn.io/api/challenge', 'GET');

            console.log(responseData)
            
            if (Array.isArray(responseData)) {
                const transformedData = responseData.map(({ id, title, toxicCategory, startDate, endDate }) => ({ id, title, toxicCategory, startDate, endDate }));
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
