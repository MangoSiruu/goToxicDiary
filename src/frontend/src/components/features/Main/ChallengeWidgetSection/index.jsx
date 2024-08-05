import styled from 'styled-components';
import { breakpoints } from '../../../../styles/variants';
import { WidgetBox } from './WidgetBox';
import { UnderlinedButton } from '../../../common/Button/UnderlinedButton';
import { useChallengeList } from '../../../../api/hooks/useChallengeList';
import Loader from '../../../common/Loader';

export function ChallengeWidgetSection() {
  const { data, isLoading } = useChallengeList({ finished: false, size: 2 });

  const challengeList = data.content;

  const renderComponent = () => {
    if (!challengeList || challengeList.length <= 0) {
      return <span>진행 중인 챌린지가 없어요!</span>;
    }
    if (isLoading) return <Loader />;
    return (
      <List>
        {challengeList.map((challenge) => (
          <WidgetBox challenge={challenge} />
        ))}
      </List>
    );
  };
  return (
    <Wrapper>
      <Header>
        <Title>내 챌린지</Title>
        <UnderlinedButton>보러가기</UnderlinedButton>
      </Header>
      {renderComponent()}
    </Wrapper>
  );
}

const Wrapper = styled.section`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 20px;
`;

const List = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px 0px;
`;

const Header = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const Title = styled.span`
  font-size: 24px;
  font-weight: 700;
  @media screen and (max-width: ${breakpoints.sm}) {
    font-size: 20px;
  }
`;
