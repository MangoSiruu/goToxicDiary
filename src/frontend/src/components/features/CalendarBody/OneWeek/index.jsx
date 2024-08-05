import React from "react";
import OneDay from "../OneDay";
import styled from "@emotion/styled";
import { colors } from "../../../../styles/variants";
import { format, add } from "date-fns";

// <OneWeek sundayDate="2024-08-04" filter=""></OneWeek>
const OneWeek = ({ sundayDate, filter }) => {
    // 무조건 7일 기록 받아오기
    const response = {
        "message" : "섭취 기록 리스트 조회 성공",
        "dailyRecords" : [
            {
                "date" : "2024-08-04",
                "toxicFoods" : [
                    {"name" : "술", "count" : 1},
                    {"name" : "카페인", "count" : 2}
                ],
                "challengeSuccess" : [
                    {"category":"카페인", "success" : true},
                    {"category":"슬", "success" : false}
                ]
            },
            {
                "date" : "2024-08-05",
                "toxicFoods" : [
                    {"name" : "매운음식", "count" : 2},
                    {"name" : "야식", "count" : 1}
                ],
                "challengeSuccess" : [
                    {"category":"카페인", "success" : true},
                    {"category":"슬", "success" : false}
                ]
            },
            {
                "date" : "2024-08-06",
                "toxicFoods" : [
                    {"name" : "매운음식", "count" : 2},
                    {"name" : "야식", "count" : 1}
                ],
                "challengeSuccess" : [
                    {"category":"카페인", "success" : true},
                    {"category":"슬", "success" : false}
                ]
            },
            {
                "date" : "2024-08-07",
                "toxicFoods" : [
                ],
                "challengeSuccess" : [
                    {"category":"카페인", "success" : true},
                    {"category":"슬", "success" : false}
                ]
            },
            {
                "date" : "2024-08-08",
                "toxicFoods" : [
                    {"name" : "매운음식", "count" : 2},
                    {"name" : "야식", "count" : 1}
                ],
                "challengeSuccess" : [
                    {"category":"카페인", "success" : true},
                    {"category":"슬", "success" : false}
                ]
            },
            {
                "date" : "2024-08-09",
                "toxicFoods" : [
                    {"name" : "매운음식", "count" : 2},
                    {"name" : "야식", "count" : 1}
                ],
                "challengeSuccess" : [
                    {"category":"카페인", "success" : true},
                    {"category":"슬", "success" : false}
                ]
            },
            {
                "date" : "2024-08-10",
                "toxicFoods" : [
                    {"name" : "매운음식", "count" : 2},
                    {"name" : "야식", "count" : 1}
                ],
                "challengeSuccess" : [
                    {"category":"카페인", "success" : true},
                    {"category":"슬", "success" : false}
                ]
            }
        ]
    }

    return (
        <CalendarBody>
            <Wrapper>
                {response.dailyRecords.map((record, index) => (
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