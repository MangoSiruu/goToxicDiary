import { create } from 'zustand';
import fetchInstance from '../utils/fetchInstance';

// 챌린지 삭제하기
const useChallengeDeleteStore = () => ({
    deleteChallenge: async (id) => {
        try {
            const response = fetchInstance(`http://3.37.98.95:8080/api/challenge/${id}`, {
                method: 'DELETE',
            });
            
            if (response) {
                console.log('Challenge successfully deleted.');
            } else {
                console.error('Failed to delete challenge:', response.statusText);
            }

        } catch (error) {
            console.error('업데이트 리스트 에러:', error);
        }
    },
});

export default useChallengeDeleteStore;