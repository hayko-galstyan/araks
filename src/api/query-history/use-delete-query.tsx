import { useMutation, useQueryClient } from '@tanstack/react-query';
import { GET_QUERY_BY_PROJECTID } from './use-get-histories';
import client from '../client';
import { errorMessage } from 'helpers/utils';
export const TEMPLATE_DELETE_URL = '/neo4j/query-history/:project_id/:id';
type ReturnType = {
  message: string;
};

type Props = {
  projectId: string;
  queryId: string;
};

export const useDeleteQueryHistoey = ({ projectId, queryId }: Props) => {
  const queryClient = useQueryClient();
  const urlNodes = TEMPLATE_DELETE_URL.replace(':project_id', projectId).replace(':id', queryId);
  const mutation = useMutation<ReturnType>({
    mutationFn: () => client.delete(urlNodes),
    onSuccess: (data, variables, context) => {
      queryClient.invalidateQueries([GET_QUERY_BY_PROJECTID.replace(':id', projectId)]);
    },
    onError: errorMessage,
  });
  return mutation;
};
