import { CardList } from '../../TodayFood/CardList';
import { Header } from '../../TodayFood/Header';
import { useGetTodayEatFoods } from '../../../../api/hooks/useGetTodayEatFoods';
import Loader from '../../../common/Loader';
import RetryErrorBoundary from '../../../common/RetryErrorBoundary';

export default function TodayFoodSection() {
  const { data, isLoading } = useGetTodayEatFoods();

  const getToxicFoods = () => {
    if (!data || !data.dailyRecord) {
      return [];
    }
    return data.dailyRecord.toxicFoods;
  };

  const toxicFoods = getToxicFoods();

  const renderComponent = () => {
    if (isLoading) return <Loader />;
    return <CardList toxicFoods={toxicFoods} />;
  };

  return (
    <div style={{ backgroundColor: '#FBF4EE' }}>
      <Header />
      <RetryErrorBoundary>{renderComponent()}</RetryErrorBoundary>
    </div>
  );
}
