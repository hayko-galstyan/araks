import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { errorMessage } from 'helpers/utils';
import client from '../client';

export const GET_QUERY_BY_PROJECTID = '/neo4j/query-history/:id';

type ReturnData = {
  data: Array<{
    id: string;
    name: string | undefined;
    description: string | undefined;
    operator: 'AND' | 'OR';
    status: 'valid';
    updated_at: string;
    queryArr: Array<{
      label: string;
      action: 'IS_NOT_NULL' | 'IS_NULL';
      type: 'node';
      query_history_node_type_id: string | null;
      query_history_edge_type_id: string | null;
      project_edge_type_id: string | null;
      status: 'valid';
      // query: {},
    }>;
  }>;
};

type Options = UseQueryOptions<{ id: string }, Error, ReturnData>;

export const useGetQueryByProjectId = (id: string, options?: Options) => {
  const urlNodes = GET_QUERY_BY_PROJECTID.replace(':id', id);
  const result = useQuery({
    queryKey: [urlNodes],
    queryFn: () => client.get(urlNodes),
    onSuccess: (data) => {
      options?.onSuccess?.(data);
    },
    enabled: options?.enabled,
    onError: errorMessage,
  });

  return result.data?.data;
};
