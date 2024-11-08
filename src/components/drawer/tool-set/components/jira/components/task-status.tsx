import { FC } from 'react';
import { Flex } from 'antd';
import { useJira } from '../context';
import { Text } from 'components/typography';
import { COLORS } from 'helpers/constants';

export const TaskStatus: FC<{ status: string }> = ({ status }) => {
  const { generationWithStatusColor } = useJira();

  const statusColor = generationWithStatusColor(status);

  return (
    <Flex style={{ background: statusColor, width: '120px', borderRadius: '4px', padding: '3px 6px' }}>
      <Text color={COLORS.PRIMARY.WHITE} style={{ fontWeight: 400 }}>
        {status}
      </Text>
    </Flex>
  );
};
