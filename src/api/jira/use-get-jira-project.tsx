import { useQuery } from '@tanstack/react-query';
import client from '../client';
import { useParams } from 'react-router-dom';
import { IJiraProject } from 'types/jira-integration';
import { GET_JIRA_PROJECT } from './constant';

type Result = {
  data: Array<IJiraProject>;
};

export const useGetJiraProject = (options = { enabled: true }): Result => {
  const params = useParams();

  const result = useQuery({
    queryKey: [GET_JIRA_PROJECT, params],
    queryFn: () => client.get(GET_JIRA_PROJECT),
    ...options,
    select: (data) => data.data,
  });
  const { data, isSuccess } = result;
  return {
    ...result,
    data: isSuccess ? data : [],
  };
};
