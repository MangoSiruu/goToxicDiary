import React from 'react';
import style from './ButtonDelete.module.css';
import fetchInstance from '../../../utils/fetchInstance';


const DeleteButton = ({ onClick, children, id }) => {


  
  /* useStore로 따로 만들건지 후에 확인 */
  const handleDelete = async () => {
    console.log(id)
    try {
      const response = fetchInstance(`https://67327f75-71f8-4777-acb0-9e7fee4f7680.mock.pstmn.io/api/challenge/${id}`, 'DELETE');
      console.log(response)
      onClick(); 
    } catch (error) {
      console.error('Error deleting the challenge:', error);
    }
  };





  return (
    <button className={style.deleteButton} onClick={handleDelete}>
      {children}
    </button>
  );
};

export default DeleteButton;