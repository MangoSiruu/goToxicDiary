import styled from '@emotion/styled';
import { LoginForm } from '../../components/features/User/Form/Login';
import logoTitle from '../../assets/icons/svg/logoTitle.svg';
import { Wrapper } from '../../components/common/layouts/Wrapper';

export default function LoginPage() {
  return (
    <Wrapper>
      <LogoSection>
        <img src={logoTitle} alt="고망다이어리 로고" width="200px" />
      </LogoSection>
      <FormSection>
        <LoginForm />
      </FormSection>
    </Wrapper>
  );
}

const FormSection = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px 0px;
  gap: 20px;
`;

const LogoSection = styled.section`
  margin: 10px;
`;
