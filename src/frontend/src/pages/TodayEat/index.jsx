import { CardList } from '../../components/features/TodayFood/CardList';
import { Header } from '../../components/features/TodayFood/Header';
import { useGetTodayEatFoods } from '../../api/hooks/useGetTodayEatFoods';
import Loader from '../../components/common/Loader';
import RetryErrorBoundary from '../../components/common/RetryErrorBoundary';

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
