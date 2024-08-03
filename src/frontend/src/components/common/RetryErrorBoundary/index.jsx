import styled from '@emotion/styled';
import { useQueryErrorResetBoundary } from '@tanstack/react-query';
import { ErrorBoundary } from 'react-error-boundary';
import { SubmitButton } from '../../features/TodayFood/Form/Button';

function FallbackComponent({ error, resetErrorBoundary }) {
  return (
    <Wrapper>
      <h2>😭 에러가 발생했습니다 😭</h2>
      <h4 style={{ color: 'red' }}>{error.message}</h4>
      <SubmitButton
        onClick={() => resetErrorBoundary()}
        style={{ width: '100px', margin: '16px 0' }}
      >
        다시 시도하기
      </SubmitButton>
    </Wrapper>
  );
}

export default function RetryErrorBoundary({ children }) {
  const { reset } = useQueryErrorResetBoundary();

  return (
    <ErrorBoundary onReset={reset} fallbackRender={FallbackComponent}>
      {children}
    </ErrorBoundary>
  );
}

const Wrapper = styled.div({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '80px',
  textAlign: 'center',
  h4: {
    margin: '8px 0',
  },
});
