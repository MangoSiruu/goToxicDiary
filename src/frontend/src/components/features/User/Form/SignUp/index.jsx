import React from 'react';
import { useForm } from 'react-hook-form';
import { UnderlinedInputField } from '../../../../common/Form/Input/UnderlinedInputField';
import { SubmitButton } from '../../../TodayFood/Form/Button';
import { Error, FormWrapper, FormBox, Label } from '../Common';

export function SignUpForm() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const password = watch('password');

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
            {...register('id', {
              required: '아이디를 입력하세요',
              minLength: {
                value: 4,
                message: '! 4~12자리의 아이디를 입력해주세요.',
              },
              maxLength: {
                value: 12,
                message: '! 4~12자리의 아이디를 입력해주세요.',
              },
            })}
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
        <Label>비밀번호 확인</Label>
        <FormBox>
          <UnderlinedInputField
            type="password"
            placeholder="비밀번호"
            {...register('passwordConfirm', {
              required: '비밀번호를 확인하세요',
              validate: (value) => value === password || '! 비밀번호가 일치하지 않습니다.',
            })}
          />
          {errors.passwordConfirm && <Error>{errors.passwordConfirm.message}</Error>}
        </FormBox>
        <Label>닉네임</Label>
        <FormBox>
          <UnderlinedInputField
            placeholder="닉네임"
            {...register('username', {
              required: '닉네임을 입력하세요.',
              minLength: {
                value: 2,
                message: '! 2~8자리의 아이디를 입력해주세요.',
              },
              maxLength: {
                value: 8,
                message: '! 2~8자리의 아이디를 입력해주세요.',
              },
            })}
          />
          {errors.password && <Error>{errors.password.message}</Error>}
        </FormBox>
        <SubmitButton type="confirm">회원가입</SubmitButton>
      </FormWrapper>
    </form>
  );
}
