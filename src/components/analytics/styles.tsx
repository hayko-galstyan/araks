import { Badge, Flex } from 'antd';
import styled from 'styled-components';
import { ANALYTICS, COLORS } from 'helpers/constants';

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

export const DashedLine = styled.div<{ width: number; height: number; left?: number; top?: number }>`
  width: ${(props) => props.width}px;
  height: ${(props) => props.height}px;
  border: 1px dashed ${COLORS.ALERT.RED};
  position: absolute;
  z-index: 1000;
  top: ${(props) => props.top}%;
  left: ${(props) => props.left}%;
`;

export const ToolsContainer = styled(Flex)`
  box-shadow: 3px 3px 2px ${COLORS.MAIN_GRAY_SILVER};
  padding: 8px;
  margin-top: 10px;
  gap: 8px;
  justify-content: space-between;
  align-items: center;
`;
