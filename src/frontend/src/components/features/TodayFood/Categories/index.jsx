import styled from '@emotion/styled';
import { categories } from '../../../../constant/Foods/categories';
import { CategoryButton } from '../../../common/Button/Categories';

export default function Categories() {
  return (
    <Wrapper>
      {categories.map((category) => (
        <CategoryButton key={category} category={category} />
      ))}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: flex-start;
  align-content: flex-start;
  padding: 0px 10px;
  gap: 20px;
`;
