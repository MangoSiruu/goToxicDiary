import styled from '@emotion/styled';
import { colors } from '../../../../../styles/variants';

export function SubmitButton({ children, theme }) {
  return <Button theme={theme}>{children}</Button>;
}

const Button = styled.button(({ theme }) => ({
  width: '100%',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: theme === 'orange' ? `${colors.mainOrange}` : `${colors.lightGray}`,
  border: 'none',
  borderRadius: '5px',
  color: `${colors.white},`,
  cursor: 'pointer',
  padding: '15px 0',
  transition: 'background-color 0.3s ease',
}));
