// import styled from '@emotion/styled';
// import { colors } from '../../../../styles/variants';

// export function CategoryButton({ category, onClick, isSelected, disabled }) {
//   return (
//     <Button
//       style={{
//         backgroundColor: isSelected ? colors.mainOrange : colors.backgroundColor,
//         color: isSelected ? colors.white : colors.darkGray,
//       }}
//       onClick={() => onClick(category)}
//       disabled={disabled}
//     >
//       {category}
//     </Button>
//   );
// }

// const Button = styled.button`
//   display: flex;
//   flex-direction: row;
//   justify-content: center;
//   align-items: center;
//   padding: 5px 10px;
//   gap: 10px;
//   width: 90px;
//   height: 35px;
//   background: ${colors.backgroundColor};
//   border-radius: 5px;
//   transition:
//     background 0.3s,
//     color 0.3s;

//   &:hover {
//     background: ${colors.point_orange};
//     color: ${colors.white};
//   }
// `;


import React from 'react';
import styled from '@emotion/styled';
import { colors } from '../../../../styles/variants';

export function CategoryButton({ category, onClick, isSelected, disabled }) {
  return (
    <Button
      onClick={() => !disabled && onClick(category)}
      isSelected={isSelected}
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
  background: ${({ isSelected }) => (isSelected ? colors.mainOrange : colors.backgroundColor)};
  color: ${({ isSelected }) => (isSelected ? colors.white : colors.darkGray)};
  border-radius: 5px;
  transition: background 0.3s, color 0.3s;
  border: none;
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
  opacity: ${({ disabled }) => (disabled ? 0.6 : 1)};

  &:hover {
    background: ${({ isSelected, disabled }) => (!disabled && !isSelected ? colors.point_orange : 'inherit')};
    color: ${({ isSelected, disabled }) => (!disabled && !isSelected ? colors.white : 'inherit')};
  }
`;
