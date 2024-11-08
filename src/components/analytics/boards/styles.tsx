import styled from 'styled-components';
import { Flex } from 'antd';
import { COLORS } from 'helpers/constants';

export const BoardsContainer = styled(Flex)`
  & {
    width: 100%;
    border-bottom: 1px solid #d9d9d9;
    height: 50px;
    padding: 8px 0;
    margin-left: 5px;
    background: ${COLORS.MAIN_GRAY};
    justify-content: space-between;
  }
`;

export const BoardItem = styled(Flex)`
  & {
    cursor: pointer;
    width: 20%;
    height: 42px;
    border: 1px solid #d9d9d9;
    align-items: center;
    padding: 0 16px;
  }

  & .board_name {
    max-width: 50%;
  }
`;
