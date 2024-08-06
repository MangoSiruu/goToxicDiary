import React from 'react';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { UnderlinedInputField } from '../../../../common/Form/Input/UnderlinedInputField';
import { UnderlinedButton } from '../../../../common/Button/UnderlinedButton';
import { Error, FormWrapper, FormBox, Label } from '../Common';
import { SubmitButton } from '../../../TodayFood/Form/Button';
import useLogin from '../../../../../api/hooks/useLogin';
import { getStatus } from '../../../../common/Status';
import { LoginStatus } from '../../../../common/Status/Auth';
import { path } from '../../../../../routes/path';

export function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { mutate: login, isLoading, isError, isSuccess, error } = useLogin();
  const status = getStatus({ isLoading, isError, isSuccess });
  const nav = useNavigate();

  const onSubmit = (data) => {
    login(data);
  };

  const moveToSignUp = () => {
    nav(path.signup);
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
        <LoginStatus status={status} success={isSuccess} error={error} />
        <SubmitButton theme="orange" type="confirm">
          로그인
        </SubmitButton>
        <Container>
          <UnderlinedButton onClick={moveToSignUp}>회원가입</UnderlinedButton>
        </Container>
      </FormWrapper>
    </form>
  );
}

const Container = styled.div`
  width: 100%;
`;
