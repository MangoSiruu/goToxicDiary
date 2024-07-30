import styled from 'styled-components';
import { colors } from '../../../../styles/variants';

export function UnderlinedInputField(props) {
  return <Field {...props} />;
}

const Field = styled.input`
  width: 351px;
  height: 40px;
  border: none;
  border-bottom: 1px solid ${colors.lightGray};
  box-sizing: border-box;
  background-color: transparent;
  outline: none;
  color: mainGray;

  &:focus {
    outline: none;
    border-bottom: 1px solid ${colors.point_orange};
  }
  &::placeholder {
    color: ${colors.lightGray};
  }
`;
