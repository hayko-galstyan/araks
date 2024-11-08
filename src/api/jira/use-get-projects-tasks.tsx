import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import client from 'api/client';
import { GET_PROJECTS_TASKS } from './constant';
import { IJiraTasksData, TUseGetProjectTasks } from 'types/jira-integration';

export const useGetProjectTasks: TUseGetProjectTasks = (params, options) => {
  const { id: project_id } = useParams();
  const results = useQuery({
    queryKey: [GET_PROJECTS_TASKS, params],
    ...options,
    queryFn: () => client.get(GET_PROJECTS_TASKS.replace(':id', project_id ?? ''), { params }),
  });

  const { data, isSuccess, isLoading } = results;

  return {
    data: isSuccess ? data : ({} as IJiraTasksData),
    isSuccess,
    isLoading,
  };
};
