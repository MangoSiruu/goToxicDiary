import React, { useEffect, useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import style from './ChallengeDetail.module.css';
import useChallengeDetailStore from '../../../actions/useChallengeDetailStore';
import Icon from '../../common/Icons/Icon';

// 디테일 헤더
const DetailHeader = ({ title, startDate, endDate, category, maxCount, successfulCount, finished }) => {
    return (
        <div className={style.header}>
            <h1 className={style.title}>
                <Icon input={category} />
                {title} 챌린지 {finished ? '끝' : '참여 중'}
            </h1>
            <h3 className={style.category}>{startDate} ~ {endDate} 까지 하루에 {category} {maxCount} 이하 먹기</h3>
            <h3 className={style.category}>누적 성공 횟수 {successfulCount}회</h3>
        </div>
    );
};

// 디테일 리스트 컨테이너
const DetailListContainer = ({ dateRange }) => {
    if (dateRange.length === 0) {
        return <div className={style.noSuccess}>아직 성공 실패가 없습니다</div>;
    }

    return (
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
};

// 성공 여부를 포함한 날짜 배열 생성
const getDateRangeWithSuccess = (successes) => {
    const today = new Date(); // 오늘 날짜
    const dateArray = [];

    // 성공 여부 배열에서 날짜와 성공 여부를 포함한 객체 생성
    successes.forEach(entry => {
        const date = new Date(entry.date);
        
        // 오늘 날짜가 성공 데이터에 포함되지 않으면 추가 (오늘을 성공 여부로 간주함)
        if (date <= today) {
            dateArray.push({
                date: date,
                success: entry.success
            });
        }
    });

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
    
    // 성공 여부 배열을 가져와서 최신순으로 정렬
    const dateRange = getDateRangeWithSuccess(successes).reverse(); 

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
