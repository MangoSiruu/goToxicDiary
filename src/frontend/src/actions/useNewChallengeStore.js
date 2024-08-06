import { create } from 'zustand';
import fetchInstance from '../utils/fetchInstance';

// 새로운 챌린지 생성후 보내기
const useNewChallengeStore = create((set) => ({
    challengeList: [],
    createChallengeListInfo: async (challengeData) => {
        try {
            // body에 JSON 데이터가 담겨져서 보내짐
            const responseData = await fetchInstance('http://13.125.171.199:8080/api/challenge', {
                method: 'POST',
                body: challengeData
            });

            if (responseData) {
                set((state) => ({ challengeList: [...state.challengeList, responseData] }));
            } else {
                console.warn('Unexpected response data format:', responseData);
            }
        } catch (error) {
            console.error('업데이트 리스트 에러:', error);
        }
    },
}));

export default useNewChallengeStore;
