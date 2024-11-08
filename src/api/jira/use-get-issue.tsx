import { useQuery } from '@tanstack/react-query';
import client from '../client';
import { IJiraIssue } from 'types/jira-integration';
import { GET_JIRA_ISSUE } from './constant';

type Result = {
  data: IJiraIssue;
  isLoading: boolean;
  isSuccess: boolean;
};

export const useGetJiraIssue = (nodeId: string, options = { enabled: false }): Result => {
  const url = GET_JIRA_ISSUE.replace(':nodeId', nodeId ?? '');

  const result = useQuery({
    queryKey: [url, nodeId],
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
