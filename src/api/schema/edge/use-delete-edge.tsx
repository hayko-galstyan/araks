import { useMutation, useQueryClient, UseQueryOptions } from '@tanstack/react-query';
import client from 'api/client';
import { useParams } from 'react-router-dom';
import { GET_EDGES } from './use-get-edges';
import { errorMessage } from 'helpers/utils';
import { useIsTemplateEditPage } from 'hooks/use-is-template-page';
import { GET_TEMPLATE } from '../../project-templates/use-get-template-by-id';

const URL_PROJECT_NODE_TYPES_DELETE = '/projects-edge-type/delete/:id';
const URL_TEMPLATE_NODE_TYPES_DELETE = '/templates/edge-type/:id';

export const useDeleteEdge = (options: UseQueryOptions) => {
  const params = useParams();
  const queryClient = useQueryClient();
  const isTemplateEditPage = useIsTemplateEditPage();

  const mutation = useMutation({
    mutationFn: (edgeTypeId: string) =>
      client.delete(
        isTemplateEditPage
          ? URL_TEMPLATE_NODE_TYPES_DELETE.replace(':id', edgeTypeId)
          : URL_PROJECT_NODE_TYPES_DELETE.replace(':id', edgeTypeId)
      ),
    onSuccess: (data, variables, context) => {
      options?.onSuccess?.(data);

      if (isTemplateEditPage) {
        queryClient.invalidateQueries([GET_TEMPLATE.replace(':id', params?.id ?? '')]);
      } else {
        queryClient.invalidateQueries([GET_EDGES.replace(':project_id', params.id || '')]);
      }
    },
    onError: errorMessage,
  });
  return mutation;
};
