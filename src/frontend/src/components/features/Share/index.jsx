import React from "react";
import styled from "@emotion/styled";
import { ReportCard } from "../../common/ReportCard";
import { useCalendarData } from "../../../api/hooks/useCalendarData";
import Loader from "../../common/Loader";
import { format, startOfMonth, endOfMonth } from "date-fns";
import useStandardDateStore from "../../../actions/useStandardDateStore";
import { colors } from "../../../styles/variants";
import { breakpoints } from "../../../styles/variants";
import { getIconPath } from "../../../utils/Icons/getIconPath";

const Share = () => {
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

    const firstRowFoodTypes = foodTypes.slice(0, 4);
    const secondRowFoodTypes = foodTypes.slice(4);
    
    const nickname = localStorage.getItem('nickname');

    return (
        <Wrapper>
            <ShareTitle>
                <span style={{ fontWeight: '600' }}>{nickname} 님의 월별 리포트</span>
            </ShareTitle>
            <Detail>나는 한달에 무엇을, 얼마나 자극적으로 먹었을까?</Detail>
            <ShareWrapper>
                <TopRow>
                    {firstRowFoodTypes.map(foodType => (
                        <ReportCard 
                            key={foodType} 
                            type={foodType} 
                            count={foodCounts[foodType] || 0} // 기본값 0
                        />
                    ))}
                </TopRow>
                <BottomRow>
                    {secondRowFoodTypes.map(foodType => (
                        <ReportCard 
                            key={foodType} 
                            type={foodType} 
                            count={foodCounts[foodType] || 0} // 기본값 0
                        />
                    ))}
                </BottomRow>
            </ShareWrapper>
            <img src={getIconPath("월별리포트하단로고")} alt="로고"/>
        </Wrapper>
    );
};

const Wrapper = styled.div`
    /* report_section */

    /* Auto layout */
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 0px 30px;
    gap: 20px;
`

const Detail = styled.p`
    font-style: normal;
    font-weight: 500;
    font-size: 16px;
    line-height: 18px;
    display: flex;
    align-items: center;
    text-align: center;
    letter-spacing: -0.05em;
    
    @media screen and (max-width: ${breakpoints.sm}) {
        font-size: 14px;
    }

    color: ${colors.mainGray};
`

const ShareWrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 20px;
    width: 100%;
    padding: 20px 0px;
`;

const TopRow = styled.div`
    display: flex;
    justify-content: center;
    gap: 20px;
`;

const BottomRow = styled.div`
    display: flex;
    justify-content: center;
    gap: 20px;
`;

const ShareTitle = styled.h1`
    /* 내 캘린더 */

    margin: 0 auto;

    font-family: 'Pretendard';
    font-style: normal;
    font-weight: 700;
    font-size: 28px;
    line-height: 33px;
    display: flex;
    align-items: center;
    text-align: center;
    letter-spacing: -0.05em;

    @media screen and (max-width: ${breakpoints.sm}) {
        font-size: 20px;
    }

    color: ${colors.mainGray}
`

export default Share;
