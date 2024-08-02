import React from "react";
import CalendarWrapper from "../CalendarWrapper";
import CalendarHeader from "../../CalendarHeader";
import OneMonth from "../../CalendarBody/OneMonth";

const MonthlyCalendar = () => {
    return (
        <CalendarWrapper>
            <CalendarHeader prevAction="" nextAction="" title="2024년 7월"></CalendarHeader>
            <OneMonth></OneMonth>
        </CalendarWrapper>
    );
};

export default MonthlyCalendar;