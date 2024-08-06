import styled from '@emotion/styled';
import { colors, breakpoints } from '../../../../../styles/variants';

export const Error = styled.span`
  color: ${colors.mainOrange};
`;

export const FormWrapper = styled.div`
  width: 351px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  padding: 20px 0;
  @media screen and (max-width: ${breakpoints.sm}) {
    width: 280px;
  }
`;

export const FormBox = styled.div`
  width: 100%;
`;

export const Label = styled.label`
  width: 100%;
  font-size: 16px;
  font-weight: 600;
  color: ${colors.mainGray};
`;
