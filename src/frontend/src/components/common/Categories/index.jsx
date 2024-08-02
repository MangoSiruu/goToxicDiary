import React from "react";
import styled from "@emotion/styled"

const categoryStyles = {
  // category type - icon, backgroundColor 매핑
    beer: {
      icon: '🍺',
      backgroundColor: '66, 158, 189, 0.7',
    },
    coffee: {
      icon: '☕',
      backgroundColor: '0, 161, 157, 0.7',
    },
    cola: {
      icon: '🥤',
      backgroundColor: '252, 159, 102, 0.7',
    },
    instant: {
      icon: '🍔',
      backgroundColor: '0, 161, 81, 0.7',
    },
    pepper: {
      icon: '🌶️',
      backgroundColor: '224, 93, 93, 0.7',
    },
    pizza: {
      icon: '🍕',
      backgroundColor: '5, 63, 92, 0.7',
    },
    spoon: {
      icon: '🍴',
      backgroundColor: '242, 127, 12, 0.7',
    },
  };
  
  // 카테고리 박스의 스타일을 정의한 컴포넌트
  const Box = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    padding: 5px 10px;
    gap: 10px;

    width: 90px;
    height: 27px;

    border-radius: 5px;
    text-align: center;
    background: rgba(${(props) => props.bgColor});
    color: white;
  `;
  
  // CategoryBox 컴포넌트 정의
  // <CategoryBox type="beer" count="3">
  const CategoryBox = ({ type, count }) => {
    const { icon, backgroundColor } = categoryStyles[type];
  
    return (
      <Box bgColor={backgroundColor}>
          {icon} x {count}
      </Box>
    );
  };
  
  export default CategoryBox;