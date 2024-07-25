import styled from '@emotion/styled';
import { colors } from '../../../../styles/variants';

export const ModalButton = ({ type }) => {
  <Modal>{type}</Modal>;
};

const Modal = styled.button`
  color: ${colors.mainOrange};
  font-size: 14px;
  position: absolute;
  right: 10px;
`;
