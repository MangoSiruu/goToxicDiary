import React from 'react';
import style from './ButtonDelete.module.css';
import useChallengeDeleteStore from '../../../actions/useChallengeDeleteStore';

const DeleteButton = ({ id }) => {
  const { deleteChallenge } = useChallengeDeleteStore();

  const handleClick = () => {
    if (window.confirm("삭제하시겠습니까?")) {
      deleteChallenge(id);
      window.location.reload();
    }
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
