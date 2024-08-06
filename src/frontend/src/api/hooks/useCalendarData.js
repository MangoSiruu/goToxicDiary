import { axiosInstance } from '../instance';
import { endpoint } from '../path';
import { useQuery } from '@tanstack/react-query';

// 데이터 요청 함수
export const fetchCalendarData = async ({ start_date, end_date, filter_category }) => {
    const response = await axiosInstance.get(endpoint.CALENDAR, {
        params: { start_date, end_date, filter_category },
    });
    return response.data;
};

// 쿼리 키를 정의
const calendarDataKey = [endpoint.CALENDAR];

export const useCalendarData = ({ start_date, end_date, filter_category }) =>
    useQuery({
        queryKey: [calendarDataKey, { start_date, end_date, filter_category }],
        queryFn: () => fetchCalendarData({ start_date, end_date, filter_category }),
    });