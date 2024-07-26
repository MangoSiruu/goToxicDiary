import { create } from 'zustand';
import fetchInstance from '../utils/fetchInstance';

/* 서버로 기존 챌린지 수정 후 보내기 */
const useEditChallengeStore = create((set) => ({
    challengeList: [], 
    updateChallengeListInfo: async (id) => {
        try {
            const responseData = await fetchInstance(`https://67327f75-71f8-4777-acb0-9e7fee4f7680.mock.pstmn.io/api/challenge/${id}`, 'PUT');
            
            console.log(responseData)
            if (responseData) {
-                set((state) => ({ challengeList: [...state.challengeList, responseData] }));
            } else {
                console.warn('Unexpected response data format:', responseData);
            }
        } catch (error) {
            console.error('업데이트 리스트 에러:', error);
        }
    },
}));

export default useEditChallengeStore;