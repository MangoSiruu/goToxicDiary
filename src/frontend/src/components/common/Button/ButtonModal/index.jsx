import styled from '@emotion/styled';
import { colors } from '../../../../styles/variants';

export function ConfirmButton({ children }) {
  return <Confirm>{children}</Confirm>;
}

export function CancelButton({ children }) {
  return <Cancel>{children}</Cancel>;
}

const Confirm = styled.button`
  width: 130px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 15px 10px;
  border-radius: 5px;
  font-size: 16px;
  font-weight: 500;
  background: ${colors.mainOrange};
  color: ${colors.white};
`;

const Cancel = styled.button`
  width: 130px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 15px 10px;
  border-radius: 5px;
  font-size: 16px;
  font-weight: 500;
  background: ${colors.lightGray};
  color: ${colors.white};
`;
