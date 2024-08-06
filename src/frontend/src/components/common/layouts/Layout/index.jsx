import styled from 'styled-components';
import { colors, breakpoints } from '../../../../styles/variants';
import MenuBar from '../../../features/Main/MenuBar';

export default function Layout({ children }) {
  return (
    <Wrapper>
      <Container>
        <MenuBar />
        {children}
      </Container>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: row;
  align-items: stretch;
  padding: 30px;
  gap: 30px;
  background-color: ${colors.backgroundColor};
  @media (max-width: ${breakpoints.sm}) {
    flex-direction: column;
  }
`;

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 30px 10px;
  gap: 30px;
  @media (max-width: ${breakpoints.sm}) {
    flex-direction: column;
    align-items: stretch;
  }
`;
