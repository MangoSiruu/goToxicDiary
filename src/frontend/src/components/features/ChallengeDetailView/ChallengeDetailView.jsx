import React, { useEffect } from 'react'; // Import useEffect
import { useLocation, useParams } from 'react-router-dom';  // Import useParams
import style from './ChallengeDetailView.module.css';
import useChallengeDetailStore from '../../../actions/useChallengeDetailStore';


const DetailHeader = ({ title, startDate, endDate, toxicCategory, count }) => {
    return (
        <div className={style.header}>
            <h1 className={style.title}>{title} 챌린지 참여 중</h1>
            <h3 className={style.category}>{startDate} ~ {endDate} 까지 하루에 {toxicCategory} {count} 이하 먹기</h3>
            <h3 className={style.category}>누적 성공 횟수 {count}회</h3>
        </div>
    );
};



// Function to generate date range
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




const ChallengeDetailView = () => {
    const { id } = useParams(); // Get the id from the URL parameters
    const { updateChallengeDateInfo, challenge } = useChallengeDetailStore(state => ({
        updateChallengeDateInfo: state.updateChallengeDateInfo,
        challenge: state.challenge
    }));

    useEffect(() => {
        if (typeof updateChallengeDateInfo === 'function') {
            updateChallengeDateInfo(id);
        } else {
            console.error('updateChallengeDateInfo is not a function');
        }
    }, [id, updateChallengeDateInfo]);

    if (!challenge) {
        return <div>Loading...</div>;  // Show loading indicator if challenge is not yet loaded
    }

    const { title, toxicCategory, maxCount, endDate, successes } = challenge;
    const startDate = successes.length > 0 ? successes[0].date : endDate;
    const dateRange = getDateRange(startDate, endDate);

    return (
        <div className={style.wrapper}>
            <DetailHeader title={title} startDate={startDate} endDate={endDate} toxicCategory={toxicCategory} count={maxCount} />
            <div className={style.details}>
                <div className={style.dayList}>
                    {dateRange.map((date, index) => {
                        const success = successes.find((s) => s.date === date.toISOString().split('T')[0]);
                        return (
                            <div className={style.dayItem} key={index}>
                                <span className={style.emoji}>{success && success.success ? '😖' : '🥺'}</span>
                                <span className={style.date}>{date.toLocaleDateString('ko-KR', { month: 'long', day: 'numeric' })}</span>
                                <span className={`${style.status} ${success && success.success ? style.success : style.fail}`}>
                                    {success && success.success ? '성공' : '실패'}
                                </span>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default ChallengeDetailView;
