import { CardList } from '../../components/features/TodayFood/CardList';
import { Header } from '../../components/features/TodayFood/Header';
import { CALENDAR_RESPONSE_DATA } from '../../api/mocks/calendar.mock';

export default function TodayFoodSection() {
  const { toxicFoods } = CALENDAR_RESPONSE_DATA.dailyRecord;

  return (
    <div style={{ backgroundColor: '#FBF4EE' }}>
      <Header />
      <CardList toxicFoods={toxicFoods} />
    </div>
  );
}
