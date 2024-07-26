import styled from '@emotion/styled';
import { Wrapper } from './index';
import { IconContainer } from '../../layouts/Icons';
import { colors } from '../../../../styles/variants';

import { getIconPath } from '../../../../utils/Icons/getIconPath';

export function ExceptionCard() {
  return (
    <Wrapper>
      <IconContainer src={getIconPath('로고')} width="56px" height="46px" />
      <Text>
        아직 기록하지 <br /> 않으셨나요?
      </Text>
      <Description>기록하러 가기</Description>
    </Wrapper>
  );
}

const Text = styled.div`
  font-size: 10px;
  font-family: 'GmarketSansMedium';
  color: ${colors.midgray};
  text-align: center;
`;

const Description = styled.h4`
  font-size: 12px;
  font-family: 'GmarketSansMedium';
  font-weight: bold;
  color: ${colors.mainGray};
`;
