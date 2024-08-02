import { CardList } from '../../components/features/TodayFood/CardList';
import { Header } from '../../components/features/TodayFood/Header';
import { useGetTodayEatFoods } from '../../api/hooks/useGetTodayEatFoods';
import Loader from '../../components/common/Loader';
import RetryErrorBoundary from '../../components/common/RetryErrorBoundary';

export default function TodayFoodSection() {
  const { data, isLoading } = useGetTodayEatFoods();

  const renderComponent = () => {
    if (isLoading) return <Loader />;
    return <CardList toxicFoods={data} />;
  };

  return (
    <div style={{ backgroundColor: '#FBF4EE' }}>
      <Header />
      <RetryErrorBoundary>{renderComponent()}</RetryErrorBoundary>
    </div>
  );
}
