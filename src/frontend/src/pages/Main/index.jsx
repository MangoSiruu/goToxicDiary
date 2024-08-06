import styled from 'styled-components';
import TodayFoodSection from '../../components/features/Main/TodayFoodSection';
import { ChallengeWidgetSection } from '../../components/features/Main/ChallengeWidgetSection';
import UserBanner from '../../components/features/Main/UserBanner';
import { WeeklyHeader } from '../../components/features/Calendar/WeeklyHeader';
import WeeklyCalendar from '../../components/features/Calendar/WeeklyCalendar';
import RetryErrorBoundary from '../../components/common/RetryErrorBoundary';

export default function MainPage() {
  return (
    <RetryErrorBoundary>
      <RightSection>
        <UserBanner />
        <TodayFoodSection />
        <WeeklyHeader />
        <WeeklyCalendar />
        <br></br>
      </RightSection>
      <LeftSection>
        {' '}
        <ChallengeWidgetSection />
      </LeftSection>
    </RetryErrorBoundary>
  );
}

const RightSection = styled.section`
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 0px 10px;
  gap: 0px;
`;

const LeftSection = styled.section`
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  gap: 40px;
  
  border-radius: 20px;
`;
