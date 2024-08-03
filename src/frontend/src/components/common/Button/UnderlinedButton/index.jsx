import React from 'react';
import styled from '@emotion/styled';
import { colors } from '../../../../styles/variants';

export function UnderlinedButton({ onClick, children }) {
  return <Button onClick={onClick}>{children}</Button>;
}

const Button = styled.button`
  color: ${colors.mainOrange};
  font-size: 14px;
  font-weight: bold;
  right: 10px;
  text-decoration: underline;
`;
