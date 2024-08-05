import styled from 'styled-components';
import { Spinner } from '@chakra-ui/react';

export default function Loader() {
  return (
    <Wrapper>
      <Spinner thickness="3px" color="orange.500" emptyColor="gray.200" size="md" speed="0.65s" />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 30px;
`;
