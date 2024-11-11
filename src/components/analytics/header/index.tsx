import React, { useState, useCallback } from 'react';
import { Flex, Typography } from 'antd';
import { useAnalytics } from 'context/analytics';
import { useDeleteBoardToolById } from 'api/analytics/use-delete-tool-by-id';
import { AnalyticActionMenu, AnalyticPopover, ToolHeader } from './styles';
import { items } from './items';
import { ReactComponent as MenuIcon } from '../../icons/menu-icon.svg';
import { ACTIONS } from 'context/analytics/reducer';
import { Text } from 'components/typography';
import { COLORS, AnalyticActionTypes, ANALYTICS } from 'helpers/constants';
import { THeaderParams } from '../types';
import { useUpdateBoard } from 'api/analytics/use-update-board';
import type { MenuInfo } from 'rc-menu/lib/interface';
import { useUpdateToolPosition } from 'api/analytics/use-update-tool-position';

const { SECONDARY } = COLORS;
const { UPDATE, REMOVE, TO_BE_CENTER } = AnalyticActionTypes;
const { Paragraph } = Typography;
const { CANVAS } = ANALYTICS;

export const Header: React.FC<THeaderParams> = ({ id, isValid, toolAxis }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<string[]>([]);

  const { handleAction, activeBoard, tools, canvasWidth } = useAnalytics();
  const { mutate: deleteBoardToolFn } = useDeleteBoardToolById();
  const { mutate: updateBoardToolFn } = useUpdateBoard();
  const { mutate: updateToolPositionFn } = useUpdateToolPosition();

  const selectedTool = tools[activeBoard][id];
  const { color, title } = selectedTool;

  const handleOpenChange = useCallback((open: boolean) => {
    setIsOpen(open);
    if (!open) {
      setSelectedItem([]);
    }
  }, []);

  const handleClickMenuItem = useCallback(
    (e: MenuInfo) => {
      e.domEvent.stopPropagation();

      setSelectedItem([e.key]);

      switch (e.key) {
        case REMOVE: {
          deleteBoardToolFn(
            { id: activeBoard, chart_id: id },
            {
              onSuccess: () => {
                handleAction({ type: ACTIONS.REMOVE_TOOL_DASHBOARD, payload: id });
                handleOpenChange(false);
              },
            }
          );
          break;
        }
        case UPDATE: {
          updateBoardToolFn(
            { id: activeBoard, chart_id: id },
            {
              onSuccess: (data) => {
                handleAction({
                  type: ACTIONS.UPDATE_TOOL_PARAMS,
                  payload: { id, updatedParams: data.data[0] },
                });
                handleOpenChange(false);
              },
            }
          );
          break;
        }
        case TO_BE_CENTER: {
          const updatedParams = {
            fx: canvasWidth / 2 - selectedTool.width / 2,
            fy: CANVAS.MAX_HEIGHT / 2 - selectedTool.height / 2,
            width: selectedTool.width,
            height: selectedTool.height,
          };
          updateToolPositionFn(
            {
              id: activeBoard,
              chart_id: id,
              position: updatedParams,
            },
            {
              onSuccess: () => {
                handleAction({
                  type: ACTIONS.UPDATE_TOOL_PARAMS,
                  payload: { id, updatedParams },
                });
                handleOpenChange(false);
              },
            }
          );
          break;
        }
        default:
          break;
      }
    },
    [
      deleteBoardToolFn,
      activeBoard,
      id,
      handleAction,
      handleOpenChange,
      updateBoardToolFn,
      canvasWidth,
      selectedTool.width,
      selectedTool.height,
      updateToolPositionFn,
    ]
  );

  return (
    <ToolHeader justify="space-between">
      <Flex style={{ width: '100%' }} vertical gap={12}>
        {isValid ? (
          <Flex gap={12}>
            <Text style={{ fontSize: 16, color, fontWeight: 700 }}>{title}</Text>
            {toolAxis && (
              <Paragraph style={{ fontSize: 14, fontWeight: 500 }} ellipsis={{ rows: 1 }}>
                {`(${toolAxis})`}
              </Paragraph>
            )}
          </Flex>
        ) : (
          <Text style={{ fontSize: 14, color: SECONDARY.MAGENTA }}>Can you update your tool?</Text>
        )}
      </Flex>
      <Flex align="start">
        <AnalyticPopover
          content={
            <AnalyticActionMenu
              selectedKeys={selectedItem}
              className="action-menu"
              onClick={handleClickMenuItem}
              items={items}
            />
          }
          trigger="click"
          placement="bottom"
          open={isOpen}
          onOpenChange={handleOpenChange}
          getPopupContainer={(triggerNode) => triggerNode}
          className="analytic-header-menu"
        >
          <Flex style={{ cursor: 'pointer' }}>
            <MenuIcon />
          </Flex>
        </AnalyticPopover>
      </Flex>
    </ToolHeader>
  );
};
