import { create } from 'zustand';
import fetchInstance from '../utils/fetchInstance';

/* 서버로 새로운 챌린지 생성후 보내기 */
const useNewChallengeStore = create((set) => ({
    challengeList: [],
    createChallengeListInfo: async (challengeData) => {
        try {
            const token = localStorage.getItem('token');

            if (!token) {
                throw new Error('No authentication token found');
            }

            const responseData = await fetchInstance('http://3.37.98.95:8080/api/challenge', {
                method: 'POST',
                headers: { Authorization: `${token}` },
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
