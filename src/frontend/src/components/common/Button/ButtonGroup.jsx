import styled from '@emotion/styled';
import { colors } from '../../../styles/variants';

const ButtonGroup = ({ onCancel, onSubmit }) => {
  return (
    <FormGroup>
      <Cancel onClick={onCancel}>이전으로</Cancel>
      <Confirm onClick={onSubmit}>만들기</Confirm>
    </FormGroup>
  );
};

export default ButtonGroup;


const FormGroup = styled.div`
  display: flex;
  justify-content: center; /* 버튼들을 오른쪽으로 정렬합니다 */
  gap: 10px; /* 버튼들 사이의 간격을 설정합니다 */
`;

const Confirm = styled.button`
  width: 130px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 15px 10px;
  border-radius: 5px;
  font-size: 16px;
  font-weight: 500;
  background: ${colors.point_orange};
  color: ${colors.white};
  transition:
    background 0.2s,
    color 0.2s;
  &:hover {
    background: ${colors.mainOrange};
    color: ${colors.white};
  }
`;

const Cancel = styled.button`
  width: 130px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 15px 10px;
  border-radius: 5px;
  font-size: 16px;
  font-weight: 500;
  background: ${colors.midgray};
  color: ${colors.white};
  transition:
    background 0.2s,
    color 0.2s;
  &:hover {
    background: ${colors.mainGray};
    color: ${colors.white};
  }
`;
