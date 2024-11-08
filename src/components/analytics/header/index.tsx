import React, { useState, useCallback } from 'react';
import { Flex } from 'antd';
import { useDeleteBoardToolById } from 'api/analytics/use-delete-tool-by-id';
import { AnalyticActionMenu, AnalyticPopover, ToolHeader } from './styles';
import { items } from './items';
import type { MenuInfo } from 'rc-menu/lib/interface';
import { ReactComponent as MenuIcon } from '../../icons/menu-icon.svg';
import { useAnalytics } from 'context/analytics';
import { ACTIONS } from 'context/analytics/reducer';
import { Text } from 'components/typography';
import { COLORS } from 'helpers/constants';
import { THeaderParams } from '../types';
import { useUpdateBoard } from 'api/analytics/use-update-board';

const { SECONDARY } = COLORS;

export const Header: React.FC<THeaderParams> = ({ id, board, title, color, isValid }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const { handleAction } = useAnalytics();

  const { mutate: deleteBoardToolFn } = useDeleteBoardToolById();
  const { mutate: updateBoardToolFn } = useUpdateBoard();

  const handleOpenChange = useCallback(() => setIsOpen((prev) => !prev), []);

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  const handleClickMenuItem = (e: MenuInfo) => {
    e.domEvent.stopPropagation();
    if (e.key === 'detach') {
      deleteBoardToolFn(
        {
          id: board,
          chart_id: id,
        },
        {
          onSuccess: () => {
            handleAction({
              type: ACTIONS.REMOVE_TOOL_DASHBOARD,
              payload: id,
            });
            handleOpenChange();
          },
        }
      );
    } else if (e.key === 'update') {
      updateBoardToolFn(
        {
          id: board,
          chart_id: id,
        },
        {
          onSuccess: (data) => {
            handleAction({
              type: ACTIONS.UPDATE_TOOL_PARAMS,
              payload: {
                id: id,
                updatedParams: data.data[0],
              },
            });
            handleOpenChange();
          },
        }
      );
    }
  };

  return (
    <ToolHeader justify={'space-between'} align={'center'}>
      <Flex style={{ width: '100%' }} vertical gap={12} align="center" justify="center">
        <Text style={{ fontSize: 16, color: color }}>{title}</Text>
        {!isValid && <Text style={{ fontSize: 14, color: SECONDARY.MAGENTA }}>Can you update your tool?</Text>}
      </Flex>
      <Flex align="center">
        <AnalyticPopover
          content={<AnalyticActionMenu className="action-menu" onClick={handleClickMenuItem} items={items} />}
          getPopupContainer={(trigerNode) => trigerNode}
          trigger="click"
          className="analytic-header-menu"
          open={isOpen}
          onOpenChange={handleOpenChange}
        >
          <Flex onMouseDown={handleClick} style={{ cursor: 'pointer' }}>
            <MenuIcon />
          </Flex>
        </AnalyticPopover>
      </Flex>
    </ToolHeader>
  );
};
