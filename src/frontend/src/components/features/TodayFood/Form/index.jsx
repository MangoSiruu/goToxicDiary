import styled from '@emotion/styled';
import { colors } from '../../../../styles/variants';
import Categories from '../Categories';

export function TodayEatForm() {
  return (
    <Wrapper>
      <Categories />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 30px;
  gap: 20px;
  background: ${colors.white}
  border-radius: 20px;
`;
