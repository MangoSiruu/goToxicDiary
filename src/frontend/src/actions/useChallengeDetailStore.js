import { create } from 'zustand';
import fetchInstance from '../utils/fetchInstance';

/* 서버로부터 챌린지 디테일 가져오기 */
const useChallengeDetailStore = create((set) => ({
    challengeList: [],
    
    updateChallengeDateInfo: async (id) => {
        console.log(id)
        
    
        try {
            const responseData = await fetchInstance(`https://67327f75-71f8-4777-acb0-9e7fee4f7680.mock.pstmn.io/api/challenge/${id}`, 'GET');

            console.log(responseData)
            
            if (responseData && responseData.challenge) {
                set({ challenge: responseData.challenge });
            }

        } catch (error) {
            console.error('업데이트 리스트 에러:', error);
        }
    },
}));

export default useChallengeDetailStore;