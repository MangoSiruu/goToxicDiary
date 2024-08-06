import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { breakpoints, colors } from '../../../../../styles/variants';
import { IconContainer } from '../../../../common/layouts/Icons';
import { getIconPath } from '../../../../../utils/Icons/getIconPath';
import getDayCount from '../../../../../utils/Calendar/getDayCount';
import ProgressRate from './ProgressRate';
import ChallegePreview from './ChallengePreview';

export function WidgetBox({ challenge }) {
  const { category } = challenge;
  const remainingDays = getDayCount(challenge.endDate);
  const nav = useNavigate();

  const moveTodetail = () => {
    nav(`/challengedetail/${challenge.id}`);
  };

  return (
    <Wrapper onClick={moveTodetail}>
      <Header>
        <HeaderContainer>
          <IconContainer src={getIconPath(category)} width="50px" height="50px" />
          <Inner>
            <Title>{challenge.title}</Title>
            <Description>
              남은 일수 <span style={{ fontWeight: 700, fontSize: '14px' }}>{remainingDays}</span>
            </Description>
          </Inner>
          <ProgressRate id={challenge.id} />
        </HeaderContainer>
      </Header>
      <ChallegePreview id={challenge.id} />
    </Wrapper>
  );
}

const Wrapper = styled.button`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px;
  gap: 10px;
  background: #ffffff;
  border-radius: 20px;
  min-height: 219px;
`;

const Header = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 10px 4px;
  gap: 10px;
  border-bottom: 1px solid #bdbdbd;
  position: relative;
  margin-left: 8px;
`;

const HeaderContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 2px;
`;

const Inner = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 8px;
  margin-left: -8px;
`;

const Title = styled.span`
  font-size: 14px;
  font-family: 'GmarketSansMedium';
  @media screen and (max-width: ${breakpoints.sm}) {
    font-size: 14px;
  }
`;

const Description = styled.span`
  color: ${colors.mainOrange};
  font-family: 'GmarketSansMedium';
  font-size: 12px;
`;
