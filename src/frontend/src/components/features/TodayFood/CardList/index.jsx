import { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import { Card } from '../../../common/Card/Foods';

export function CardList({ toxicFoods }) {
  const [todayToxicFoods, setTodayToxicFoods] = useState([]);

  useEffect(() => {
    setTodayToxicFoods(toxicFoods);
  }, [toxicFoods]);

  return (
    <Wrapper>
      {todayToxicFoods.map((toxicFood) => (
        <Card toxicFood={toxicFood} />
      ))}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 20px 0px;
  gap: 20px;
`;
