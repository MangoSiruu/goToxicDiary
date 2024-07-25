import styled from 'styled-components';
import { colors } from '../../../styles/variants';

export const Card = ({ children }) => {
  return <Wrapper>{children}</Wrapper>;
};

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
`;
