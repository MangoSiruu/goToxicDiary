import React from 'react';
import styled from '@emotion/styled';
import { format, add } from 'date-fns';
import OneDay from '../OneDay';
import { colors } from '../../../../styles/variants';
import { useCalendarData } from '../../../../api/hooks/useCalendarData';
import Loader from '../../../common/Loader';

// <OneWeek sundayDate="2024-08-04" filter=""></OneWeek>
function OneWeek({ sundayDate, filter }) {
  const { data, error, isLoading } = useCalendarData({
    start_date: format(sundayDate, 'yyyy-MM-dd'),
    end_date: format(add(sundayDate, { days: 6 }), 'yyyy-MM-dd'),
    filter_category: filter,
  });

  if (isLoading) return <Loader />;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <CalendarBody>
      <Wrapper>
        {data.dailyRecords.map((record) => (
          <OneDay key={data.dailyRecords.date} dateStr={record.date} dailyResponse={record} />
        ))}
      </Wrapper>
    </CalendarBody>
  );
}

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
