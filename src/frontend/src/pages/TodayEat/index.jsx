import styled from 'styled-components';
import { useEffect, useState } from 'react';
import { Wrapper } from '../../components/common/layouts/Wrapper/Orange';
import { TodayEatForm } from '../../components/features/TodayFood/Form';
import { CardList } from '../../components/features/TodayFood/CardList';
import useTodayFoods from '../../hooks/useTodayEatFoods';
import { breakpoints } from '../../styles/variants';
import RetryErrorBoundary from '../../components/common/RetryErrorBoundary';
import { UnderlinedButton } from '../../components/common/Button/UnderlinedButton';
import { path } from '../../routes/path';

export default function TodayEatPage() {
  const [toxicFoods, setToxicFoods] = useState([]);
  const todayFoods = useTodayFoods();

  useEffect(() => {
    if (todayFoods) {
      setToxicFoods(todayFoods);
    }
  }, [todayFoods]);

  const handleFoodsUpdate = (newToxicFoods) => {
    setToxicFoods(newToxicFoods);
  };

  const moveToBack = () => {
    window.location.href = path.main;
  };

  return (
    <Wrapper>
      <Title>오늘 내가 먹은 고자극 음식은?</Title>
      <CardList toxicFoods={toxicFoods} />
      <RetryErrorBoundary>
        <TodayEatForm todayFoods={todayFoods} onFoodsUpdate={handleFoodsUpdate} />
      </RetryErrorBoundary>
      <UnderlinedButton onClick={moveToBack}>뒤로가기</UnderlinedButton>
    </Wrapper>
  );
}

const Title = styled.h1`
  font-size: 24px;
  font-weight: bold;
  @media screen and (max-width: ${breakpoints.sm}) {
    font-size: 16px;
  }
`;
