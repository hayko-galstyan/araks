import { Flex, Skeleton, Typography } from 'antd';
import { useGetJiraIssue } from 'api/jira/use-get-issue';
import { Text } from 'components/typography';
import { COLORS } from 'helpers/constants';
import { FC, useEffect, useMemo } from 'react';
import { TaskViewHeader } from './header/task-view-header';
import { TaskViewDetails } from './task-view-details';
import { useJira } from '../context';
import { IJiraTaskItem } from 'types/jira-integration';

const { Paragraph } = Typography;

export const TaskView: FC = () => {
  const { node_id, setOpenViewJira } = useJira();

  const {
    data: jiraIssue,
    isLoading,
    isSuccess,
  } = useGetJiraIssue(node_id ?? '', {
    enabled: !!node_id,
  });

  useEffect(() => {
    if (isSuccess) {
      setOpenViewJira(jiraIssue?.jiraTask ? 'task' : 'edit');
    }
  }, [jiraIssue, setOpenViewJira, isSuccess]);

  const jiraTask = useMemo(() => jiraIssue?.jiraTask, [jiraIssue]);

  if (isLoading) return <Skeleton loading={true} />;

  if (!isSuccess || !jiraTask) return null;

  const { issue_key, node_id: jiraNodeId, name, description, deleted_at } = jiraTask;

  return (
    <>
      <TaskViewHeader title={issue_key} isDeleted={!deleted_at} url={jiraIssue.url} node_id={jiraNodeId} type="list" />
      <Flex vertical gap={18} style={{ width: '100%', opacity: deleted_at ? 0.4 : 1 }}>
        <Text style={{ fontSize: '20px', fontWeight: 'bold' }}>{name}</Text>
        <Flex vertical gap={6}>
          <Text color={COLORS.PRIMARY.BLUE} style={{ fontSize: '16px' }}>
            Description
          </Text>
          <Paragraph ellipsis={{ rows: 5 }}>{description}</Paragraph>
        </Flex>
        <TaskViewDetails {...(jiraTask as IJiraTaskItem)} />
      </Flex>
    </>
  );
};
