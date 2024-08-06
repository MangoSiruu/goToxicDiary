import React from "react";
import CalendarWrapper from "../CalendarWrapper";
import CalendarHeader from "../../CalendarHeader";
import OneWeek from "../../CalendarBody/OneWeek";
import useStandardDateStore from "../../../../actions/useStandardDateStore";

const WeeklyCalendar = () => {
    
    const { subOneWeek, addOneWeek, getWeeksTitle, today, week } = useStandardDateStore(state => ({
        subOneWeek: state.subOneWeek,
        addOneWeek: state.addOneWeek,
        getWeeksTitle: state.getWeeksTitle,
        today: state.today,
        week: state.week
    }));

    return (
        <CalendarWrapper>
            <CalendarHeader 
                prevAction={subOneWeek} 
                nextAction={addOneWeek} 
                title={getWeeksTitle(today, week)}/>
            <OneWeek sundayDate={week} filter="전체"></OneWeek>
        </CalendarWrapper>
    );
};

export default WeeklyCalendar;