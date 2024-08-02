import React from "react";
import styled from "@emotion/styled";
import { colors } from "../../../../styles/variants";
import CategoryBox from "../../../common/Categories";
import { getEngCategoryType } from "../../../../utils/getEngCategoryType";


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

    return (
        <Wrapper>
            <Header>
                <p>{day}</p>
                <p>{dateNum}</p>
            </Header>
            <Box>
            <CategoryBox type={"beer"} count={3}/>
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

export default OneDay;