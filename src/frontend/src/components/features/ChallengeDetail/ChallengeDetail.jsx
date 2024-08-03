import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import style from './ChallengeDetailView.module.css';
import useChallengeDetailStore from '../../../actions/useChallengeDetailStore';
import getTodayDate from '../../../utils/getTodayDate';
import Icon from '../../common/Icons/Icon';

// 디테일 헤더
// h1 h3 변경해야 할까?
const DetailHeader = ({ title, startDate, endDate, category, maxCount, successfulCount }) => {
    return (
        <div className={style.header}>
            <h1 className={style.title}><Icon input={category}/>  {title} 챌린지 참여 중</h1>
            <h3 className={style.category}>{startDate} ~ {endDate} 까지 하루에 {category} {maxCount} 이하 먹기</h3>
            <h3 className={style.category}>누적 성공 횟수 {successfulCount}회</h3>
        </div>
    );
};

// 디테일 리스트 컨테이너
// map(date, index) -> 맵을 date에 index를 붙여서 순차적으로 나열
// 성공 실패 버튼 모달로 변경하기
const DetailListContainer = ({ dateRange, successes }) => (
    <div className={style.dayList}>
        {dateRange.map((date, index) => {
            const dateString = date.toISOString().split('T')[0];
            const success = successes.find((s) => s.date === dateString);
            const isSuccess = success && success.success;

            return (
                <div className={style.dayItem} key={index}>
                    <span className={style.emoji}>
                        <Icon input={isSuccess ? '성공망고' : '실패망고'} />
                    </span>
                    <span className={style.date}>
                        {date.toLocaleDateString('ko-KR', { month: 'long', day: 'numeric' })}
                    </span>
                    <span className={`${style.status} ${isSuccess ? style.success : style.fail}`}>
                        {isSuccess ? '성공' : '실패'}
                    </span>
                </div>
            );
        })}
    </div>
);

// 현재까지의 성공 실패 List 가져오기 
// endDate이 30일인데, 오늘 27일 까지의 성공 실패여부 List 가져오기
const getDateRange = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const dateArray = [];

    while (start <= end) {
        dateArray.push(new Date(start));
        start.setDate(start.getDate() + 1);
    }
    return dateArray;
};

// 챌린지 디테일 뷰
// 이거 배치에 따라서 오류가 나는데 나중에 리팩토링 한 번 해야 됨 -> 쥰내 신기함 하나라도 배치 다르게 하면 에러뜸
const ChallengeDetailView = () => {
    const { id } = useParams();
    const { updateChallengeDateInfo, challenge } = useChallengeDetailStore(state => ({
        updateChallengeDateInfo: state.updateChallengeDateInfo,
        challenge: state.challenge
    }));

    useEffect(() => {
        updateChallengeDateInfo(id);
    }, [id, updateChallengeDateInfo]);

    if (!challenge) {
        return <div>Loading...</div>;
    }

    const { title, category, maxCount, endDate, successes, startDate } = challenge;
    
    // 현재날까지의 최신순이 맨위에 위치할 수 있도록 함 -> reverse
    const dateRange = getDateRange(startDate, getTodayDate()).reverse(); 

    // 성공 횟수 카운트
    const successfulCount = successes.filter(success => success.success).length;

    return (
        <div className={style.wrapper}>
            <DetailHeader title={title} startDate={startDate} endDate={endDate} category={category} maxCount={maxCount} successfulCount={successfulCount} />
            <DetailListContainer dateRange={dateRange} successes={successes} />
        </div>
    );
};

export default ChallengeDetailView;
