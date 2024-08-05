// 무엇을 해야할지 정리 해보기
// 카테고리 만들기
    // 음주, 인스턴트, 매운 음식, 카페인, 야식, 액상과당, 기타
// 캘린더 만들기
    // 달력 만들기
    // 날짜별 기록 현황 가져와서 보여주기
    // 달 바뀌게 하기
// 주차별 캘린더 만들기
    // 위에꺼 제대로 만들면 쉬울 것 같음
// 월별 리포트
    // 몇 일 먹었는지 나오는 카드 컴포넌트 만들기
    // 정보 가져와서 띄우기
// 캡쳐 기능
    // 이미 있는 컴포넌트 가져와서 배치만 하면 될 듯
// 동작하게 하기
// css

// 컴포넌트 분리
    // 카테고리 7개
    // 캘린더 헤더
    // 캘린더 바디
    // 카드 컴포넌트 7개

import React from "react";
import CategoryBox from "./components/common/Categories/index"
import WeeklyCalendar from "./components/features/Calendar/WeeklyCalendar";
import MonthlyCalendar from "./components/features/Calendar/MonthlyCalendar";
import { add, format, sub } from "date-fns";
import { QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import StartView from './pages/StartView';
import SignUpPage from './pages/SignUp';
import LoginPage from './pages/Login';
import { queryClient } from './api/instance';
import { path } from './routes/path';

function App() {
  const response = {
  }

  const date = new Date();
  const week = sub(new Date(), {days: new Date().getDay()});
  const month = sub(new Date(), {days: new Date().getDate()-1});

  const addOneWeek = add(week, {weeks: 1});
  const subOneWeek = sub(week, {weeks: 1});
  const addOneMonth = add(month, {months: 1});
  const subOneMonth = format(sub(month, {months: 1}), "yyyy-MM-dd");

  return (
    <QueryClientProvider client={queryClient}>
      {/* <CategoryBox type="beer" count="1"/> */}      

      {/* <WeeklyCalendar></WeeklyCalendar> */}
      
      {/* <p>오늘 {format(date, 'yyyy-MM-dd')}</p>
      <p>일요일 {format(week, 'yyyy-MM-dd')}</p>
      <p>1일 {format(month, 'yyyy-MM-dd')}</p>
      <br></br>
      <p>{format(addOneWeek, 'yyyy-MM-dd')}</p>
      <p>{format(subOneWeek, 'yyyy-MM-dd')}</p>
      <br></br>
      <p>{format(addOneMonth, 'yyyy-MM-dd')}</p>
      <p>{format(subOneMonth, 'yyyy-MM-dd')}</p>
      <br></br>
      <p>{format(date, 'yyyy-MM-dd')}</p>
      <p>{format(sub(date, {months: 1}), 'yyyy-MM-dd')}</p> */}
      
      <MonthlyCalendar></MonthlyCalendar>
      <br></br>
      <Router>
        <Routes>
          <Route path={path.start} element={<StartView />} />
          <Route path={path.signup} element={<SignUpPage />} />
          <Route path={path.login} element={<LoginPage />} />
        </Routes>
      </Router>
    </QueryClientProvider>
  );
}

export default App;
