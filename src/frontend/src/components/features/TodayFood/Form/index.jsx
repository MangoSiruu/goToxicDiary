/* eslint-disable no-alert */
import { useState } from 'react';
import styled from 'styled-components';
import { categories } from '../../../../constant/Foods/categories';
import { Fields } from './Fields';
import { CategoryButton } from '../../../common/Button/Categories';
import { axiosInstance } from '../../../../api/instance';
import { endpoint } from '../../../../api/path';
import { getTodayDate } from '../../../../utils/Calendar/getTodayDate';
import { removeIcons } from '../../../../utils/Icons/removeIcons';
import useTodayEatFoodsStore from '../../../../actions/useTodayEatFoodStore';
import { breakpoints } from '../../../../styles/variants';

export function TodayEatForm({ todayFoods, onFoodsUpdate }) {
  const [selectedCategories, setSelectedCategories] = useState([]);
  const setTodayFoods = useTodayEatFoodsStore((state) => state.setTodayFoods);

  const handleCategoryClick = (category) => {
    setSelectedCategories((prev) =>
      prev.includes(category) ? prev.filter((item) => item !== category) : [...prev, category],
    );
  };

  const handleFormSubmit = async (data) => {
    setSelectedCategories([]);

    try {
      const toxicFoods = Object.entries(data).map(([name, { count }]) => ({
        name: removeIcons(name),
        count,
      }));
      const foods = {
        date: getTodayDate(),
        toxicFoods,
      };

      const res = await axiosInstance.post(endpoint.CALENDAR, foods);
      if (res.data && res.status === 201) {
        setTodayFoods(res.data.dailyRecord.toxicFoods);
        onFoodsUpdate(res.data.dailyRecord.toxicFoods);
      }
    } catch (error) {
      window.alert('다시 시도해 주세요.');
    }
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
