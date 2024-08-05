import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { path } from '../../../../routes/path';
import { breakpoints } from '../../../../styles/variants';

export default function UserBanner() {
  const nickname = localStorage.getItem('nickname');
  const nav = useNavigate();

  const moveToTodayEat = () => {
    nav(path.todayEat);
  };
  return (
    <Wrapper>
      <Title>
        <span style={{ fontWeight: '600', fontFamily: 'GmarketSansMedium' }}>{nickname}</span>님
        안녕하세요!
      </Title>
      <Button onClick={moveToTodayEat}>기록하러 가기</Button>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 15px 20px;
  gap: 10px;
  background-color: #f7ad19;
  border-radius: 10px;
`;

const Button = styled.button`
  font-size: 14px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 4px 8px;
  color: white;
  background-color: rgba(255, 255, 255, 0.3);
  border-radius: 5px;
  @media (max-width: ${breakpoints.sm}) {
    font-size: 12px;
  }
`;

const Title = styled.span`
  font-size: 20px;
  font-family: 'GmarketSansMedium';
  color: white;
  @media (max-width: ${breakpoints.sm}) {
    font-size: 14px;
  }
`;
