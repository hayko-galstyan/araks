import styled from 'styled-components';
import { Flex, Menu, Popover } from 'antd';

export const ToolHeader = styled(Flex)`
  padding: 16px;
`;

export const AnalyticPopover = styled(Popover)`
  padding: 0 !important;
  .ant-popover-inner {
    padding: 0;
  }
`;

export const AnalyticActionMenu = styled(Menu)`
  & .ant-menu-item {
    display: flex;
    align-items: center;
    padding: 5px;
  }
`;
