import styled from 'styled-components';
import { breakpoints } from '../../../../../styles/variants';

export function WidgetBox({ challenge }) {
  return (
    <Header>
      <HeaderContainer>
        <Title>{challenge.title}</Title>
      </HeaderContainer>
    </Header>
  );
}

const Header = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 10px 4px;
  gap: 10px;
  border-bottom: 1px solid #bdbdbd;
`;

const HeaderContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 2px;
`;

const Title = styled.span`
  font-size: 16px;
  font-family: 'GmarketSansMedium';
  @media screen and (max-width: ${breakpoints.sm}) {
    font-size: 14px;
  }
`;
