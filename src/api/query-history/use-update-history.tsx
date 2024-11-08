import { useMutation, useQueryClient} from '@tanstack/react-query';
import { errorMessage } from 'helpers/utils';
import client from '../client';
import { GET_QUERY_BY_PROJECTID } from './use-get-histories';
import { GET_QUERY_BY_QUERYID } from './use-get-histories-by-id';
import { ProjectEdgeResponse } from 'types/project-edge';

export const POST_UPDATE_HISTORY = '/neo4j/query-history/:project_id/:query_id';

type Props = {
  name: string;
  description: string;
  operator: 'AND' | 'OR';
  queryArr: Array<{
    type: string;
    label: string;
    query_history_node_type_id?: string;
    query: {
      delete_type ?: {
        query_history_node_property_id?: string;
        type: string;
        action: string;
        multiple: boolean;
        value: '';
      };
    };
  }>;
}

export const useUpdateQuery = (projectID:string,queryID: string) => {
  const queryClient = useQueryClient();
  const urlNodes = POST_UPDATE_HISTORY.replace(':project_id', projectID).replace(':query_id', queryID);

const mutation = useMutation<ProjectEdgeResponse, unknown, Props>(
    (values: Props) => client.put(urlNodes, values).then((data) => data.data),
    {
      onSuccess: () => {
        queryClient.invalidateQueries([GET_QUERY_BY_PROJECTID.replace(':id', projectID)]);
        queryClient.invalidateQueries([GET_QUERY_BY_QUERYID.replace(':id', queryID).replace(':project_id',projectID)]);
      },
      onError: errorMessage,
    }
  );

  return mutation;
};
