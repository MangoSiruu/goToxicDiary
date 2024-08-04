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
const MyChallengeListViewHeader = ({ moveToNewMyChallengeView }) => (
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

// Tab이 완료됨(true)이면 삭제 수정 버튼이 안 보임
const MyChallengeListViewButton = ({ challenge, handleEdit, handleDelete, finished }) => (
    !finished ? (
        <div className={style.challengeActions} onClick={(e) => e.stopPropagation()}>
            <EditButton onClick={() => handleEdit(challenge)}>
                수정
            </EditButton>
            <DeleteButton id={challenge.id} onDelete={() => handleDelete(challenge.id)}>
                삭제
            </DeleteButton>
        </div>
    ) : null
);

// '종료까지 몇 일' 인지 계산하고 보여줌
const MyChallengeListViewEndDate = ({ challenge }) => {
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
};

// 챌린지 리스트를 보여줌
const MyChallengeListView = () => {
    const navigate = useNavigate();
    const listRef = useRef(null); // useRef를 사용하여 ul 요소 참조
    const [finished, setFinished] = useState(false);
    const [loading, setLoading] = useState(false);

    const { challengeList, cursor, hasNext, updateChallengeListInfo, deleteChallenge } = useChallengeListStore((state) => ({
        challengeList: state.challengeList,
        cursor: state.cursor,
        hasNext: state.hasNext,
        updateChallengeListInfo: state.updateChallengeListInfo,
        deleteChallenge: state.deleteChallenge,
    }));

    const loadMoreChallenges = useCallback(() => {
        if (hasNext) {
            setLoading(true);
            updateChallengeListInfo(finished, cursor).finally(() => setLoading(false));
        }
    }, [hasNext, cursor, finished, updateChallengeListInfo]);

    const handleScroll = useCallback(() => {
        if (listRef.current) {
            const { scrollTop, clientHeight, scrollHeight } = listRef.current;
            // 바닥에 정확히 닿았을 때
            if (scrollHeight - scrollTop === clientHeight && !loading) {
                loadMoreChallenges();
            }
        }
    }, [loading, loadMoreChallenges]);
    

    useEffect(() => {
        const container = listRef.current;
        container.addEventListener('scroll', handleScroll);
        return () => {
            container.removeEventListener('scroll', handleScroll);
        };
    }, [handleScroll]);

    useEffect(() => {
        fetchChallengeList();
    }, [finished]);

    const fetchChallengeList = useCallback(() => {
        setLoading(true);
        updateChallengeListInfo(finished).finally(() => setLoading(false));
    }, [finished, updateChallengeListInfo]);

    const moveToNewMyChallengeView = (challenge) => {
        navigate("/newmychallenge", { state: { challenge } });
    };

    const handleTabChange = (newFinished) => {
        setFinished(newFinished);
    };

    const handleEdit = useCallback((challenge) => {
        moveToNewMyChallengeView(challenge);
    }, [navigate]);

    const handleCardClick = useCallback((challenge) => {
        navigate(`/challengedetail/${challenge.id}`);
    }, [navigate]);

    const handleDelete = useCallback((id) => {
        deleteChallenge(id);
    }, [deleteChallenge]);

    return (
        <div className={style.wrapper}>
            <header>
                <MyChallengeListViewHeader moveToNewMyChallengeView={moveToNewMyChallengeView} />
                <TabComponent finished={finished} onTabChange={handleTabChange} />
            </header>
            <ul className={style.challengeList} ref={listRef}>
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
                          finished={finished}
                        />
                      </div>
                    </li>
                ))}
            </ul>
            {loading && <div className={style.loading}>로딩 중...</div>}
        </div>
    );
}

export default MyChallengeListView;
