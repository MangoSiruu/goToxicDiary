import { CardList } from './CardList';
import { CALENDAR_RESPONSE_DATA } from '../../../../api/mocks/calendar.mock';

export const TodayFoodSection = () => {
  const toxicFoods = CALENDAR_RESPONSE_DATA.dailyRecord.toxicFoods;
  return (
    <Wrapper>
      <CardList toxicFoods={toxicFoods}></CardList>
    </Wrapper>
  );
};
