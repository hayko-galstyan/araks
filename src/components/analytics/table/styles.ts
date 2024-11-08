import styled from 'styled-components';
import { Table } from 'antd';
import { COLORS } from 'helpers/constants';

export const AnalyticDynamicTable = styled(Table)`
  width: 100%;
  & .ant-table-body {
    scrollbar-width: thin;
    scrollbar-color: ${COLORS.PRIMARY.BLUE} transparent;

    &::-webkit-scrollbar {
      width: 5px;
      height: 5px;
    }

    &::-webkit-scrollbar-thumb {
      background-color: ${COLORS.PRIMARY.BLUE};
      border-radius: 5px;
    }

    &::-webkit-scrollbar-track {
      background-color: transparent;
      border-radius: 5px;
    }
  }
`;
