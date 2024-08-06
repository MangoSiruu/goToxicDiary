import styled from '@emotion/styled';
import { UnderlinedButton } from '../../../common/Button/UnderlinedButton';
import { breakpoints } from '../../../../styles/variants';
import { path } from '../../../../routes/path';
import { useNavigate } from 'react-router-dom';

export function Header() {
  const nav = useNavigate();

  const moveToTodayEat = () => {
    nav(path.todayEat);
  };

  return (
    <Wrapper>
      <Title>오늘 내가 먹은 고자극 음식은?</Title>
      <UnderlinedButton onClick={moveToTodayEat} type="수정하기">수정하기</UnderlinedButton>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  gap: 10px;
  position: relative;

  width: 100%;
`;

const Title = styled.h1`
  font-weight: bold;
  font-size: 28px;
  @media screen and (max-width: ${breakpoints.sm}) {
    font-size: 20px;
  }
`;
