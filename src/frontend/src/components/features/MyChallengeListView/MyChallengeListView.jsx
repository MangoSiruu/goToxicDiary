import React, { useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import useChallengeListStore from '../../../actions/useChallengeListStore';
import durationCalculator from '../../../utils/durationCalcurator';
import style from './MyChallengeListView.module.css';
import Icon from '../../common/Icons/Icon';
import EditButton from '../../common/Button/ButtonEdit';
import DeleteButton from '../../common/Button/ButtonDelete';
import TabComponent from '../../common/Tab/TabComponent';
import getTodayDate from '../../../utils/getTodayDate';
import { UnderlinedButton } from '../../common/Button/UnderlinedButton';

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

function MyChallengeListViewButton({ challenge, handleEdit, handleDelete }) {
  return (
    <div className={style.challengeActions} onClick={(e) => e.stopPropagation()}>
      <EditButton onClick={() => handleEdit(challenge)}>수정</EditButton>
      <DeleteButton id={challenge.id} onDelete={() => handleDelete(challenge.id)}>
        삭제
      </DeleteButton>
    </div>
  );
}

function MyChallengeListViewEndDate({ challenge }) {
  const duration = durationCalculator(getTodayDate(), challenge.endDate);
  return (
    <div className={style.challengeText}>
      <div>{challenge.title}</div>
      <div>{challenge.body}</div>
      <div>종료까지 {duration}일</div>
    </div>
  );
}

function MyChallengeListView() {
  const navigate = useNavigate();
  const [finished, setFinished] = useState(false);
  const { challengeList, updateChallengeListInfo, deleteChallenge } = useChallengeListStore(
    (state) => ({
      challengeList: state.challengeList,
      updateChallengeListInfo: state.updateChallengeListInfo,
      deleteChallenge: state.deleteChallenge,
    }),
  );

  useEffect(() => {
    // Fetch the challenge list when the component mounts or the `finished` state changes
    fetchChallengeList();
  }, [finished]);

  const moveToNewMyChallengeView = (challenge) => {
    navigate('/newmychallengeview', { state: { challenge } });
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

  const handleCardClick = useCallback(
    (challenge) => {
      navigate(`/challengedetailview/${challenge.id}`);
    },
    [navigate],
  );

  const handleDelete = useCallback(
    (id) => {
      deleteChallenge(id); // Make sure this function exists in your store
    },
    [deleteChallenge],
  );

  const fetchChallengeList = useCallback(() => {
    // Example fetch function - replace with actual logic
    updateChallengeListInfo(finished);
  }, [finished, updateChallengeListInfo]);

  return (
    <div className={style.wrapper}>
      <header>
        <MyChallengeListViewHeader moveToNewMyChallengeView={moveToNewMyChallengeView} />
        <TabComponent isFinished={finished} onTabChange={handleTabChange} />
      </header>
      <ul className={style.challengeList}>
        {challengeList.map((challenge) => (
          <li
            key={challenge.id}
            className={style.challengeItem}
            onClick={() => handleCardClick(challenge)}
          >
            <div className={style.challengeInfo}>
              <Icon input={challenge.category} />
              <MyChallengeListViewEndDate challenge={challenge} />
              <MyChallengeListViewButton
                challenge={challenge}
                handleEdit={handleEdit}
                handleDelete={handleDelete}
              />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default MyChallengeListView;
