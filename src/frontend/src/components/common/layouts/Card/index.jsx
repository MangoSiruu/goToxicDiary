import styled from '@emotion/styled';
import { colors } from '../../../styles/variants';
import { IconContainer } from '../Icons';
import { getIconPath } from '../../../../utils/Icons/getIconPath';

export const Card = ({ toxicFood }) => {
  const name = toxicFood.name;
  const count = toxicFood.count;

  return (
    <Wrapper>
      <IconContainer width="56px" height="46px" src={getIconPath(name)} />
      <FoodName>{name}</FoodName>
      <Count>{count}</Count>
    </Wrapper>
  );
};

export const Wrapper = styled.div`
  width: 130px;
  height: 150px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  padding: 20px 30px;
  border-radius: 20px;
  background: ${colors.white};
  cursor: pointer;
`;

export const FoodName = styled.h4`
  font-size: 14px;
  font-family: 'GmarketSansMedium';
  color: ${colors.midgray};
  letter-spacing: -0.05em;
`;

export const Count = styled.h3`
  font-size: 16px;
  font-family: 'GmarketSansMedium';
  color: ${colors.darkGray};
  letter-spacing: -0.05em;
`;
