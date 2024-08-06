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
import CalendarPage from './pages/Calendar';
import Layout from './components/common/layouts/Layout';
import theme from './styles/theme';

function App() {
  return (
    <ChakraProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <Router>
          <Routes>
            <Route path={path.start} element={<StartView />} />
            <Route path={path.signup} element={<SignUpPage />} />
            <Route path={path.login} element={<LoginPage />} />
            <Route
              path={path.main}
              element={
                <Layout>
                  <MainPage />
                </Layout>
              }
            />
            <Route
              path={path.calendar}
              element={
                <Layout>
                  <CalendarPage />
                </Layout>
              }
            />
            <Route
              path={path.todayEat}
              element={
                <Layout>
                  <TodayEatPage />
                </Layout>
              }
            />
            <Route
              path={path.mychallengelist}
              element={
                <Layout>
                  <MyChallengeList />
                </Layout>
              }
            />
            <Route
              path={path.newmychallenge}
              element={
                <Layout>
                  <NewMyChallenge />
                </Layout>
              }
            />
            <Route
              path="/challengedetail/:id"
              element={
                <Layout>
                  <ChallengeDetail />
                </Layout>
              }
            />
          </Routes>
        </Router>
      </QueryClientProvider>
    </ChakraProvider>
  );
}

export default App;
