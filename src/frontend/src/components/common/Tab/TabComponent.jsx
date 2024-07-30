import React from 'react';
import style from './TabComponent.module.css';

// 탭 컴포넌트로 진행중과 완료됨을 true false로 변경함
const TabComponent = ({ finished, onTabChange }) => {
    return (
        <div className={style.tabs}>
            <button 
                className={`${style.tab} ${!finished ? style.activeTab : ''}`} 
                onClick={() => onTabChange(false)}
            >
                진행중
            </button>
            <button 
                className={`${style.tab} ${finished ? style.activeTab : ''}`} 
                onClick={() => onTabChange(true)}
            >
                완료됨
            </button>
        </div>
    );
};

export default TabComponent;