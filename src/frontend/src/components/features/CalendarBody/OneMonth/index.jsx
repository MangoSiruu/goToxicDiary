import React from "react";
import styled from "@emotion/styled";
import OneWeek from "../OneWeek";
import { format, endOfMonth, startOfWeek, endOfWeek, eachWeekOfInterval } from "date-fns";

// <OneMonth firstDay={startOfMonthDate(new Date())}></OneMonth>
const OneMonth = ({ firstDay }) => {
    // startOfMonthDate == firstDay
    const endOfMonthDate = endOfMonth(firstDay);

    // 각 주의 시작 날짜와 끝 날짜를 가져오기
    const weeks = eachWeekOfInterval({
        start: startOfWeek(firstDay),
        end: endOfWeek(endOfMonthDate),
    });

    return (
        <Wrapper>
            {weeks.map((weekStartDate) => {
                const sundayDate = format(weekStartDate, "yyyy-MM-dd");
                return <OneWeek key={sundayDate} sundayDate={sundayDate}></OneWeek>;
            })}
        </Wrapper>
    );
};

const Wrapper = styled.div`
`;

export default OneMonth;