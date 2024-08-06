import React, { useEffect, useState, useCallback, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import useChallengeListStore from '../../../actions/useChallengeListStore';
import durationCalculator from '../../../utils/durationCalcurator';
import style from './MyChallengeList.module.css';
import Icon from '../../common/Icons/Icon';
import EditButton from '../../common/Button/ButtonEdit';
import DeleteButton from '../../common/Button/ButtonDelete';
import TabComponent from '../../common/Tab/TabComponent';
import getTodayDate from '../../../utils/getTodayDate';
import { UnderlinedButton } from '../../common/Button/UnderlinedButton';

// 챌린지 리스트 헤더
// h1 h3 스타일 변경해야 하나?
function MyChallengeListViewHeader({ moveToNewMyChallengeView }) {
  return (
    <div className={style.headerContainer}>
      <div className={style.textContainer}>
        <h1>내 챌린지</h1>
        <h3>고자극 식생활 타파 도전 일기!</h3>
      </div>
      <UnderlinedButton onClick={() => moveToNewMyChallengeView(null)}>
        새로 만들기
      </UnderlinedButton>
    </div>
  );
}

// Tab이 완료됨(true)이면 삭제 수정 버튼이 안 보임
function MyChallengeListViewButton({ challenge, handleEdit, handleDelete, finished }) {
  return !finished ? (
    <div className={style.challengeActions} onClick={(e) => e.stopPropagation()}>
      <EditButton onClick={() => handleEdit(challenge)}>수정</EditButton>
      <DeleteButton id={challenge.id} onDelete={() => handleDelete(challenge.id)}>
        삭제
      </DeleteButton>
    </div>
  ) : null;
}

// '종료까지 몇 일' 인지 계산하고 보여줌
// duration이 음수 즉, 종료되었으면 기간을 보여주고, 양수이면 종료까지 몇 일 보여줌
function MyChallengeListViewEndDate({ challenge }) {
  const duration = durationCalculator(getTodayDate(), challenge.endDate);
  return (
    <div className={style.challengeText}>
      <div>{challenge.title}</div>
      <div>{challenge.body}</div>
      <div>
        {duration < 0 ? `${challenge.startDate} ~ ${challenge.endDate}` : `종료까지 ${duration}일`}
      </div>
    </div>
  );
}

// 챌린지 리스트를 보여줌
function MyChallengeListView() {
  const navigate = useNavigate();

  // finished는 종료됨과 진행중을 구분함
  const [finished, setFinished] = useState(false);

  // 챌린지 리스트들을 store에서 가져와서 띄워줌
  const { challengeList, cursor, hasNext, updateChallengeListInfo, deleteChallenge } =
    useChallengeListStore((state) => ({
      challengeList: state.challengeList,
      cursor: state.cursor,
      hasNext: state.hasNext,
      updateChallengeListInfo: state.updateChallengeListInfo,
      deleteChallenge: state.deleteChallenge,
    }));

  useEffect(() => {
    fetchChallengeList();
  }, [finished]);

  const moveToNewMyChallengeView = (challenge) => {
    navigate('/newmychallenge', { state: { challenge } });
  };

  const handleTabChange = (newFinished) => {
    setFinished(newFinished);
  };

  const handleEdit = useCallback(
    (challenge) => {
      moveToNewMyChallengeView(challenge);
    },
    [navigate],
  );

  // finished도 같이 넘김
  const handleCardClick = useCallback(
    (challenge, finished) => {
      navigate(`/challengedetail/${challenge.id}`, { state: { finished } });
    },
    [navigate],
  );

  const handleDelete = useCallback(
    (id) => {
      deleteChallenge(id);
    },
    [deleteChallenge],
  );

  const fetchChallengeList = useCallback(() => {
    updateChallengeListInfo(finished);
  }, [finished, updateChallengeListInfo]);

  // 스크롤로 다음 리스트 최대 10개를 불러오기
  const loadMoreChallenges = useCallback(() => {
    if (hasNext) {
      updateChallengeListInfo(finished, cursor);
    }
  }, [hasNext, cursor, finished, updateChallengeListInfo]);
  const handleScroll = useCallback(
    (e) => {
      const { scrollTop, clientHeight, scrollHeight } = e.target.scrollingElement;
      if (scrollHeight - scrollTop <= clientHeight + 100) {
        loadMoreChallenges();
      }
    },
    [loadMoreChallenges],
  );

  useEffect(() => {
    document.addEventListener('scroll', handleScroll);
    return () => {
      document.removeEventListener('scroll', handleScroll);
    };
  }, [handleScroll]);

  return (
    <div className={style.wrapper}>
      <header>
        <MyChallengeListViewHeader moveToNewMyChallengeView={moveToNewMyChallengeView} />
        <TabComponent finished={finished} onTabChange={handleTabChange} />
      </header>
      <ul className={style.challengeList}>
        {challengeList.map((challenge) => (
          <li
            key={challenge.id}
            className={style.challengeItem}
            onClick={() => handleCardClick(challenge, finished)}
          >
            <div className={style.challengeInfo}>
              <Icon input={challenge.category} />
              <MyChallengeListViewEndDate challenge={challenge} />
              <MyChallengeListViewButton
                challenge={challenge}
                handleEdit={handleEdit}
                handleDelete={handleDelete}
                finished={finished}
              />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default MyChallengeListView;
