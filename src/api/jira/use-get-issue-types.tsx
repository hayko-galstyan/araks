import { useQuery } from '@tanstack/react-query';
import client from '../client';
import { useParams } from 'react-router-dom';
import { IJiraIssueTypes } from 'types/jira-integration';
import { GET_JIRA_ISSUE_TYPES } from './constant';

type Result = {
  data: Array<IJiraIssueTypes>;
};

export const useGetIssueTypes = (options = { enabled: true }): Result => {
  const params = useParams();

  const url = GET_JIRA_ISSUE_TYPES.replace(':projectID', params?.id ?? '');

  const result = useQuery({
    queryKey: [url, params],
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
