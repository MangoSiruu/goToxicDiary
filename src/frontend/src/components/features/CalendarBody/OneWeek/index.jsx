import React from "react";
import OneDay from "../OneDay";
import styled from "@emotion/styled";
import { colors } from "../../../../styles/variants";
import { format, add } from "date-fns";
import { useCalendarData } from "../../../../api/hooks/useCalendarData";
import Loader from "../../../common/Loader";

// <OneWeek sundayDate="2024-08-04" filter=""></OneWeek>
const OneWeek = ({ sundayDate, filter }) => {
    const { data, error, isLoading } = useCalendarData({
        start_date: format(sundayDate, "yyyy-MM-dd"),
        end_date: format(add(sundayDate, {days: 6}), "yyyy-MM-dd"),
        filter_category: filter,
    });

    console.log(data);

    if (isLoading) return <Loader></Loader>
    if (error) return <p>Error: {error.message}</p>;

     // data가 정의되어 있지 않을 경우 빈 배열을 사용
     const dailyRecords = data?.dailyRecords || [];


    // const response = {
    //     "message" : "섭취 기록 리스트 조회 성공",
    //     "dailyRecords" : [
    //         {
    //             "date" : "2024-08-04",
    //             "toxicFoods" : [
    //                 {"name" : "술", "count" : 1}
    //             ],
    //             "challengeSuccess" : [
    //                 {"category":"카페인", "success" : true},
    //                 {"category":"슬", "success" : false}
    //             ]
    //         },
    //         {
    //             "date" : "2024-08-05",
    //             "toxicFoods" : [
    //                 {"name" : "매운음식", "count" : 2}
    //             ],
    //             "challengeSuccess" : [
    //                 {"category":"카페인", "success" : true},
    //                 {"category":"슬", "success" : false}
    //             ]
    //         } ...
    //     ]
    // }

    return (
        <CalendarBody>
            <Wrapper>
                {data.dailyRecords.map((record, index) => (
                    <OneDay 
                        key={index}
                        dateStr={record.date}
                        dailyResponse={record}>
                    </OneDay>
                ))}
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