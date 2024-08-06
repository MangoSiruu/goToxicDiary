import React from 'react';
import style from './ChallengeWrapper.module.css';

function ChallengeWrapper({ input }) {
  return (
    <div className={style.wrapper}>
      <img>커피</img>
      {/* input.DefaultIcon */}
      <h3>카페인 끊기</h3>
      {/* input.ChallengeName */}
      <h4>종료까지 15일</h4>
      {/* input.endData-startData */}

      <button>수정</button>
      <button>삭제</button>
    </div>
  );
}

export default ChallengeWrapper;
