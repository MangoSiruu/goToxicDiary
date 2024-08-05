import React from "react";
import styled from "@emotion/styled";
import { colors } from "../../../../styles/variants";

const CalendarWrapper = ({ children }) => {
    return (
        <Wrapper>{children}</Wrapper>
    );
};

const Wrapper = styled.div`
    /* calendar_wrapper */

    /* Auto layout */
    flex-direction: column;
    align-items: center;
    padding: 10px 20px;
    gap: 5px;

    position: relative;

    background: ${ colors.white };
    border-radius: 20px;
`;

// 아래 코드도 동작함
// const CalendarWrapper = styled.div`
//     /* calendar_wrapper */

//     /* Auto layout */
//     flex-direction: column;
//     align-items: center;
//     padding: 10px 20px;
//     gap: 5px;

//     position: relative;

//     background: ${ colors.white };
//     border-radius: 20px;
// `; 

export default CalendarWrapper;