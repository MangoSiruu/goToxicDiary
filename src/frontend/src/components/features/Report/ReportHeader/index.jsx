import React from "react";
import styled from "@emotion/styled";
import { colors } from "../../../../styles/variants";
import { breakpoints } from "../../../../styles/variants";

const ReportHeader = () => {
    return (
        <Wrapper>
            <Title>월별 리포트</Title>
            <SubTitle>나는 한달에 무엇을, 얼마나 자극적으로 먹었을까?</SubTitle>
        </Wrapper>
    );
};

const Wrapper = styled.div`
    /* title */

    /* Auto layout */
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 10px 108px;
    gap: 10px;

    width: 100%;
`

const Title = styled.h1`
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

    color: ${colors.darkGray};
`

const SubTitle = styled.p`
    font-family: 'Gmarket Sans TTF';
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

    color: ${colors.darkGray};
`

export default ReportHeader;