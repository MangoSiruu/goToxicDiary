import styled from '@emotion/styled';
import { colors } from '../../../../styles/variants';
import { SubmitButton } from '../../../features/TodayFood/Form/Button';

export function SignUpStatus({ status, error, success }) {
  if (status === 'loading') return <SubmitButton>가입 중...✨</SubmitButton>;
  if (error) return <Error>🚫회원가입에 실패했습니다🚫</Error>;
  if (success) return <Success>🎉회원가입 완료🎉</Success>;
}

const Error = styled.span`
  color: ${colors.mainOrange};
`;

const Success = styled.span`
  color: green;
`;
