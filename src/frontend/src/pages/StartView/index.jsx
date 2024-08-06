import { useEffect } from 'react';
import styled from '@emotion/styled';
import { useNavigate } from 'react-router-dom';
import logoTitle from '../../assets/icons/svg/logoTitle.svg';
import { colors } from '../../styles/variants';
import { path } from '../../routes/path';

export default function StartView() {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  useEffect(() => {
    const timer = setTimeout(() => {
      if (token) {
        navigate(path.main);
      } else {
        navigate(path.login);
      }
    }, 3000);

    return () => clearTimeout(timer);
  });

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
