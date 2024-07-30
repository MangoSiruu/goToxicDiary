import { QueryClientProvider } from '@tanstack/react-query';
import SignUpPage from './pages/SignUp';
import { queryClient } from './api/instance';

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <SignUpPage />
    </QueryClientProvider>
  );
}

export default App;
