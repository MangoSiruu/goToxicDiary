import styled from 'styled-components';
import TodayFoodSection from '../../components/features/Main/TodayFoodSection';
import { ChallengeWidgetSection } from '../../components/features/Main/ChallengeWidgetSection';
import { colors, breakpoints } from '../../styles/variants';
import UserBanner from '../../components/features/Main/UserBanner';
import { WeeklyHeader } from '../../components/features/Calendar/WeeklyHeader';
import WeeklyCalendar from '../../components/features/Calendar/WeeklyCalendar';

export default function MainPage() {
  return (
    <>
      <RightSection>
        <UserBanner />
        <TodayFoodSection />
        <WeeklyHeader />
        <WeeklyCalendar />
      </RightSection>
      <LeftSection>
        {' '}
        <ChallengeWidgetSection />
      </LeftSection>
    </>
  );
}

const RightSection = styled.section`
  width: 100%;
  // max-width: 883px;
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
  background-color: rgba(255, 255, 255, 0.5);
  border-radius: 20px;
  @media (max-width: ${breakpoints.sm}) {
    max-width: none;
    width: 100%;
    margin-top: 20px;
    background-color: ${colors.backgroundColor};
  }
`;
