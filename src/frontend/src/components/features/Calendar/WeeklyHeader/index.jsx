import styled from '@emotion/styled';
import { UnderlinedButton } from '../../../common/Button/UnderlinedButton';
import { breakpoints } from '../../../../styles/variants';
import { useNavigate } from 'react-router-dom';
import { path } from '../../../../routes/path';

export function WeeklyHeader() {
  const nav = useNavigate();

  const moveToCalendar = () => {
    nav(path.calendar); 
  };

  return (
    <Wrapper>
      <Title>주차별 내 캘린더</Title>
      <UnderlinedButton onClick={moveToCalendar}>보러가기</UnderlinedButton>
    </Wrapper>
  );
}

const Wrapper = styled.div`
    /* title */

    /* Auto layout */
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 10px;
    gap: 10px;

    width: 100%;
`;

const Title = styled.h1`
  font-weight: bold;
  font-size: 28px;
  @media screen and (max-width: ${breakpoints.sm}) {
    font-size: 20px;
  }
`;
