import styled from 'styled-components';
import { useChallenge } from '../../../../../api/hooks/useChallenge';
import Loader from '../../../../common/Loader';
import { colors, breakpoints } from '../../../../../styles/variants';

export default function ChallegePreview({ id }) {
  const { data, isLoading } = useChallenge(id);
  const { challenge } = data;
  const successList = challenge.successes?.slice().reverse() || []; // 최신순 정렬

  const formatDate = (dateString) => {
    const [year, month, day] = dateString.split('-');
    return `${year}년 ${month}월 ${day}일`;
  };

  return (
    <Wrapper>
      {isLoading && <Loader />}
      {!isLoading && successList.length <= 0 && (
        <Text>
          오늘 챌린지를 시작하셨네요. <br /> 완주까지 파이팅!
        </Text>
      )}
      {successList.map((challengeSuccess) => (
        <DayBox key={challengeSuccess.date}>
          <Date>{formatDate(challengeSuccess.date)}</Date>
          <Modal success={challengeSuccess.success}>
            {challengeSuccess.success ? '성공' : '실패'}
          </Modal>
        </DayBox>
      ))}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 8px 0px;
  gap: 8px;
`;

const Text = styled.div`
  padding: 4px 8px;
  text-align: center;
`;

const DayBox = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
`;

const Date = styled.p`
  font-size: 16px;
  @media screen and (max-width: ${breakpoints.sm}) {
    font-size: 14px;
  }
`;
const Modal = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 4px 8px;
  gap: 4px;
  background-color: ${({ success }) => (success ? '#FFA500' : '#BDBDBD')};
  color: ${colors.white};
  font-size: 14px;
  border-radius: 5px;
  @media screen and (max-width: ${breakpoints.sm}) {
    font-size: 12px;
  }
`;
