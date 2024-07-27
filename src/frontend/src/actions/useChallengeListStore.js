import { create } from 'zustand';
import fetchInstance from '../utils/fetchInstance';

/* 서버로부터 챌린지들을 받아오기 -> MyChallengeListView로 return */
const useChallengeListStore = create((set) => ({
    challengeList: [],
    updateChallengeListInfo: async (finished) => {
        try {

            const token = localStorage.getItem('token');
            
            if (!token) {
                throw new Error('No authentication token found');
            }

            const responseData = await fetchInstance('http://3.37.98.95:8080/api/challenge', {
                method: 'GET',
                queryParams: { finished: finished.toString(), page_size: 10, cursor: '' },
                headers: { Authorization: `${token}` }
            });

            if (responseData && responseData.content) {
                const transformedData = responseData.content.map(({ id, title, category, endDate }) => ({ id, title, category, endDate }));
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
