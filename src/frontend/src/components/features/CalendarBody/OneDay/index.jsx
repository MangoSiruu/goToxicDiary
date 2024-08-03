import React from "react";
import styled from "@emotion/styled";
import { colors } from "../../../../styles/variants";
import CategoryBox from "../../../common/Categories";
import { getEngCategoryType } from "../../../../utils/getEngCategoryType";
import { getIconPath } from "../../../../utils/Icons/getIconPath";


// 컴포넌트 설명
// @param dateStr
// return (
//  <OneDay dateStr="2024-07-27"></OneDay>
// )
const OneDay = ({ dateStr }) => {
    // 표시할 날을 "YYYY-MM-DD" 형식의 string으로 받아온 다음 Date 객체로 변경
    const date = new Date(dateStr);

    // 요일 배열
    const days = ["일", "월", "화", "수", "목", "금", "토"];
    // 요일 표시
    const day = days[date.getDay()];

    // 표시할 일자
    const dateNum = date.getDate();

    // fetchInstance(url/api/calendar/dateStr, 'GET') - 캘린더 하루 조회
    const response = {
        "message" : "섭취 기록 조회 성공",
        "dailyRecord" : [
            {
                "date" : "2024-07-24",
                "toxicFoods" : [
                    {"name" : "술", "count": 2},
					{"name" : "카페인", "count": 3},
					{"name" : "액상과당", "count": 1}
                ]
            }
        ]
    };

    return (
        <Wrapper>
            <Header>
                <p>{day}</p>
                <p>{dateNum}</p>
            </Header>
            {response.dailyRecord.map(record => (
                <Box key={record.date}>
                    {record.toxicFoods.length > 0 ? (record.toxicFoods.map(food => (
                        <CategoryBox key={food.name} type={getEngCategoryType(food.name)} count={food.count}/>
                    ))
                ) : (
                    <EmptyBox>
                        <img src={getIconPath("로고")} alt="망고 로고"></img>
                        <p>텅</p>
                    </EmptyBox>
                )}
                </Box>
            ))}
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

    background-color: ${ colors.white };
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
`;

export default OneDay;