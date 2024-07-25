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

function App() {
  const response = {
  }

  return (
    <div>
      <CategoryBox type="beer" count="1"/>
      <CategoryBox type="coffee" count="2"/>
      <CategoryBox type="cola" count="3"/>
      <CategoryBox type="instant" count="4"/>
      <CategoryBox type="pepper" count="5"/>
      <CategoryBox type="pizza" count="6"/>
      <CategoryBox type="spoon" count="7"/>
    </div>
    
    
  );
}

export default App;
