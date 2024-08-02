import React from "react";
import styled from "@emotion/styled";
import OneWeek from "../OneWeek";

const OneMonth = () => {
    return (
        <Wrapper>
            <OneWeek></OneWeek>
            <OneWeek></OneWeek>
            <OneWeek></OneWeek>
            <OneWeek></OneWeek>
        </Wrapper>
    );
};

const Wrapper = styled.div`
`;

export default OneMonth;