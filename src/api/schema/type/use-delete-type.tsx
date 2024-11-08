import { useMutation, useQueryClient, UseQueryOptions } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';

import client from '../../client';
import { GET_TYPES } from './use-get-types';
import { GET_EDGES } from '../edge/use-get-edges';
import { errorMessage } from 'helpers/utils';
import { useIsTemplateEditPage } from '../../../hooks/use-is-template-page';
import { GET_TEMPLATE } from '../../project-templates/use-get-template-by-id';

const URL_PROJECT_NODE_TYPES_DELETE = '/projects-node-types/delete/:id';
const URL_TEMPLATE_NODE_TYPES_DELETE = '/templates/node-type/:id';

export const useDeleteType = (options: UseQueryOptions) => {
  const isTemplateEditPage = useIsTemplateEditPage();
  const params = useParams();
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (nodeTypeId: string) =>
      client.delete(
        isTemplateEditPage
          ? URL_TEMPLATE_NODE_TYPES_DELETE.replace(':id', nodeTypeId)
          : URL_PROJECT_NODE_TYPES_DELETE.replace(':id', nodeTypeId)
      ),
    onSuccess: (data, variables, context) => {
      if (isTemplateEditPage) {
        queryClient.invalidateQueries([GET_TEMPLATE.replace(':id', params?.id ?? '')]);
      } else {
        queryClient.invalidateQueries([GET_TYPES.replace(':project_id', params.id || '')]);
        queryClient.invalidateQueries([GET_EDGES.replace(':project_id', params.id || '')]);
      }

      options?.onSuccess?.(data);
    },
    onError: errorMessage,
  });
  return mutation;
};
