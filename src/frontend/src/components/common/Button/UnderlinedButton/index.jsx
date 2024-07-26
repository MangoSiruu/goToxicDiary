import styled from '@emotion/styled';
import { colors } from '../../../../styles/variants';

export function UnderlinedButton({ children }) {
  return <Button>{children}</Button>;
}

const Button = styled.button`
  color: ${colors.mainOrange};
  font-size: 14px;
  font-weight: bold;
  right: 10px;
  text-decoration: underline;
`;
