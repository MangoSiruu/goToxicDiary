import styled from '@emotion/styled';
import logoTitle from '../../assets/icons/svg/logoTitle.svg';
import { colors } from '../../styles/variants';

export default function StartView() {
  return (
    <Wrapper>
      <img src={logoTitle} alt="고망다이어리 로고" width="200px" />
      <Text>
        고자극은 이제 고망!
        <br />
        자극적인 식생활 타파 일기
      </Text>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;
  background-color: #fff;
  height: 100vh;
  width: 100%;
`;

const Text = styled.h2`
  font-family: 'GmarketSansMedium';
  color: ${colors.darkGray};
  text-align: center;
  font-size: 16px;
`;
