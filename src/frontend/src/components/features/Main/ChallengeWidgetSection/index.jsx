import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { breakpoints } from '../../../../styles/variants';
import { WidgetBox } from './WidgetBox';
import { UnderlinedButton } from '../../../common/Button/UnderlinedButton';
import { useChallengeList } from '../../../../api/hooks/useChallengeList';
import Loader from '../../../common/Loader';
import { path } from '../../../../routes/path';

export function ChallengeWidgetSection() {
  const nav = useNavigate();
  const { data, isLoading } = useChallengeList({ finished: false, size: 2 });
  const challengeList = data.content;
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const moveToChallengePage = () => {
    nav(path.mychallengelist);
  };

  const renderComponent = () => {
    if (isLoading) return <Loader />;
    if (!challengeList || challengeList.length <= 0) {
      return <span>진행 중인 챌린지가 없어요!</span>;
    }
    // 화면 너비가 xs 이하일 경우 하나의 챌린지 항목만, sm 이하의 경우에는 세개까지.
    let itemsToShow;
    if (windowWidth <= parseInt(breakpoints.xs, 10)) {
      itemsToShow = challengeList.slice(0, 1);
    } else {
      itemsToShow = challengeList;
    }

    return (
      <List>
        {itemsToShow.map((challenge) => (
          <WidgetBox key={challenge.id} challenge={challenge} />
        ))}
      </List>
    );
  };

  return (
    <Wrapper>
      <Header>
        <Title>내 챌린지</Title>
        <UnderlinedButton onClick={moveToChallengePage}>보러가기</UnderlinedButton>
      </Header>
      {renderComponent()}
    </Wrapper>
  );
}

const Wrapper = styled.section`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 20px;
`;

const List = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px 0px;
  width: 100%;
  gap: 30px;
  @media (max-width: ${breakpoints.xs}) {
    flex-direction: row;
    justify-content: center;
    padding: 0;
    gap: 4px;
  }
  @media (max-width: ${breakpoints.sm}) {
    flex-direction: row;
    justify-content: center;
    padding: 10px 0px;
  }
`;

const Header = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const Title = styled.span`
  font-size: 24px;
  font-weight: 700;
  @media screen and (max-width: ${breakpoints.sm}) {
    font-size: 20px;
  }
`;
