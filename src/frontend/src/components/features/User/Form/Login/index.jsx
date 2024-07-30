import React from 'react';
import { useForm } from 'react-hook-form';
import { UnderlinedInputField } from '../../../../common/Form/Input/UnderlinedInputField';
import { Error, FormWrapper, FormBox, Label } from '../Common';
import { SubmitButton } from '../../../TodayFood/Form/Button';

export function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormWrapper>
        <Label>아이디</Label>
        <FormBox>
          <UnderlinedInputField
            placeholder="아이디"
            {...register('id', { required: '아이디를 입력하세요' })}
          />
          {errors.id && <Error>{errors.id.message}</Error>}
        </FormBox>
        <Label>비밀번호</Label>
        <FormBox>
          <UnderlinedInputField
            type="password"
            placeholder="비밀번호"
            {...register('password', { required: '비밀번호를 입력하세요' })}
          />
          {errors.password && <Error>{errors.password.message}</Error>}
        </FormBox>

        <SubmitButton theme="orange" type="confirm">
          로그인
        </SubmitButton>
      </FormWrapper>
    </form>
  );
}
