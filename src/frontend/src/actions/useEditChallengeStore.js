import { create } from 'zustand';
import fetchInstance from '../utils/fetchInstance';

/* 서버로 기존 챌린지 수정 후 보내기 */
const useEditChallengeStore = create((set) => ({
    challengeList: [], 
    updateChallengeListInfo: async (id) => {
        try {

            const token = localStorage.getItem('token');
            
            if (!token) {
                throw new Error('No authentication token found');
            }

            const responseData = await fetchInstance(`http://3.37.98.95:8080/api/challenge/${id}`, {
                method: 'PUT',
                headers: { Authorization: `${token}` }
            });

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