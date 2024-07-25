import { CardList } from './CardList';
import { Header } from './Header';
import { CALENDAR_RESPONSE_DATA } from '../../../api/mocks/calendar.mock';

export function TodayFoodSection() {
  const { toxicFoods } = CALENDAR_RESPONSE_DATA.dailyRecord;
  return (
    <div style={{ backgroundColor: '#FBF4EE' }}>
      <Header />
      <CardList toxicFoods={toxicFoods} />
    </div>
  );
}
