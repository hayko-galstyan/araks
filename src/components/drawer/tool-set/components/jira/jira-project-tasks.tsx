import { FC, useCallback, useMemo, useState } from 'react';
import { ReactComponent as JiraIntegrationSuccessSvg } from '../../icons/jira-integration-success.svg';
import { useGetProjectTasks } from 'api/jira/use-get-projects-tasks';
import { Flex, Skeleton } from 'antd';
import { COLORS } from 'helpers/constants';
import { Text } from 'components/typography';
import { useJira } from './context';
import { JiraTaskListsHeader, TaskList } from './components';

export const JiraProjectTasks: FC<{ projectName: string }> = ({ projectName }) => {
  const [page, setIsPage] = useState(1);

  const { setOpenViewJira, setNodeId } = useJira();

  const {
    data: tasks,
    isLoading,
    isSuccess,
  } = useGetProjectTasks({
    page: page,
    size: 5,
  });

  const handleClickTask = useCallback(
    (node_id: string) => {
      setOpenViewJira('task');
      setNodeId(node_id);
    },
    [setOpenViewJira, setNodeId]
  );

  const changeCurrentPage = (action: string) => setIsPage((prev) => eval(prev + action + 1));

  const taskItems = useMemo(
    () =>
      tasks?.data?.map((item) => (
        <Flex
          onClick={() => handleClickTask(item?.node_id)}
          key={item?.id}
          style={{ margin: '16px', borderBottom: `1px solid ${COLORS.PRIMARY.GRAY}` }}
        >
          <TaskList {...item} url={tasks?.url} />
        </Flex>
      )),
    [tasks?.data, tasks?.url, handleClickTask]
  );

  return (
    <>
      <Flex vertical justify="center" align="center" style={{ width: '100%' }}>
        <Text style={{ fontSize: '16px' }}>{projectName}</Text>
        <JiraIntegrationSuccessSvg />
      </Flex>
      <Flex
        vertical
        style={{
          width: '100%',
          minHeight: '400px',
          border: `1px solid ${COLORS.MAIN_GRAY_SILVER}`,
          borderRadius: '7px',
        }}
      >
        <JiraTaskListsHeader page={page} count={tasks.count} onSetPage={changeCurrentPage} />
        <Skeleton loading={isLoading} />
        {isSuccess && taskItems}
      </Flex>
    </>
  );
};
