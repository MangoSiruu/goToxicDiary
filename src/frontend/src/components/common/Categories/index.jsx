import React from "react";
import styled from "@emotion/styled"
import { colors } from "../../../styles/variants"

// const CategoryBox = (props) => {
    
//     return (
//         <Wrapper>

//         </Wrapper>
//     );
// };

// const Wrapper = styled.div({

    

// })

const categoryStyles = {
    beer: {
      icon: '🍺',
      backgroundColor: colors.point_blue,
    },
    coffee: {
      icon: '☕',
      backgroundColor: colors.point_mint,
    },
    cola: {
      icon: '🥤',
      backgroundColor: colors.point_orange,
    },
    instant: {
      icon: '🍔',
      backgroundColor: colors.point_green,
    },
    pepper: {
      icon: '🌶️',
      backgroundColor: colors.point_pink,
    },
    pizza: {
      icon: '🍕',
      backgroundColor: colors.point_navy,
    },
    spoon: {
      icon: '🍴',
      backgroundColor: colors.mainOrange,
    },
  };
  
  // 카테고리 박스의 스타일을 정의한 컴포넌트
  const Box = styled.div
  // 배경 색 바뀜

    // 높이 동일
    // 넓이 동일
    // center 동일
    // padding 동일
    // 폰트? 동일
    // radius 동일
  `
    width: 90px;
    height: 27px;
    padding: 5px 10px;
    display: flex;
    text-align: center;
    justify-content: center;
    align-items: center;
    border-radius: 8px;
    background-color: ${(props) => props.bgColor};
    color: white;
  `;
  
  // CategoryBox 컴포넌트 정의
  const CategoryBox = (props) => {
    // 아이콘 바뀜
    // count 바뀜

    // type -> icon, backgroundColor 지정하고 싶음

    const { icon, backgroundColor } = categoryStyles[props.type];
  
    return (
      <Box bgColor={backgroundColor}>
          {icon} x {props.count}
      </Box>
    );
  };
  
  export default CategoryBox;