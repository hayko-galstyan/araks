import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { errorMessage } from 'helpers/utils';
import client from '../client';

export const GET_QUERY_BY_QUERYID = '/neo4j/query-history/:project_id/:id';

export type ReturQuerynData = {
  data: {
    id: string;
    name: string | undefined;
    description: string | undefined;
    operator: 'AND' | 'OR';
    status: 'valid'|'invalid';
    updated_at: string;
    queryArr: Array<{
      label: string;
      action: string;
      type: string,
      query_history_node_type_id: string | null;
      query_history_edge_type_id: string | null;
      project_edge_type_id: string | null;
      status: 'valid'|'invalid';
      query: {
        [key:string]:{
          name: string;
          action: string; 
          multiple: boolean;
          type: string
          value: string;
          query_history_node_property_id: string | null;
          query_history_edge_property_id: string | null;
          status: 'valid'|'invalid';
        }

      }
    }>;

  };
};

type Options = UseQueryOptions<{ projectID: string, queryid:string }, Error, ReturQuerynData>;

export const useGetQueryByid = (projectID: string, queryid:string, options?: Options) => {
  const urlNodes = GET_QUERY_BY_QUERYID.replace(':id', queryid).replace(':project_id',projectID);
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
