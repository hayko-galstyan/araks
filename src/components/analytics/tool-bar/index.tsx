import React, { useCallback, useMemo } from 'react';
import { Drawer, Flex, Tooltip } from 'antd';
import { ANALYTICS, AnalyticToolsDisabled, COLORS } from 'helpers/constants';
import { tools } from './tools';
import { ToolParams } from './form';
import { ReactComponent as LeftIcon } from 'components/icons/left-polygon.svg';
import { ReactComponent as RightIcon } from 'components/icons/right-polygon.svg';
import { Text } from 'components/typography';
import { ACTIONS } from 'context/analytics/reducer';
import { useAnalytics } from 'context/analytics';
import { TToolParams } from '../types';
import { ToolsContainer } from '../styles';

const { TOOLBAR } = ANALYTICS;
const { MAIN_GRAY, ANALYTICS: COLORS_ANALYTICS } = COLORS;

export const ToolBar: React.FC = () => {
  const { selectedTool, handleAction, toolBarWidth, barTypeWidth, boards, nodeTypeId } = useAnalytics();

  const isOpen = useMemo(() => toolBarWidth === TOOLBAR.WIDTH, [toolBarWidth]);

  const isCheckDisableTools = useCallback(
    (tool: string) => {
      if (!boards?.length) return true;
      if (!nodeTypeId && AnalyticToolsDisabled[tool as keyof typeof AnalyticToolsDisabled]) {
        return true;
      }
      return false;
    },
    [boards?.length, nodeTypeId]
  );

  const handleToolClick = useCallback(
    (tool: TToolParams) => {
      handleAction({
        type: ACTIONS.SELECT_TOOL,
        payload: { name: tool.name, type: tool.type },
      });
    },
    [handleAction]
  );

  const handleCloseBar = useCallback(() => {
    handleAction({
      type: ACTIONS.BAR_SIZE_CHANGE,
      payload: { name: 'toolBar' },
    });
  }, [handleAction]);

  const getActiveTool = useCallback((type: string) => selectedTool?.type === type, [selectedTool]);

  return (
    <Drawer
      getContainer={false}
      title={
        <Flex align="center" gap={16} vertical={!isOpen} style={{ cursor: 'pointer' }}>
          {isOpen ? <LeftIcon onClick={handleCloseBar} /> : <RightIcon onClick={handleCloseBar} />}
          {isOpen && <Text>Visuals</Text>}
        </Flex>
      }
      headerStyle={{ height: 50 }}
      bodyStyle={{ padding: isOpen ? 24 : 5 }}
      width={toolBarWidth}
      open={true}
      placement="right"
      closeIcon={false}
      style={{
        background: MAIN_GRAY,
        position: 'relative',
        right: barTypeWidth,
      }}
      mask={false}
      push={false}
    >
      <Text style={{ fontSize: 16, fontWeight: 700, display: 'block', textAlign: isOpen ? 'left' : 'center' }}>
        Tools
      </Text>
      <ToolsContainer vertical={!isOpen} wrap>
        {tools.map((tool) => {
          const isActive = getActiveTool(tool.type);
          const isDisabled = isCheckDisableTools(tool.name);
          return (
            <Tooltip key={tool.name} title={tool.title} color={COLORS_ANALYTICS.DEFAULT_GREY}>
              <Flex
                style={{
                  cursor: 'pointer',
                  opacity: isDisabled ? 0.5 : 1,
                  pointerEvents: isDisabled ? 'none' : 'auto',
                  transform: `scale(${isActive ? 1.4 : 1})`,
                }}
                align="center"
                justify="center"
                onClick={() => handleToolClick(tool)}
              >
                {tool.icon}
              </Flex>
            </Tooltip>
          );
        })}
      </ToolsContainer>
      {isOpen && <ToolParams />}
    </Drawer>
  );
};
