/* eslint-disable no-alert */
/* eslint-disable react/jsx-props-no-spreading */
import { useForm, Controller } from 'react-hook-form';
import styled from '@emotion/styled';
import { colors } from '../../../../../styles/variants';
import { getUnitOptions, getDefaultUnit } from '../../../../../utils/getUnitOptions';
import { ConfirmButton, CancelButton } from '../../../../common/Button/ButtonModal';

export function Fields({ categories, onSubmit, onCancel }) {
  const { control, handleSubmit, reset, getValues } = useForm({
    defaultValues: categories.reduce(
      (acc, category) => ({
        ...acc,
        [category]: { count: '', unit: getDefaultUnit(category) },
      }),
      {},
    ),
  });

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

  return (
    <form style={{ width: '100%' }} onSubmit={handleSubmit(onFormSubmit)}>
      {categories.map((category) => (
        <FieldContainer key={category}>
          <Label>{category}</Label>
          <Controller
            name={`${category}.count`}
            control={control}
            rules={{ required: '숫자를 입력해주세요.' }}
            render={({ field }) => <Input type="number" placeholder="횟수" {...field} />}
          />
          <Controller
            name={`${category}.unit`}
            control={control}
            render={({ field }) => (
              <Select {...field}>
                {getUnitOptions(category).map((unit) => (
                  <Option key={unit} value={unit}>
                    {unit}
                  </Option>
                ))}
              </Select>
            )}
          />
        </FieldContainer>
      ))}
      <ButtonWrapper>
        <CancelButton type="button" onClick={onCancel}>
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

const Select = styled.select`
  padding: 10px;
  font-size: 14px;
  border-width: 0;
  border-radius: 10px;
  &:hover {
    background-color: ${colors.point_orange};
  }
  &:focus {
    outline: none;
    background-color: ${colors.point_orange};
    border-radius: 10px;
  }
`;

const Option = styled.option`
  font-size: 14px;
`;

const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 10px;
  gap: 10px;
`;
