import styled from '@emotion/styled';
import { colors } from '../../../../styles/variants';
import { IconContainer } from '../../layouts/Icons';
import { getIconPath } from '../../../../utils/Icons/getIconPath';

export function Card({ toxicFood }) {
  const { name, count } = toxicFood;

  return (
    <Wrapper>
      <IconContainer src={getIconPath(name)} width="56px" height="46px" />
      <FoodName>{name}</FoodName>
      <Count>{count}</Count>
    </Wrapper>
  );
}

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
`;

export const Count = styled.h3`
  font-size: 16px;
  font-family: 'GmarketSansMedium';
  color: ${colors.mainGray};
  font-weight: 700;
`;
