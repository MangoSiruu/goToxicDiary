import styled from '@emotion/styled';
import { useState } from 'react';
import { colors } from '../../../../styles/variants';
import { categories } from '../../../../constant/Foods/categories';
import { Fields } from './Fields';
import { CategoryButton } from '../../../common/Button/Categories';
import { UnderlinedButton } from '../../../common/Button/UnderlinedButton';

export function TodayEatForm() {
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [records, setRecords] = useState({});

  const handleCategoryClick = (category) => {
    setSelectedCategories((prev) =>
      prev.includes(category) ? prev.filter((item) => item !== category) : [...prev, category],
    );
  };

  const handleFormSubmit = (data) => {
    setRecords(data);
    setSelectedCategories([]);
  };

  const handleFormCancel = () => {
    setSelectedCategories([]);
  };

  return (
    <Wrapper>
      <Title>오늘 내가 먹은 고자극 음식은?</Title>
      {Object.keys(records).length === 0 ? (
        <UnderlinedButton>기록하러 가기</UnderlinedButton>
      ) : (
        Object.entries(records).map(([category, { count, unit }]) => (
          <Record key={category}>
            {category}: {count} {unit}
          </Record>
        ))
      )}
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
          onSubmit={handleFormSubmit}
          onCancel={handleFormCancel}
        />
      )}
    </Wrapper>
  );
}

const Title = styled.h1`
  font-size: 24px;
  font-weight: bold;
`;

const Description = styled.h3`
  font-size: 14px;
`;
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 30px;
  gap: 20px;
  background-color: #fff;
  border-radius: 20px;
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

const Record = styled.div`
  font-size: 16px;
  margin-bottom: 5px;
  font-weight: bold;
  color: ${colors.mainGray};
`;
