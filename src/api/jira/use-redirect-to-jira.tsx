import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import client from '../client';
import { useParams } from 'react-router-dom';
import { JIRA_REDIRECT_URL } from './constant';

type Options = UseQueryOptions<
  {
    data: { url: string };
  },
  Error,
  {
    data: { url: string };
  }
>;

export const useRedirectToJira = (options?: Options) => {
  const { id } = useParams();
  const url = JIRA_REDIRECT_URL.replace(':id', id ?? '');
  const result = useQuery({
    queryKey: [url],
    queryFn: () => client.get(url),
    ...options,
  });
  const { data, isSuccess } = result;
  return {
    ...result,
    data: isSuccess ? data : [],
  };
};
