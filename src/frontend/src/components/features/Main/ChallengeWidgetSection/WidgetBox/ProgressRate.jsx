import styled from 'styled-components';
import { useChallenge } from '../../../../../api/hooks/useChallenge';
import { colors, breakpoints } from '../../../../../styles/variants';

export default function ProgressRate({ id }) {
  const { data, isError } = useChallenge(id);
  const { challenge } = data;

  return (
    <Wrapper>
      <Rate>
        {challenge.progress}%
        <br /> 달성
      </Rate>
      {isError && <span>⁉️</span>}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;

  width: 55px;
  height: 55px;

  background: #fbf4ee;
  border-radius: 999px;
`;

const Rate = styled.h1`
  color: ${colors.mainOrange};
  font-weight: 900;
  font-size: 14px;
  font-family: 'GmarketSansMedium';
  margin-left: 4px;
  margin-top: 4px;
  @media (max-width: ${breakpoints.sm}) {
    font-size: 12px;
    margin: 0 auto;
  }
`;
