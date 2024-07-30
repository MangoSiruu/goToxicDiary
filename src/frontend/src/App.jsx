import { QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import StartView from './pages/StartView';
import SignUpPage from './pages/SignUp';
import LoginPage from './pages/Login';
import { queryClient } from './api/instance';

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Routes>
          <Route path="/" element={<StartView />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/login" element={<LoginPage />} />
        </Routes>
      </Router>
    </QueryClientProvider>
  );
}

export default App;
