import styled from 'styled-components';
import TodayFoodSection from '../../components/features/Main/TodayFoodSection';
import { ChallengeWidgetSection } from '../../components/features/Main/ChallengeWidgetSection';
import { colors } from '../../styles/variants';

export default function MainPage() {
  return (
    <Wrapper>
      <Container>
        <RightSection>
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
  display: flex;
  flex-direction: row;
  align-items: center;
  flex-wrap: wrap;
  padding: 30px;
  gap: 30px;
  width: 100%;
  height: 100vh;
  background-color: ${colors.backgroundColor};
`;

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 30px 10px;
  gap: 30px;
`;

const RightSection = styled.section`
  width: 70%;
  max-width: 883px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0px 10px;
  gap: 20px;
`;

const LeftSection = styled.section`
  width: 30%;
  max-width: 297px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  gap: 40px;
  background: rgba(255, 255, 255, 0.5);
  border-radius: 20px;
`;
