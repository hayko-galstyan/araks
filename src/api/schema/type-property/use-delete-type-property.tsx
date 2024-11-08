import { useMutation, useQueryClient, UseQueryOptions } from '@tanstack/react-query';

import client from 'api/client';
import { GET_TYPES } from '../type/use-get-types';
import { errorMessage } from 'helpers/utils';
import { useParams } from 'react-router-dom';
import { useIsTemplateEditPage } from 'hooks/use-is-template-page';
import { GET_TEMPLATE } from '../../project-templates/use-get-template-by-id';

const URL_PROJECT_NODE_TYPE_PROPERTY_DELETE = '/node-type-property/delete/:id';
const URL_TEMPLATE_NODE_TYPE_PROPERTY_DELETE = '/templates/node-type-property/:id';

export const useDeleteTypeProperty = (nodeTypePropertyId = '', options?: UseQueryOptions) => {
  const isTemplateEditPage = useIsTemplateEditPage();

  const params = useParams();
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: () =>
      client.delete(
        isTemplateEditPage
          ? URL_TEMPLATE_NODE_TYPE_PROPERTY_DELETE.replace(':id', nodeTypePropertyId)
          : URL_PROJECT_NODE_TYPE_PROPERTY_DELETE.replace(':id', nodeTypePropertyId)
      ),
    onSuccess: (data, variables, context) => {
      if (isTemplateEditPage) {
        queryClient.invalidateQueries([GET_TEMPLATE.replace(':id', params.id ?? '')]);
      } else {
        queryClient.invalidateQueries([GET_TYPES.replace(':project_id', params.id || '')]);
      }
      options?.onSuccess?.(data);
    },
    onError: errorMessage,
  });
  return mutation;
};
