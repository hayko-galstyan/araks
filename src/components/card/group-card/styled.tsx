import styled from 'styled-components';
import { Card as AntCard, Row } from 'antd';
import { COLORS } from 'helpers/constants';

export const Card = styled(AntCard)`
  & {
    max-width: 228px;
    width: 100%;
    height: 191px;
    border: 1px solid ${COLORS.MAIN_GRAY};
    background-color: ${COLORS.PRIMARY.WHITE};
    cursor: pointer;
    box-shadow: 0px 4px 4px 0px #6f6f6f1a !important;
  }

  &:hover {
    opacity: 0.5;
    transition: opacity 0.5s;
  }
  .ant-card-head-title {
    font-size: 20px;
    color: ${COLORS.PRIMARY.BLUE};
    text-align: center;
  }
  .ant-card-body {
    padding: 0px 24px;
  }
  .ant-card-head {
    border-bottom: none;
  }
`;

export const AddCard = styled.div`
  & {
    max-width: 228px;
    width: 100%;
    height: 191px;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 8px;
    border: 3px dotted ${COLORS.MAIN_GRAY_SILVER};
    cursor: pointer;
  }
`;
export const StyledRowCard = styled(Row)`
  position: absolute;
  top: 51%;
  left: 0;
  width: 228px;
  display: flex;
  justify-content: center;
`;
