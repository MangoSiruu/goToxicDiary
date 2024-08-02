import { QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';
import StartView from './pages/StartView';
import SignUpPage from './pages/SignUp';
import LoginPage from './pages/Login';
import TodayEatPage from './pages/TodayEat';
import { queryClient } from './api/instance';
import { path } from './routes/path';

function App() {
  return (
    <ChakraProvider>
      <QueryClientProvider client={queryClient}>
        <Router>
          <Routes>
            <Route path={path.start} element={<StartView />} />
            <Route path={path.signup} element={<SignUpPage />} />
            <Route path={path.login} element={<LoginPage />} />
            <Route path={path.test} element={<TodayEatPage />} />
            <Route path={path.todayEat} element={<TodayEatPage />} />
          </Routes>
        </Router>
      </QueryClientProvider>
    </ChakraProvider>
  );
}

export default App;
