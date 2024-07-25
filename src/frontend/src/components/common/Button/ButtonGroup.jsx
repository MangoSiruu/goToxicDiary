import React from 'react';
import styles from './ButtonGroup.module.css';

const ButtonGroup = ({ onCancel, onSubmit }) => {
  return (
    <div className={styles.formGroupButtons}>
      <button className={styles.cancel} onClick={onCancel}>이전으로</button>
      <button className={styles.submit} onClick={onSubmit}>만들기</button>
    </div>
  );
};

export default ButtonGroup;
