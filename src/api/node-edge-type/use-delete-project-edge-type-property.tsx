import { useMutation, useQueryClient, UseQueryOptions } from '@tanstack/react-query';
import { errorMessage } from 'helpers/utils';

import client from '../client';
import {
  GET_PROJECT_EDGE_TYPE_PROPERTIES_LIST,
  GET_TEMPLATE_EDGE_TYPE_PROPERTIES_LIST,
} from './use-get-projects-edge-type-properties';
import { useIsTemplateEditPage } from 'hooks/use-is-template-page';

const URL_PROJECT_EDGE_TYPE_PROPERTY_DELETE = '/edge-type-property/delete/:id';
const URL_TEMPLATE_EDGE_TYPE_PROPERTY_DELETE = '/templates/edge-type-property/:id';

export const useDeleteProjectEdgeTypeProperty = (
  nodeTypePropertyId: string,
  nodeTypeId: string,
  options?: UseQueryOptions
) => {
  const queryClient = useQueryClient();
  const isTemplateEditPage = useIsTemplateEditPage();

  const mutation = useMutation({
    mutationFn: () =>
      client.delete(
        isTemplateEditPage
          ? URL_TEMPLATE_EDGE_TYPE_PROPERTY_DELETE.replace(':id', nodeTypePropertyId)
          : URL_PROJECT_EDGE_TYPE_PROPERTY_DELETE.replace(':id', nodeTypePropertyId)
      ),
    onSuccess: (data, variables, context) => {
      if (isTemplateEditPage) {
        queryClient.invalidateQueries([
          GET_TEMPLATE_EDGE_TYPE_PROPERTIES_LIST.replace(':edge_type_id', nodeTypeId ?? ''),
        ]);
      } else {
        queryClient.invalidateQueries([GET_PROJECT_EDGE_TYPE_PROPERTIES_LIST.replace(':edge_type_id', nodeTypeId)]);
      }
      options?.onSuccess?.(data);
    },
    onError: errorMessage,
  });
  return mutation;
};
