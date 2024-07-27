import { create } from 'zustand';
import fetchInstance from '../utils/fetchInstance';

/* 서버로부터 챌린지 디테일 가져오기 */
const useChallengeDetailStore = create((set) => ({
    challengeList: [],
    updateChallengeDateInfo: async (id) => {
        try {

            const token = localStorage.getItem('token');
            
            if (!token) {
                throw new Error('No authentication token found');
            }

            const responseData = await fetchInstance(`http://3.37.98.95:8080/api/challenge/${id}`, {
                method: 'GET',
                queryParams: { finished: 'false', page_size: 10, cursor: '' },
                headers: { Authorization: `${token}` }
            });
            
            if (responseData && responseData.challenge) {
                set({ challenge: responseData.challenge });
            }

        } catch (error) {
            console.error('업데이트 리스트 에러:', error);
        }
    },
}));

export default useChallengeDetailStore;