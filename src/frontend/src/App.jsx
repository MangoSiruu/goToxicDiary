import { TodayEatForm } from './components/features/TodayFood/Form';
import { TodayFoodSection } from './components/features/TodayFood';

function App() {
  return (
    <div style={{ backgroundColor: '#FBF4EE' }}>
      <TodayFoodSection />
      <TodayEatForm />
    </div>
  );
}

export default App;
