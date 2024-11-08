import { Flex, Typography } from 'antd';
import { Text } from 'components/typography';
import { FC } from 'react';
import { TaskStatus } from './task-status';
import { useJira } from '../context';
import { IJiraTaskItem } from 'types/jira-integration';
import { ReactComponent as Delete } from 'components/icons/delete.svg';
import { COLORS } from 'helpers/constants';
import { useDeleteIssueById } from 'api/jira/use-delete-issue-by-id';
import { useQueryClient } from '@tanstack/react-query';
import { GET_PROJECTS_TASKS } from 'api/jira/constant';

const { Paragraph } = Typography;

export const TaskList: FC<IJiraTaskItem> = (params) => {
  const { issue_key, issue_id, status_name, name, url, deleted_at, node_id } = params;
  const queryClient = useQueryClient();

  const { navigateIssueJira } = useJira();

  const handleIssueClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (url) {
      navigateIssueJira(url, issue_key);
    }
  };

  const { mutate: deleteIssue } = useDeleteIssueById();

  const handleClearTask = (e: React.MouseEvent) => {
    e.stopPropagation();
    deleteIssue(node_id, {
      onSuccess: () => {
        queryClient.invalidateQueries([GET_PROJECTS_TASKS]);
      },
    });
  };

  return (
    <Flex
      vertical
      gap={8}
      key={issue_id}
      style={{
        width: '100%',
        cursor: 'pointer',
        background: deleted_at ? COLORS.PRIMARY.SILVER_LIGHT : COLORS.PRIMARY.WHITE,
        padding: '16px 8px',
        position: 'relative',
      }}
    >
      <Flex gap={16} align="center">
        <Text style={{ cursor: 'pointer', fontWeight: '400', fontSize: '20px' }} onClick={handleIssueClick}>
          {issue_key}
        </Text>
        <TaskStatus status={status_name} />
      </Flex>
      <Paragraph style={{ fontWeight: 'bold', fontSize: '20px' }} ellipsis={{ rows: 1 }}>
        Node Name - {name}
      </Paragraph>
      {deleted_at && (
        <Flex
          style={{
            position: 'absolute',
            top: 0,
            right: 0,
            left: 0,
            bottom: 0,
            justifyContent: 'flex-end',
            alignItems: 'center',
            paddingRight: '16px',
            cursor: 'pointer',
          }}
        >
          <Delete onClick={handleClearTask} />
        </Flex>
      )}
    </Flex>
  );
};
