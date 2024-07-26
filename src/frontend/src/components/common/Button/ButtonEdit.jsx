import React from 'react';
import style from './ButtonEdit.module.css';

const EditButton = ({ onClick, children }) => {
  return (
    <button className={style.editButton} onClick={onClick}>
      {children}
    </button>
  );
};

export default EditButton;