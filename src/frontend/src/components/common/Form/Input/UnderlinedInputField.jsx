import styled from 'styled-components';
import React, { forwardRef } from 'react';
import { colors } from '../../../../styles/variants';

export const UnderlinedInputField = forwardRef((props, ref) => {
  return <Field ref={ref} {...props} />;
});

const Field = styled.input`
  width: 100%;
  height: 40px;
  border: none;
  border-bottom: 1px solid ${colors.lightGray};
  box-sizing: border-box;
  background-color: transparent;
  outline: none;
  color: mainGray;

  &:focus {
    outline: none;
    border-bottom: 1px solid ${colors.point_orange};
  }
  &::placeholder {
    color: ${colors.lightGray};
  }
`;
