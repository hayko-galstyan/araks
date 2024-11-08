import { useMutation, useQueryClient } from '@tanstack/react-query';
import { errorMessage } from 'helpers/utils';
import client from '../client';
import { GET_QUERY_BY_PROJECTID } from './use-get-histories';

export const POST_CREATE_HISTORY = '/neo4j/query-history/:id';

type Props = {
  name: string;
  description: string;
  operator: 'AND' | 'OR';
  queryArr: Array<{
    type: string;
    label: string;
    query_history_node_type_id?: string;
    query: {
      delete_type?: {
        query_history_node_property_id?: string;
        type: string;
        action: string;
        multiple: boolean;
        value: '';
      };
    };
  }>;
};
interface QueryCreateResponse {
  id: string;
}

export const useCreateQuery = (id: string) => {
  const queryClient = useQueryClient();
  const urlNodes = POST_CREATE_HISTORY.replace(':id', id);

  const mutation = useMutation<QueryCreateResponse, unknown, Props>(
    (values: Props) => client.post(urlNodes, values).then((data) => data.data),
    {
      onSuccess: () => {
        queryClient.invalidateQueries([GET_QUERY_BY_PROJECTID.replace(':id', id)]);
      },
      onError: errorMessage,
    }
  );

  return mutation;
};
