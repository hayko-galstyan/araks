import { Badge, Flex } from 'antd';
import styled from 'styled-components';
import { ANALYTICS } from 'helpers/constants';

const { LEGEND_TOOL_WIDTH } = ANALYTICS;

export const CustomBadge = styled(Badge)`
  & .ant-badge-status-dot {
    width: 18px !important;
    height: 18px !important;
  }
`;

export const TreeSelectHeader = styled(Flex)<{ color: string }>`
  &:hover {
    background-color: ${(props) => `${props.color}20`};
  }
`;

export const AnalyticToolLegend = styled(Flex)<{ height: number }>`
  gap: 10px;
  max-width: ${LEGEND_TOOL_WIDTH}px;
  max-height: ${(props) => props.height - 25}px;
  overflow-x: 'none';
  overflow-y: auto;
  margin-left: 25px;

  & .ant-badge-status-text {
    font-size: 14px !important;
  }
`;
