import React, { useMemo } from 'react';
import { Drawer, Flex, Tooltip } from 'antd';
import { COLORS, ANALYTICS } from 'helpers/constants';
import { Text } from 'components/typography';
import { ReactComponent as LeftIcon } from 'components/icons/left-polygon.svg';
import { ReactComponent as RightIcon } from 'components/icons/right-polygon.svg';
import { useGetAllNodeTypes } from 'api/analytics/use-get-all-nodeTypes';
import { CustomBadge } from '../styles';
import { ACTIONS } from 'context/analytics/reducer';
import { useAnalytics } from 'context/analytics';

const { BARTYPES } = ANALYTICS;
const { MAIN_GRAY } = COLORS;

export const BarTypes: React.FC = () => {
  const { barTypeWidth, handleAction, nodeTypeId, boards } = useAnalytics();
  const { data, isLoading } = useGetAllNodeTypes();

  const isOpen = useMemo(() => barTypeWidth === BARTYPES.WIDTH, [barTypeWidth]);
  const isHasBoards = useMemo(() => !boards.length, [boards]);

  const handleCloseBar = useMemo(
    () => () => {
      handleAction({
        type: ACTIONS.BAR_SIZE_CHANGE,
        payload: { name: 'typeBar' },
      });
    },
    [handleAction]
  );

  const handleSelectNodeType = (node_type_id: string) => {
    handleAction({
      type: ACTIONS.SELECT_NODE_TYPE_ID,
      payload: { id: node_type_id },
    });
  };

  return (
    <Drawer
      getContainer={false}
      title={
        <Flex align="center" gap={16} vertical={!isOpen} style={{ cursor: 'pointer' }}>
          {isOpen ? <LeftIcon onClick={handleCloseBar} /> : <RightIcon onClick={handleCloseBar} />}
          {isOpen && <Text>Types</Text>}
        </Flex>
      }
      loading={isLoading}
      headerStyle={{ height: 50 }}
      width={barTypeWidth}
      open={true}
      placement="right"
      closeIcon={false}
      style={{ background: MAIN_GRAY }}
      mask={false}
      push={false}
      bodyStyle={{ padding: isOpen ? 24 : 5, cursor: isHasBoards ? 'not-allowed' : 'default' }}
    >
      <Flex vertical gap={16} style={{ pointerEvents: isHasBoards ? 'none' : 'auto', opacity: isHasBoards ? 0.5 : 1 }}>
        {data.map((type) => (
          <Tooltip key={type.id} color={type.color} title={type.name} placement="left">
            <Flex
              gap={16}
              align="center"
              onClick={() => handleSelectNodeType(type.id)}
              justify={isOpen ? 'start' : 'center'}
              style={{ background: type.id === nodeTypeId ? `${type.color}20` : 'none', cursor: 'pointer' }}
            >
              <CustomBadge dot title={type.name} color={type.color} />
              {isOpen && <Text>{type.name}</Text>}
            </Flex>
          </Tooltip>
        ))}
      </Flex>
    </Drawer>
  );
};
