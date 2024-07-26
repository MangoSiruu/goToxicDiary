import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useChallengeListStore from '../../../actions/useChallengeListStore';
import durationCalculator from '../../../utils/durationCalcurator';

import style from './MyChallengeListView.module.css'; 
import Icon from '../../common/Icons/Icon';
import EditButton from '../../common/Button/ButtonEdit';
import DeleteButton from '../../common/Button/ButtonDelete';
import ButtonNewChallenge from '../../common/Button/ButtonNewChallenge';

import TabComponent from '../../common/Tab/TabComponent'; 
import getTodayDate from '../../../utils/getTodayDate';


const MyChallengeListViewHeader = ({ moveToNewMyChallengeView }) => {
    return (
        <div className={style.headerContainer}>
            <div className={style.textContainer}>
                <h1>내 챌린지</h1>
                <h3>고자극 식생활 타파 도전 일기!</h3>
            </div>
            <ButtonNewChallenge className={style.button} onClick={() => moveToNewMyChallengeView(null)} />
        </div>
    );
};

const MyChallengeListViewButton = ({ challenge, handleEdit, handleDelete }) => {
    return (
        <div className={style.challengeActions} onClick={(e) => e.stopPropagation()}>
            <EditButton onClick={() => handleEdit(challenge)}>수정</EditButton>
            <DeleteButton id={challenge.id} onClick={handleDelete}>삭제</DeleteButton>
        </div>
    );
};

const MyChallengeListViewEndDate = ({ challenge }) => {

    /* getTodayDate ~ getEndDate 로 할 것 */
    // const duration = durationCalculator(getTodayDate(), '2024-07-30');
    const duration = durationCalculator(getTodayDate(), challenge.endDate);
    return (
        <div className={style.challengeText}>
            <div>{challenge.title}</div>
            <div>{challenge.body}</div>
            <div>종료까지 {duration}일</div>
        </div>
    );
};

const MyChallengeListView = () => {
    const navigate = useNavigate();
    const moveToNewMyChallengeView = (challenge) => {
        navigate("/newmychallengeview", { state: { challenge } });
    };

    const [isFinished, setIsFinished] = useState(false);
    
    
    
    
    // 여기서 두 번 호출해버림 나중에 한 번으로 고치기
    const { challengeList, updateChallengeListInfo } = useChallengeListStore((state) => ({
        challengeList: state.challengeList,
        updateChallengeListInfo: state.updateChallengeListInfo,
    }));
    const handleDelete = (id) => {
        const updatedList = challengeList.filter(challenge => challenge.id !== id);
        useChallengeListStore.setState({ challengeList: updatedList });
    };



    useEffect(() => {
        updateChallengeListInfo();
    }, [updateChallengeListInfo]);

    const handleTabChange = (finished) => { setIsFinished(finished);};
    const handleEdit = (challenge) => {moveToNewMyChallengeView(challenge);};
    
    const handleCardClick = (challenge) => { navigate(`/challengedetailview/${challenge.id}`); };

    return (
        <div className={style.wrapper}>
            <header>
                <div>
                    <MyChallengeListViewHeader moveToNewMyChallengeView={moveToNewMyChallengeView} />
                    <TabComponent isFinished={isFinished} onTabChange={handleTabChange} />
                    <ul className={style.challengeList}>
                        {challengeList.map((challenge) => {
                            return (
                                <li 
                                    key={challenge.id}                                    
                                    className={style.challengeItem} 
                                    onClick={() => handleCardClick(challenge)}
                                >
                                    <div className={style.challengeInfo}>
                                        <Icon input={challenge.toxicCategory} />  
                                        <MyChallengeListViewEndDate challenge={challenge} />
                                        <MyChallengeListViewButton challenge={challenge} handleEdit={handleEdit} handleDelete={handleDelete} />
                                    </div>
                                 </li>
                            );
                        })}
                    </ul>
                </div>
            </header>
        </div>
    );
}

export default MyChallengeListView;
