import { useQuery } from '@tanstack/react-query';
import client from '../client';
import { IJiraStatus } from 'types/jira-integration';
import { GET_JIRA_ISSUE_STATUSES } from './constant';

type Result = {
  data: IJiraStatus[];
};

export const useGetJiraStatuses = (nodeId: string, options = { enabled: false }): Result => {
  const url = GET_JIRA_ISSUE_STATUSES.replace(':nodeId', nodeId ?? '');

  const result = useQuery({
    queryKey: [url],
    queryFn: () => client.get(url),
    ...options,
    select: (data) => data.data,
  });
  const { data, isSuccess } = result;
  return {
    ...result,
    data: isSuccess ? data : [],
  };
};
