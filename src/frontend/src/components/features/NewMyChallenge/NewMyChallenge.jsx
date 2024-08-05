import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styles from './NewMyChallenge.module.css';
import ButtonGroup from '../../common/Button/ButtonGroup';
import getTodayDate from '../../../utils/getTodayDate';
import getEnddayDate from '../../../utils/getEnddayDate';
import useNewChallengeStore from '../../../actions/useNewChallengeStore';
import durationCalculator from '../../../utils/durationCalcurator';
import useEditChallengeStore from '../../../actions/useEditChallengeStore';
import { CategoryButton } from '../../common/Button/Categories';
import { categories } from '../../../constant/Foods/categories';

// 카테고리 선택 칸
const CategorySelect = ({ category, handleCategoryChange, disabled }) => {
  return (
    <div className={styles.container}>
      <h4 className={styles.title}>카테고리 선택하기</h4>
      <h5>하나만 선택해주세요</h5>
      <div className={styles.categoryOptions}>
        {categories.map((cat) => (
          <CategoryButton
            key={cat}
            category={cat}
            onClick={() => handleCategoryChange(cat.replace(/[\p{Emoji}]/gu, '').trim())}     // 이모티콘 삭제하고 글자만 보여주는 코드
            isSelected={category === cat}
            disabled={disabled}
          />
        ))}
      </div>
    </div>
  );
};

// 이름 작성 칸
const SetName = ({ challengeName, handleChallengeNameChange }) => {
  return (
    <div className={styles.container}>
      <h4 className={styles.title}>챌린지 이름 짓기</h4>
      <div className={styles.inputContainer}>
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
    </div>
  );
};

// 목표 설정 칸
const SetGoal = ({ category, goal, handleGoalChange, disabled }) => {
  return (
    <div className={styles.container}>
      <h4 className={styles.title}>목표 설정하기</h4>
      <div className={styles.goalSetting}>
        <span>하루에</span>
        <div className={styles.setCategoryText} disabled={disabled}>
          {category}
        </div>
        
        <input
          type="number"
          value={goal}
          onChange={handleGoalChange}
          min="0"
          className={styles.input}
          disabled={disabled}
        />
        <span>번 이상 먹기</span>
      </div>
    </div>
  );
};

// 종료날 선택 칸
const SetEndDate = ({ duration, handleDurationChange, startDate, endDate, handleEndDateChange, durations, disabled }) => {
  return (
    <div className={styles.container}>
      <h4 className={styles.title}>종료일 설정하기</h4>
      <div className={styles.categoryOptions}>
        {durations.map((dur) => (
          <CategoryButton
            key={dur}
            category={dur}
            className={duration === dur ? styles.active : styles.button}
            onClick={() => handleDurationChange(dur)}
            disabled={disabled}
          >
            {dur}
          </CategoryButton>
        ))}
      </div>
      <div className={styles.datePicker}>
        <input type="date" value={startDate} readOnly />
        <span> - </span>
        <input 
          type="date" 
          value={endDate} 
          onChange={handleEndDateChange}
          disabled={disabled}
        />
      </div>
    </div>
  );
};

// 수정 모드일 때와 새로쓰는 모드일 때가 구별됨 
// disable로 수정 모드일 때는 title 빼고는 조작 불가
const NewMyChallengeView = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const challenge = location.state?.challenge;
  const [category, setCategory] = useState(challenge?.category || '');
  const [duration, setDuration] = useState('');
  const [goal, setGoal] = useState(challenge?.maxCount || 0);
  const [challengeName, setChallengeName] = useState(challenge?.title || '');
  const [startDate, setStartDate] = useState(challenge?.startDate || getTodayDate());   
  const [endDate, setEndDate] = useState(challenge?.endDate || '');
  const [durations, setDurations] = useState(['1주', '2주', '1달'] || getTodayDate());

  const createChallengeListInfo = useNewChallengeStore((state) => state.createChallengeListInfo);
  const updateChallengeListInfo = useEditChallengeStore((state) => state.updateChallengeListInfo);

  useEffect(() => {
    if (challenge) {
      setDuration(mapDaysToDuration(durationCalculator(challenge.startDate, challenge.endDate)));
    } else {
      const initialEndDate = getEnddayDate(startDate, duration);
      setEndDate(initialEndDate);
    }
  }, [challenge, duration, startDate]);

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

  const handleEndDateChange = (e) => {
    const newEndDate = e.target.value;
    setEndDate(newEndDate);
    const calculatedDuration = durationCalculator(startDate, newEndDate);
    const mappedDuration = mapDaysToDuration(calculatedDuration);
    setDuration(mappedDuration);
  };

  // fetch로 form 제출
  const handleSubmit = async () => {
    const challengeData = {
      category,
      title: challengeName,
      maxCount: goal,       
      startDate,
      endDate,
    };

    // 수정할 경우와 새로만들 경우
    if (challenge) {
      await updateChallengeListInfo(challenge.id, challengeData);
    } else {
      await createChallengeListInfo(challengeData);
    }
    navigate('/mychallengelistview');
  };

  const handleCancel = () => {
    navigate(-1);
  };

  // 수정 모드 확인
  const isEditMode = !!challenge;

  return (
    <div className={styles.wrapper}>
      <h1>{isEditMode ? '챌린지 수정하기' : '새로운 챌린지 만들기'}</h1>
      <div className={styles.card}>
        <CategorySelect 
          category={category} 
          handleCategoryChange={handleCategoryChange} 
          disabled={isEditMode} 
        />
        <SetName 
          challengeName={challengeName} 
          handleChallengeNameChange={handleChallengeNameChange} 
        />
        <SetGoal 
          category={category} 
          goal={goal} 
          handleGoalChange={handleGoalChange} 
          disabled={isEditMode} 
        />
        <SetEndDate 
          duration={duration} 
          handleDurationChange={handleDurationChange} 
          startDate={startDate} 
          endDate={endDate} 
          handleEndDateChange={handleEndDateChange}  
          durations={durations} 
          disabled={isEditMode}
        />
        <ButtonGroup onCancel={handleCancel} onSubmit={handleSubmit} />
      </div>
    </div>
  );
};

export default NewMyChallengeView;
