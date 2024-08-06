import styled from '@emotion/styled';
import { Wrapper } from '../../components/common/layouts/Wrapper';
import { SignUpForm } from '../../components/features/User/Form/SignUp';
import RetryErrorBoundary from '../../components/common/RetryErrorBoundary';

export default function SignUpPage() {
  const logoTitle = '/svg/logoTitle.svg';
  return (
    <Wrapper>
      <LogoSection>
        <img src={process.env.PUBLIC_URL + logoTitle} alt="고망다이어리 로고" width="200px" />
      </LogoSection>
      <FormSection>
        <RetryErrorBoundary>
          <SignUpForm />
        </RetryErrorBoundary>
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
