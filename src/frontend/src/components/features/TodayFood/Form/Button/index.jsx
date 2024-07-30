import styled from '@emotion/styled';
import { colors } from '../../../../../styles/variants';

export function SubmitButton({ children }) {
  return <Button>{children}</Button>;
}

const Button = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding: 15px 0;
  border-radius: 5px;
  background-color: ${colors.mainOrange};
  color: ${colors.white};
`;
