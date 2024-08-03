import { create } from 'zustand';
import fetchInstance from '../utils/fetchInstance';

// 서버로부터 챌린지들을 받아오기
const useChallengeListStore = create((set) => ({
    challengeList: [],
    cursor: '',
    hasNext: true,
    updateChallengeListInfo: async (finished, cursor = '') => {
        try {
            // queryParams로 리스트 10개 씩 받아오기
            const responseData = await fetchInstance('http://3.37.98.95:8080/api/challenge', {
                method: 'GET',
                queryParams: { finished: finished, page_size: 10, cursor },
            });

            // 정상적으로 갔다면 id, title, category, enddate로 나눠서 set
            // if (responseData) {
            //     const transformedData = responseData.content.map(({ id, title, category, startDate, endDate, maxCount }) => ({ id, title, category, startDate, endDate, maxCount }));
            //     set((state) => ({
            //         challengeList: cursor ? [...state.challengeList, ...transformedData] : transformedData,
            //         cursor: responseData.hasNext ? responseData.content.slice(-1)[0].id : '',
            //         hasNext: responseData.hasNext,
            //     }));

            // 되는데 느린데? -> 위에 주석은 원래 것 
            if (responseData) {
                const transformedData = responseData.content.map(({ id, title, category, startDate, endDate, maxCount }) => ({ id, title, category, startDate, endDate, maxCount }));
                set((state) => {
                    const newChallengeList = cursor ? [...state.challengeList, ...transformedData] : transformedData;
                    const uniqueChallengeList = Array.from(new Set(newChallengeList.map(ch => ch.id)))
                        .map(id => newChallengeList.find(ch => ch.id === id));
                    return {
                        challengeList: uniqueChallengeList,
                        cursor: responseData.hasNext ? responseData.content.slice(-1)[0].id : '',
                        hasNext: responseData.hasNext,
                    };
                });
            } else {
                console.warn('Unexpected response data format:', responseData);
            }
        } catch (error) {
            console.error('업데이트 리스트 에러:', error);
        }
    },
}));

export default useChallengeListStore;
