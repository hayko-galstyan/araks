import { FC, useMemo } from 'react';
import { Flex } from 'antd';
import { ReactComponent as TasksIcon } from 'components/icons/tasks.svg';
import { JIRA_TASK_LISTS_HEADER_TITLE } from 'components/drawer/tool-set/helpers/constants';
import { Text } from 'components/typography';
import { COLORS } from 'helpers/constants';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';

type TJiraTaskListsHeader = {
  page: number;
  count: number;
  onSetPage: (action: '-' | '+') => void;
};

export const JiraTaskListsHeader: FC<TJiraTaskListsHeader> = ({ page, count, onSetPage }) => {
  const totalPages = useMemo(() => Math.ceil(count / 5), [count]);

  const isNavigationVisible = totalPages > 1;

  return (
    <Flex
      justify="space-between"
      style={{
        background: COLORS.MAIN_GRAY,
        padding: 8,
        borderRadius: 7,
      }}
    >
      <Flex gap={8}>
        <TasksIcon />
        <Text color={COLORS.PRIMARY.BLUE}>{JIRA_TASK_LISTS_HEADER_TITLE}</Text>
      </Flex>
      {isNavigationVisible && (
        <Flex gap={8} align="center">
          <LeftOutlined
            onClick={() => onSetPage('-')}
            style={{ cursor: 'pointer', visibility: page > 1 ? 'visible' : 'hidden' }}
          />
          <Text>
            {page} / {totalPages}
          </Text>
          <RightOutlined
            onClick={() => onSetPage('+')}
            style={{ cursor: 'pointer', visibility: page < totalPages ? 'visible' : 'hidden' }}
          />
        </Flex>
      )}
    </Flex>
  );
};
