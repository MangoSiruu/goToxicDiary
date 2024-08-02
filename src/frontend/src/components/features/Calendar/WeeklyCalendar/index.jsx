import React from "react";
import CalendarWrapper from "../CalendarWrapper";
import CalendarHeader from "../../CalendarHeader";
import OneWeek from "../../CalendarBody/OneWeek";

const WeeklyCalendar = () => {
    return (
        <CalendarWrapper>
            <CalendarHeader prevAction="" nextAction="" title="2024년 7월 셋째주"></CalendarHeader>
            <OneWeek></OneWeek>
        </CalendarWrapper>
    );
};

export default WeeklyCalendar;