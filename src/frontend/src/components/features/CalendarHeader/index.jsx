import React from "react";
import styled from "@emotion/styled";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { colors } from "../../../styles/variants";

// <CalendarHeader prevAction={} nextAction={} title=""></CalendarHeader>
const CalendarHeader = ({ prevAction, nextAction, title }) => {
    return (
        <Wrapper>
            <Button onClick={prevAction}><IoIosArrowBack size='30' color={colors.mainOrange}/></Button>
            <p>{title}</p>
            <Button onClick={nextAction}><IoIosArrowForward size='30' color={colors.mainOrange}/></Button>
        </Wrapper>
    );
};

const Wrapper = styled.div`
    /* calendar_header */

    /* Auto layout */
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 4px 20px;
    gap: 10px;
    background-color: ${colors.white};
`;

const Button = styled.button`
    outline: none;
`;

export default CalendarHeader;