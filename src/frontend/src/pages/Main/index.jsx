import styled from 'styled-components';
import TodayFoodSection from '../../components/features/Main/TodayFoodSection';
import { ChallengeWidgetSection } from '../../components/features/Main/ChallengeWidgetSection';
import { colors, breakpoints } from '../../styles/variants';
import MenuBar from '../../components/features/Main/MenuBar';
import UserBanner from '../../components/features/Main/UserBanner';

export default function MainPage() {
  return (
    <Wrapper>
      <Container>
        <MenuBar />
        <RightSection>
          <UserBanner />
          <TodayFoodSection />
        </RightSection>
        <LeftSection>
          {' '}
          <ChallengeWidgetSection />
        </LeftSection>
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

const RightSection = styled.section`
  width: 100%;
  // max-width: 883px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0px 10px;
  gap: 20px;
`;

const LeftSection = styled.section`
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  gap: 40px;
  background-color: rgba(255, 255, 255, 0.5);
  border-radius: 20px;
  @media (max-width: ${breakpoints.sm}) {
    max-width: none;
    width: 100%;
    margin-top: 20px;
    background-color: ${colors.backgroundColor};
  }
`;
