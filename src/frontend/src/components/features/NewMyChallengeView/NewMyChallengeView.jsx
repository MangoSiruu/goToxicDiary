import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styles from './NewMyChallengeView.module.css';
import ButtonGroup from '../../common/Button/ButtonGroup';
import getTodayDate from '../../../utils/getTodayDate';
import getEnddayDate from '../../../utils/getEnddayDate';
import useNewChallengeStore from '../../../actions/useNewChallengeStore';
import Icon from '../../common/Icons/Icon';
import durationCalculator from '../../../utils/durationCalcurator';
import useEditChallengeStore from '../../../actions/useEditChallengeStore';


/* 순서대로 */
const CategorySelect = ({ category, handleCategoryChange, categories }) => {
  const categoryIcons = {
    '술': 'beer',
    '인스턴트': 'instant',
    '매운 음식': 'pepper',
    '카페인': 'coffee',
    '야식': 'pizza',
    '액상과당': 'cola',
    '기타': 'spoon'
  };

  return (
    <div className={styles.container}>
      <h4 className={styles.title}>카테고리 선택하기</h4>
      <h5>하나만 선택해주세요</h5>
      <div className={styles.categoryOptions}>
        {categories.map((cat) => (
          <button
            key={cat}
            className={category === cat ? styles.active : styles.button}
            onClick={() => handleCategoryChange(cat)}
          >
            <Icon input={categoryIcons[cat]} />
            <span>{cat}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

const SetName = ({ challengeName, handleChallengeNameChange }) => {
  return (
    <div className={styles.container}>
      <h4 className={styles.title}>챌린지 이름 짓기</h4>
        <input
          id="challengeName"
          type="text"
          maxLength="10"
          placeholder="10자 이내로 이름을 지어주세요."
          value={challengeName}
          onChange={handleChallengeNameChange}
          className={styles.input}
        />
    </div>
  );
};

const SetGoal = ({ category, goal, handleGoalChange }) => {
  return (
    <div className={styles.container}>
      <h4 className={styles.title}>목표 설정하기</h4>
      <div className={styles.goalSetting}>
        <span>하루에</span>
        <div className={styles.setCategoryText}>{category}</div>
        <input
          type="number"
          value={goal}
          onChange={handleGoalChange}
          min="0"
          className={styles.input}
        />
        <span>번 이상 먹기</span>
      </div>
    </div>
  );
};

const SetEndDate = ({ duration, handleDurationChange, startDate, endDate, durations }) => {
  return (
    <div className={styles.formGroup}>
      <h4 className={styles.title}>종료일 설정하기</h4>
      <div className={styles.durationOptions}>
        {durations.map((dur) => (
          <button
            key={dur}
            className={duration === dur ? styles.active : styles.button}
            onClick={() => handleDurationChange(dur)}
          >
            {dur}
          </button>
        ))}
      </div>
      <div className={styles.datePicker}>
        <input type="date" value={startDate} readOnly />
        <span> - </span>
        <input type="date" value={endDate} readOnly />
      </div>
    </div>
  );
};

const NewMyChallengeView = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const challenge = location.state?.challenge;
  const [category, setCategory] = useState(challenge?.toxicCategory || '');
  const [duration, setDuration] = useState('');
  const [goal, setGoal] = useState(challenge?.goal || 0);
  const [challengeName, setChallengeName] = useState(challenge?.title || '');
  const [startDate, setStartDate] = useState(challenge?.startDate || getTodayDate());
  const [endDate, setEndDate] = useState(challenge?.endDate || '');
  const categories = ['술', '인스턴트', '매운 음식', '카페인', '야식', '액상과당', '기타'];
  const durations = ['1주', '2주', '1달'];

  const createChallengeListInfo = useNewChallengeStore((state) => state.createChallengeListInfo);
  const updateChallengeListInfo = useEditChallengeStore((state) => state.updateChallengeListInfo);


  useEffect(() => {
    if (challenge) {
      setDuration(mapDaysToDuration(durationCalculator(challenge.startDate, challenge.endDate)));
    } else {
      const initialEndDate = getEnddayDate(startDate, duration);
      setEndDate(initialEndDate);
    }
  }, [challenge, duration]);

  const mapDaysToDuration = (days) => {
    if (days === 7) return '1주';
    if (days === 14) return '2주';
    if (days >= 28 && days <= 31) return '1달';
    return '';
  };

  const handleCategoryChange = (cat) => {
    setCategory(cat);
  };

  const handleGoalChange = (e) => {
    setGoal(e.target.value);
  };

  const handleChallengeNameChange = (e) => {
    setChallengeName(e.target.value);
  };

  const handleDurationChange = (dur) => {
    setDuration(dur);
    const newEndDate = getEnddayDate(startDate, dur);
    setEndDate(newEndDate);
  };

  const handleSubmit = async () => {
    const challengeData = {
      toxicCategory: category,
      title: challengeName,
      goal,
      startDate,
      endDate,
    };
    if (challenge) {
      // Editing existing challenge
      await updateChallengeListInfo(challenge.id, challengeData);
    } else {
      // Creating new challenge
      await createChallengeListInfo(challengeData);
    }
    navigate('/mychallengelistview');
  };

  

  const handleCancel = () => {
    navigate(-1);
  };

  return (
    <div className={styles.wrapper}>
      <h1>새로운 챌린지 만들기</h1>
      <div className={styles.card}>
        <CategorySelect category={category} handleCategoryChange={handleCategoryChange} categories={categories} />
        <SetName challengeName={challengeName} handleChallengeNameChange={handleChallengeNameChange} />
        <SetGoal category={category} goal={goal} handleGoalChange={handleGoalChange} />
        <SetEndDate duration={duration} handleDurationChange={handleDurationChange} startDate={startDate} endDate={endDate} durations={durations} />
        <ButtonGroup onCancel={handleCancel} onSubmit={handleSubmit} />
      </div>
    </div>
  );
};

export default NewMyChallengeView;
