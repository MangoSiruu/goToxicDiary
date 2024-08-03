import styled from '@emotion/styled';
import { colors } from '../../../../styles/variants';

export function CategoryButton({ category, onClick, isSelected, disabled }) {
  return (
    <Button
      style={{
        backgroundColor: isSelected ? colors.point_orange : colors.backgroundColor,
        color: isSelected ? colors.white : colors.darkGray,
      }}
      onClick={() => onClick(category)}
      disabled={disabled}
    >
      {category}
    </Button>
  );
}

const Button = styled.button`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 5px 10px;
  gap: 10px;
  width: 90px;
  height: 35px;
  background: ${colors.backgroundColor};
  border-radius: 5px;
  transition:
    background 0.3s,
    color 0.3s;

  &:hover {
    background: ${colors.point_orange};
    color: ${colors.white};
  }
`;
