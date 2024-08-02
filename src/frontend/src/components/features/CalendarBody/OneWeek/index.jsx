import React from "react";
import OneDay from "../OneDay";
import styled from "@emotion/styled";
import { colors } from "../../../../styles/variants";

const OneWeek = () => {
    return (
        <CalendarBody>
            <Wrapper>
                <OneDay dateStr={"2024-07-21"}></OneDay>
                <OneDay dateStr={"2024-07-22"}></OneDay>
                <OneDay dateStr={"2024-07-23"}></OneDay>
                <OneDay dateStr={"2024-07-24"}></OneDay>
                <OneDay dateStr={"2024-07-25"}></OneDay>
                <OneDay dateStr={"2024-07-26"}></OneDay>
                <OneDay dateStr={"2024-07-27"}></OneDay>
            </Wrapper>
        </CalendarBody>
    );
};

const Wrapper = styled.div`
    /* wrapper */

    /* Auto layout */
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 0px 20px;
    gap: 10px;
`;

const CalendarBody = styled.div`
    /* calendar_body */

    /* Auto layout */
    flex-direction: row;
    justify-content: center;
    align-items: flex-start;
    padding: 20px 0px 10px 0px;
    gap: 10px;

    background-color: ${colors.white};
`;

export default OneWeek;