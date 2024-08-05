import React, { useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import style from './ChallengeDetail.module.css';
import useChallengeDetailStore from '../../../actions/useChallengeDetailStore';
import getTodayDate from '../../../utils/getTodayDate';
import Icon from '../../common/Icons/Icon';

// 디테일 헤더
const DetailHeader = ({ title, startDate, endDate, category, maxCount, successfulCount, finished }) => {
    return (
        <div className={style.header}>
            <h1 className={style.title}>
                <Icon input={category}/>  
                {title} 챌린지 {finished ? '끝' : '참여 중'}
            </h1>
            <h3 className={style.category}>{startDate} ~ {endDate} 까지 하루에 {category} {maxCount} 이하 먹기</h3>
            <h3 className={style.category}>누적 성공 횟수 {successfulCount}회</h3>
        </div>
    );
};

// 디테일 리스트 컨테이너
const DetailListContainer = ({ dateRange }) => (
    <div className={style.dayList}>
        {dateRange.map((item, index) => {
            const { date, success } = item;
            const isSuccess = success;

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

// 날짜 범위와 성공 여부를 포함한 배열 생성 (오늘까지)
const getDateRangeWithSuccess = (startDateStr, endDateStr, successes) => {
    const startDate = new Date(startDateStr);
    const endDate = new Date(endDateStr);
    const today = new Date(); // 오늘 날짜
    const dateArray = []; 

    // 오늘 날짜까지의 날짜 배열 생성
    while (startDate <= endDate && startDate <= today) {
        const dateStr = startDate.toISOString().split('T')[0];
        const successEntry = successes.find(entry => entry.date === dateStr);
        const isSuccess = successEntry ? successEntry.success : false;
        
        dateArray.push({
            date: new Date(startDate),
            success: isSuccess
        });

        startDate.setDate(startDate.getDate() + 1);
    }
    
    return dateArray;
};

// 챌린지 디테일 뷰
const ChallengeDetailView = () => {
    const { id } = useParams();
    const location = useLocation();
    const { finished } = location.state || { finished: false }; 

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
    
    // 오늘까지의 성공 여부를 포함한 배열을 생성
    const dateRange = getDateRangeWithSuccess(startDate, endDate, successes).reverse(); 

    // 성공 횟수 카운트
    const successfulCount = dateRange.filter(item => item.success).length;

    return (
        <div className={style.wrapper}>
            <DetailHeader 
                finished={finished} 
                title={title} 
                startDate={startDate} 
                endDate={endDate} 
                category={category} 
                maxCount={maxCount} 
                successfulCount={successfulCount} 
            />
            <DetailListContainer dateRange={dateRange} />
        </div>
    );
};

export default ChallengeDetailView;
