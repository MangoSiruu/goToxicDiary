import { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import { Card } from '../../../common/layouts/Card';

export const CardList = ({ toxicFoods }) => {
  const [todayToxicFoods, setTodayToxicFoods] = useState([]);

  useEffect(() => {
    setTodayToxicFoods(toxicFoods);
    console.log(toxicFoods);
  }, [toxicFoods]);

  return (
    <Wrapper>
      {todayToxicFoods.map((food, index) => {
        <Card key={index} toxicFood={food} />;
      })}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 20px 0px;
  gap: 20px;
`;
