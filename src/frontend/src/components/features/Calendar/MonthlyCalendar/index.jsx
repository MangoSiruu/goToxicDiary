import React from "react";
import CalendarWrapper from "../CalendarWrapper";
import CalendarHeader from "../../CalendarHeader";
import OneMonth from "../../CalendarBody/OneMonth";
import useStandardDateStore from "../../../../actions/useStandardDateStore";
import { format } from "date-fns";
import styled from "@emotion/styled";

const MonthlyCalendar = () => {
    return (
        <CalendarWrapper>
            <CalendarHeader
                prevAction={useStandardDateStore((state) => state.subOneMonth)} 
                nextAction={useStandardDateStore((state) => state.addOneMonth)} 
                title={format(useStandardDateStore((state) => state.month), "yyyy년 M월")}>
            </CalendarHeader>
            <MonthlyWrapper>
                <OneMonth firstDay={useStandardDateStore((state) => state.month)}></OneMonth>
            </MonthlyWrapper>
        </CalendarWrapper>
    );
};

const MonthlyWrapper = styled.div`
    overflow-x: auto;
`

export default MonthlyCalendar;