import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';
import { QueryClientProvider } from '@tanstack/react-query';
import ChallengeDetail from './components/features/ChallengeDetail/ChallengeDetail';
import MyChallengeList from './components/features/MyChallengeList/MyChallengeList';
import NewMyChallenge from './components/features/NewMyChallenge/NewMyChallenge';
import StartView from './pages/StartView';
import SignUpPage from './pages/SignUp';
import LoginPage from './pages/Login';
import TodayEatPage from './pages/TodayEat';
import MainPage from './pages/Main';
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
            <Route path={path.main} element={<MainPage />} />
            <Route path={path.todayEat} element={<TodayEatPage />} />
            <Route path={path.mychallengelist} element={<MyChallengeList />} />
            <Route path={path.newmychallenge} element={<NewMyChallenge />} />
            <Route path="/challengedetail/:id" element={<ChallengeDetail />} />
          </Routes>
        </Router>
      </QueryClientProvider>
    </ChakraProvider>
  );
}

export default App;