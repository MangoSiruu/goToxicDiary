import { useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import styled from '@emotion/styled';
import { colors } from '../../../../../styles/variants';
import { getUnitOption } from '../../../../../utils/getUnitOptions';
import { ConfirmButton, CancelButton } from '../../../../common/Button/ButtonModal';
import { removeIcons } from '../../../../../utils/Icons/removeIcons';

export function Fields({ categories, existingFoods, onSubmit, onCancel }) {
  const { control, handleSubmit, reset, getValues, setValue } = useForm({
    defaultValues: categories.reduce((acc, category) => {
      const removedCategory = removeIcons(category);
      const food = (Array.isArray(existingFoods)
        ? existingFoods.find((item) => removeIcons(item.name) === removedCategory)
        : null) || { count: '', unit: getUnitOption(removedCategory) };
      return {
        ...acc,
        [category]: food,
      };
    }, {}),
  });

  useEffect(() => {
    if (Array.isArray(existingFoods)) {
      categories.forEach((category) => {
        const removedCategory = removeIcons(category);
        const food = existingFoods.find((item) => removeIcons(item.name) === removedCategory);
        if (food) {
          setValue(category, { count: food.count, unit: food.unit });
        } else {
          setValue(category, { count: '', unit: getUnitOption(removedCategory) });
        }
      });
    }
  }, [existingFoods, categories, setValue]);

  const onFormSubmit = () => {
    const values = getValues();
    const hasEmptyFields = Object.values(values).some(({ count }) => count === '');
    if (hasEmptyFields) {
      window.confirm('모든 필드를 입력해주세요.');
    } else {
      onSubmit(values);
      reset();
    }
  };

  const handleCancel = () => {
    reset();
    onCancel();
  };

  return (
    <form style={{ width: '100%' }} onSubmit={handleSubmit(onFormSubmit)}>
      {categories.map((category) => (
        <FieldContainer key={category}>
          <Label>{category}</Label>
          <Controller
            name={`${category}.count`}
            control={control}
            rules={{ required: '숫자를 입력해주세요.' }}
            render={({ field }) => (
              <Input type="number" placeholder="횟수" {...field} value={field.value || ''} />
            )}
          />
          {getUnitOption(category)}
        </FieldContainer>
      ))}
      <ButtonWrapper>
        <CancelButton type="button" onClick={handleCancel}>
          취소하기
        </CancelButton>
        <ConfirmButton type="submit">저장하기</ConfirmButton>
      </ButtonWrapper>
    </form>
  );
}

const FieldContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 8px 12px;
  gap: 10px;
  background: ${colors.white};
`;

const Label = styled.label`
  font-size: 14px;
  font-weight: bold;
  color: ${colors.darkGray};
  width: 100px;
`;

const Input = styled.input`
  padding: 10px;
  font-size: 14px;
  border-width: 0;
  border-bottom: 1px solid ${colors.lightGray};
  outline: none;
`;

const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 30px;
  gap: 10px;
`;
