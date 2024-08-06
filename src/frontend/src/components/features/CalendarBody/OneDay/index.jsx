import React from "react";
import styled from "@emotion/styled";
import { colors } from "../../../../styles/variants";
import CategoryBox from "../../../common/Categories";
import { getEngCategoryType } from "../../../../utils/getEngCategoryType";
import { getIconPath } from "../../../../utils/Icons/getIconPath";
import { format } from "date-fns";

// <OneDay dateStr="2024-07-27" dailyResponse={response.map(...)}></OneDay>
const OneDay = ({ dateStr, dailyResponse }) => {
    // 표시할 날을 "YYYY-MM-DD" 형식의 string으로 받아온 다음 Date 객체로 변경
    const date = new Date(dateStr);
    const todayStr = format(new Date(), "yyyy-MM-dd");

    const isToday = dateStr === todayStr;

    // 요일 배열
    const days = ["일", "월", "화", "수", "목", "금", "토"];
    // 요일 표시
    const day = days[date.getDay()];

    // 표시할 일자
    const dateNum = date.getDate();

    // const dailyResponse = {
    //     "date" : "2024-08-10",
    //     "toxicFoods" : [
    //         {"name" : "매운음식", "count" : 2},
    //         {"name" : "야식", "count" : 1}
    //     ],
    //     "challengeSuccess" : [
    //         {"category":"카페인", "success" : true},
    //         {"category":"슬", "success" : false}
    //     ]
    // }

    return (
        <Wrapper isToday={isToday}>
            <Header>
                <p>{day}</p>
                <p>{dateNum}</p>
            </Header>
            <Box>
                {dailyResponse.toxicFoods.length > 0 ? (dailyResponse.toxicFoods.map(food => (
                    <CategoryBox key={food.name} type={getEngCategoryType(food.name)} count={food.count}/>
                ))
            ) : (
                <EmptyBox>
                    <img src={getIconPath("로고")} alt="망고 로고"></img>
                    <p>텅</p>
                </EmptyBox>
            )}
            </Box>
        </Wrapper>
    );
};

const Wrapper = styled.div`
    /* props_container */

    /* Auto layout */
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 5px 0px;
    gap: 10px;

    margin: 0 auto;

    background-color: ${ props => props.isToday ? 'rgba(244, 209, 96, 0.4)' : colors.white };
    border-radius: 10px;
`;

const Header = styled.div`
    /* header */

    /* Auto layout */
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 5px 20px;
    gap: 5px;
`;

const Box = styled.div`
    /* box */

    /* Auto layout */
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 5px;
    gap: 5px;

    height: 229px;
`;

const EmptyBox = styled.div`
    /* box-empty */

    /* Auto layout */
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 5px;
    gap: 5px;
    
    width: 90px;
`;

export default OneDay;