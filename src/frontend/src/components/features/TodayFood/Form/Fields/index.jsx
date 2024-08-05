/* eslint-disable no-alert */
import { useForm, Controller } from 'react-hook-form';
import styled from '@emotion/styled';
import { colors } from '../../../../../styles/variants';
import { getUnitOption } from '../../../../../utils/getUnitOptions';
import { ConfirmButton, CancelButton } from '../../../../common/Button/ButtonModal';
import { removeIcons } from '../../../../../utils/Icons/removeIcons';

export function Fields({ categories = [], existingFoods = [], onSubmit, onCancel }) {
  const { control, handleSubmit, reset, getValues } = useForm({
    defaultValues: categories.reduce((acc, category) => {
      const removedCategory = removeIcons(category);

      const foodItem = existingFoods.find((item) => removeIcons(item.name) === removedCategory) || {
        count: 0,
        unit: getUnitOption(removedCategory),
      };

      return {
        ...acc,
        [category]: foodItem,
      };
    }, {}),
  });

  const onFormSubmit = () => {
    const values = getValues();
    onSubmit(values);
    reset();
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
            rules={{
              required: '숫자를 입력해주세요.',
              min: {
                value: 0,
                message: '0 이상의 숫자만 입력 가능해요.',
              },
            }}
            render={({ field, fieldState }) => (
              <Box>
                <Input type="number" placeholder="횟수" {...field} value={field.value || ''} />
                {fieldState.error && <ErrorMessage>{fieldState.error.message}</ErrorMessage>}
              </Box>
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

const Box = styled.div`
  display: flex;
  flex-direction: column;
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

const ErrorMessage = styled.span`
  color: red;
  font-size: 12px;
  margin: 8px 0;
`;
