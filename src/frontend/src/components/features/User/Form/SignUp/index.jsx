import styled from 'styled-components';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { UnderlinedInputField } from '../../../../common/Form/Input/UnderlinedInputField';
import { UnderlinedButton } from '../../../../common/Button/UnderlinedButton';
import { Error, FormWrapper, FormBox, Label } from '../Common';
import useSignUp from '../../../../../api/hooks/useSignUp';
import { SubmitButton } from '../../../TodayFood/Form/Button';
import { SignUpStatus } from '../../../../common/Status/Auth';
import { getStatus } from '../../../../common/Status';
import { path } from '../../../../../routes/path';

export function SignUpForm() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const password = watch('password');
  const { mutateAsync: signUp, isLoading, isError, isSuccess, error } = useSignUp();
  const status = getStatus({ isLoading, isError, isSuccess });
  const nav = useNavigate();

  const onSubmit = async (data) => {
    await signUp(data);
  };

  const moveToLogin = () => {
    nav(path.login);
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
                value: 8,
                message: '! 8~15자리의 아이디를 입력해주세요.',
              },
              maxLength: {
                value: 15,
                message: '! 8~15자리의 아이디를 입력해주세요.',
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
            {...register('password', {
              required: '비밀번호를 입력하세요',
              minLength: {
                value: 12,
                message: '! 12~20자리 비밀번호를 입력해주세요.',
              },
              maxLength: {
                value: 20,
                message: '! 12~20자리의 아이디를 입력해주세요.',
              },
            })}
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
            {...register('nickname', {
              required: '닉네임을 입력하세요.',
              minLength: {
                value: 2,
                message: '! 2~10자리의 닉네임을 입력해주세요.',
              },
              maxLength: {
                value: 10,
                message: '! 2~10자리의 닉네임을 입력해주세요.',
              },
            })}
          />
          {errors.nickname && <Error>{errors.nickname.message}</Error>}
        </FormBox>
        <SignUpStatus status={status} success={isSuccess} error={error} />
        <SubmitButton theme="orange" type="submit">
          회원가입
        </SubmitButton>
        <Container>
          <UnderlinedButton onClick={moveToLogin}>로그인</UnderlinedButton>
        </Container>
      </FormWrapper>
    </form>
  );
}

const Container = styled.div`
  width: 100%;
`;
