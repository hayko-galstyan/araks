import { useQuery } from '@tanstack/react-query';
import client from '../client';
import { useParams } from 'react-router-dom';
import { IJiraUsers } from 'types/jira-integration';
import { GET_JIRA_USERS } from './constant';

type Result = {
  data: IJiraUsers;
};

export const useGetJiraUsers = (options = { enabled: true }): Result => {
  const params = useParams();

  const url = GET_JIRA_USERS.replace(':projectID', params?.id ?? '');

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
