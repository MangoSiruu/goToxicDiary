import React from "react";
import styled from "@emotion/styled";
import { ReportCard } from "../../../common/ReportCard";
import { useCalendarData } from "../../../../api/hooks/useCalendarData";
import Loader from "../../../common/Loader";
import { format, startOfMonth, endOfMonth } from "date-fns";
import useStandardDateStore from "../../../../actions/useStandardDateStore";

const Reports = () => {
    // 음식 종류 배열
    const foodTypes = [
        "술", 
        "인스턴트", 
        "매운음식", 
        "카페인", 
        "야식", 
        "액상과당", 
        "기타"
    ];

    // 특정 음식의 일수를 카운트하는 함수
    const calculateDaysWithFoods = (dailyRecords) => {
        // 음식 종류별로 카운트를 저장할 객체
        const counts = foodTypes.reduce((acc, food) => {
            acc[food] = 0;
            return acc;
        }, {});

        // dailyRecords를 순회하며 음식 카운트 업데이트
        dailyRecords.forEach(record => {
            foodTypes.forEach(food => {
                const isExist = record.toxicFoods.some(item => item.name === food);
                if (isExist) {
                    counts[food]++;
                }
            });
        });

        return counts;
    };

    const { month } = useStandardDateStore(state => ({
        month: state.month
    }));

    const { data = {}, error, isLoading } = useCalendarData({
        start_date: format(startOfMonth(month), "yyyy-MM-dd"),
        end_date: format(endOfMonth(month), "yyyy-MM-dd"),
        filter_category: "전체",
    });

    if (isLoading) return <Loader />;
    if (error) return <p>Error: {error.message}</p>;

    // 음식별 카운트 계산
    const foodCounts = calculateDaysWithFoods(data.dailyRecords || []);

    return (
        <Wrapper>
            {foodTypes.map(foodType => (
                <ReportCard 
                    key={foodType} 
                    type={foodType} 
                    count={foodCounts[foodType] || 0} // 기본값 0
                />
            ))}
        </Wrapper>
    );
};

const Wrapper = styled.div`
    /* report_box_container */

    /* Auto layout */
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 20px 0px;
    gap: 20px;

    width: 100%;
    
    overflow-x: scroll;
`;

export default Reports;
