import { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import { Card } from '../../../common/Card/Foods';
import { ExceptionCard } from '../../../common/Card/Foods/Exception';

export function CardList({ toxicFoods }) {
  const [todayToxicFoods, setTodayToxicFoods] = useState([]);

  useEffect(() => {
    setTodayToxicFoods(toxicFoods);
  }, [toxicFoods]);

  const renderList = () => {
    if (!todayToxicFoods) {
      return (
        <Wrapper>
          <ExceptionCard />
        </Wrapper>
      );
    }
    return (
      <Wrapper>
        {todayToxicFoods.map((toxicFood) => (
          <Card key={toxicFood.name} toxicFood={toxicFood} />
        ))}
      </Wrapper>
    );
  };
  return renderList();
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 20px 0px;
  gap: 20px;
`;
