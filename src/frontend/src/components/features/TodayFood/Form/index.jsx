import { useState } from 'react';
import styled from 'styled-components';
import { categories } from '../../../../constant/Foods/categories';
import { Fields } from './Fields';
import { CategoryButton } from '../../../common/Button/Categories';
import { breakpoints, colors } from '../../../../styles/variants';
import { useSaveTodayEatFoods } from '../../../../api/hooks/useSaveTodayEatFoods';
import Loader from '../../../common/Loader';

export function TodayEatForm({ todayFoods, onFoodsUpdate }) {
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [successMessage, setSuccessMessage] = useState(null);

  const mutation = useSaveTodayEatFoods((data) => {
    onFoodsUpdate(data);
    setSuccessMessage('🎉기록이 완료되었어요🎉');
    setTimeout(() => setSuccessMessage(null), 5000);
  });

  const handleCategoryClick = (category) => {
    setSelectedCategories((prev) =>
      prev.includes(category) ? prev.filter((item) => item !== category) : [...prev, category],
    );
  };

  const handleFormSubmit = (data) => {
    mutation.mutate(data);
    setSelectedCategories([]);
  };

  const handleFormCancel = () => {
    setSelectedCategories([]);
  };

  return (
    <Wrapper>
      <Title>오늘 하루동안 무엇을, 얼마나 드셨나요?</Title>
      <Description>카테고리를 선택해 주세요.(중복 가능)</Description>
      <ButtonWrapper>
        {categories.map((category) => (
          <CategoryButton
            key={category}
            category={category}
            onClick={() => handleCategoryClick(category)}
            isSelected={selectedCategories.includes(category)}
          />
        ))}
      </ButtonWrapper>
      {selectedCategories.length > 0 && (
        <Fields
          categories={selectedCategories}
          existingFoods={todayFoods}
          onSubmit={handleFormSubmit}
          onCancel={handleFormCancel}
        />
      )}
      <HandleContainer>
        {mutation.isPending && <Loader />}
        {successMessage && <SuccessMessage>{successMessage}</SuccessMessage>}
      </HandleContainer>
    </Wrapper>
  );
}

const Title = styled.h1`
  font-size: 24px;
  font-weight: bold;
  @media screen and (max-width: ${breakpoints.sm}) {
    font-size: 16px;
  }
`;

const HandleContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  margin: 8px 0;
  height: 30px;
`;

const SuccessMessage = styled.div`
  color: ${colors.mainOrange};
  font-size: 16px;
  font-weight: bold;
  @media screen and (max-width: ${breakpoints.sm}) {
    font-size: 14px;
  }
`;

const Description = styled.h3`
  font-size: 14px;
  @media screen and (max-width: ${breakpoints.sm}) {
    font-size: 12px;
  }
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 30px;
  gap: 20px;
  background-color: #fff;
  border-radius: 20px;
  margin-bottom: 10px;
`;

const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: flex-start;
  align-content: flex-start;
  padding: 0px 10px;
  gap: 20px;
`;
