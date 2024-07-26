import React from 'react';
import style from './ButtonNewChallenge.module.css'; 

const ButtonNewChallenge = ({ onClick }) => {
    return (
        <button className={style.buttonUnderline} onClick={onClick}>
            새로 만들기
        </button>
    );
};

export default ButtonNewChallenge;
