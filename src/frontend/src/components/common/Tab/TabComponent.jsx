import React from 'react';
import style from './TabComponent.module.css';

const TabComponent = ({ isFinished, onTabChange }) => {
    return (
        <div className={style.tabs}>
            <button 
                className={`${style.tab} ${!isFinished ? style.activeTab : ''}`} 
                onClick={() => onTabChange(false)}
            >
                진행중
            </button>
            <button 
                className={`${style.tab} ${isFinished ? style.activeTab : ''}`} 
                onClick={() => onTabChange(true)}
            >
                완료됨
            </button>
        </div>
    );
};

export default TabComponent;