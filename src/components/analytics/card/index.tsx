import { Flex } from 'antd';
import { useAnalytics } from 'context/analytics';
import React from 'react';
import { DraggingContainer } from '../dragging';
import { Text } from 'components/typography';
import { valueFormatter } from '../util';

export const Card: React.FC<{ id: string }> = ({ id }) => {
  const { tools, activeBoard } = useAnalytics();
  const selectedTool = tools[activeBoard][id];

  const { data, color, width, height } = selectedTool;

  const textAnimationStyle = {
    fontSize: 42,
    color: color,
    animation: 'fadeIn 3s ease-in-out',
  };

  return (
    <DraggingContainer containerKey={id}>
      <Flex align="center" justify="center" style={{ width: width, height: height }}>
        <Text style={textAnimationStyle}>
          {data[0]?.card ? valueFormatter(data?.[0]?.card?.toString(), width - 50) : 'No Data'}
        </Text>
      </Flex>
    </DraggingContainer>
  );
};
