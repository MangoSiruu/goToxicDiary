import React from 'react';
import style from './ButtonDelete.module.css';
import useChallengeDeleteStore from '../../../actions/useChallengeDeleteStore';

const DeleteButton = ({ id }) => {
  const { deleteChallenge } = useChallengeDeleteStore();

  const handleClick = () => {
    deleteChallenge(id);
  };

  return (
    <button
      className={style.deleteButton}
      onClick={handleClick}
    >
      삭제
    </button>
  );
};

export default DeleteButton;
