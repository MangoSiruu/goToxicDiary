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
import styled from '@emotion/styled';


const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  background-color: #FBF4EE;
  align-items: center;
  justify-content: center;
`

const FormContainer = styled.div`
  margin-right: auto;
  width: 100%;
  padding: 25px;
`


const InputValue = styled.input`
  box-sizing: border-box;

  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 5px 4px;
  gap: 10px;

  width: 100%; /* 부모 요소의 너비에 맞춤 */
  height: 33px;

  border: none; /* 기본 테두리 제거 */
  border-bottom: 1px solid #BDBDBD; /* 하단 테두리 추가 */

  background-color: transparent; /* 배경색 투명 */
  font-size: 14px; /* 텍스트 크기 */
  outline: none; /* 포커스 시 아웃라인 제거 */
`;


const StyledDateInput = styled.input`
  box-sizing: border-box;
  padding: 5px;
  border: none;
  border-bottom: 1px solid #BDBDBD;
  background-color: transparent;
  font-size: 18px;
  &:disabled {
    background-color: #f0f0f0;
  }
`;

const Title = styled.div`
  font-size: 24px;
  margin-bottom: 10px;
  font-weight: bold;
`

const SubTitle = styled.div`
  font-size: 18px;
  margin-bottom: 20px;
`

const CategoryOptions = styled.div`
  display: flex;
  gap: 10px;
  flex-wrap: wrap; 
`;



// 카테고리 선택 칸
const CategorySelect = ({ category, handleCategoryChange, disabled }) => {
  return (
    <FormContainer>
      <Title>카테고리 선택하기</Title>
      <SubTitle>하나만 선택해주세요</SubTitle>
      <CategoryOptions>
        {categories.map((cat) => (
          <CategoryButton
            key={cat}
            category={cat}
            onClick={() => handleCategoryChange(cat.replace(/[\p{Emoji}]/gu, '').trim())}     // 이모티콘 삭제하고 글자만 보여주는 코드
            isSelected={category === cat}
            disabled={disabled}
          />
        ))}
      </CategoryOptions>
    </FormContainer>
  );
};

// 이름 작성 칸
const SetName = ({ challengeName, handleChallengeNameChange }) => {
  return (
    <FormContainer>
      <Title>챌린지 이름 짓기</Title>
      <InputValue
          id="challengeName"
          type="text"
          maxLength="10"
          placeholder="10자 이내로 이름을 지어주세요."
          value={challengeName}
          onChange={handleChallengeNameChange}
        />  
    </FormContainer>
  );
};

// 목표 설정 칸
const SetGoal = ({ category, goal, handleGoalChange, disabled }) => {
  return (
    <FormContainer>
      <Title>목표 설정하기</Title>
      
      <div className={styles.goalSetting}>
        <span>하루에</span>
        <div className={styles.setCategoryText} disabled={disabled}>
          {category}
        </div>
        
        <InputValue
          type="number"
          value={goal}
          onChange={handleGoalChange}
          min="0"
          className={styles.input}
          disabled={disabled}
        />
        <span>번 이하 먹기</span>
      </div>

    </FormContainer>
    );
};

// 종료날 선택 칸
const SetEndDate = ({ duration, handleDurationChange, startDate, endDate, handleEndDateChange, durations, disabled }) => {
  return (
    <FormContainer>
      <Title>종료일 설정하기</Title>
      <CategoryOptions>
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
      </CategoryOptions>

      <div className={styles['date-container']}>
        <StyledDateInput
          type="date"
          value={startDate}
          readOnly
          disabled={disabled}
        />
        <span> - </span>
        <StyledDateInput
          type="date"
          value={endDate}
          onChange={handleEndDateChange}
          disabled={disabled}
        />
      </div>
    </FormContainer>
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
    navigate('/mychallengelist');
  };

  const handleCancel = () => {
    navigate(-1);
  };

  // 수정 모드 확인
  const isEditMode = !!challenge;

  return (
    <Wrapper>
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
    </Wrapper>
  );
};

export default NewMyChallengeView;
