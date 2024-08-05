import styled from '@emotion/styled';
import { UnderlinedButton } from '../../../common/Button/UnderlinedButton';
import { breakpoints } from '../../../../styles/variants';

export function Header() {
  return (
    <Wrapper>
      <Title>오늘 내가 먹은 고자극 음식은?</Title>
      <UnderlinedButton type="수정하기" />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  gap: 10px;
  position: relative;
`;

const Title = styled.h1`
  font-weight: bold;
  font-size: 28px;
  @media screen and (max-width: ${breakpoints.sm}) {
    font-size: 20px;
  }
`;
