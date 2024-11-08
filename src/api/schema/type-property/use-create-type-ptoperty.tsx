import { ProjectTypePropertyReturnData, RequestTypes } from 'api/types';
import { useMutation, useQueryClient, UseQueryOptions } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';

import client from 'api/client';
import { ProjectNodeTypePropertySubmit } from 'types/project-node-types-property';
import { GET_TYPES } from '../type/use-get-types';
import { errorMessage } from 'helpers/utils';
import { GET_PROJECT_NODE_TYPE_PROPERTY } from '../../project-node-type-property/use-get-project-node-type-property';
import { useIsTemplateEditPage } from '../../../hooks/use-is-template-page';
import { GET_TEMPLATE } from '../../project-templates/use-get-template-by-id';

const URL_PROJECT_NODE_TYPE_PROPERTY_CREATE = '/node-type-property/create';
const URL_PROJECT_NODE_TYPE_PROPERTY_UPDATE = '/node-type-property/update/:id';

const URL_TEMPLATE_NODE_TYPE_PROPERTY_CREATE = '/templates/node-type-property';
const URL_TEMPLATE_NODE_TYPE_PROPERTY_UPDATE = '/templates/node-type-property/:id';

type ReturnData = {
  data: ProjectTypePropertyReturnData;
};

type Options = UseQueryOptions<ProjectNodeTypePropertySubmit, Error, ReturnData>;

export const useCreateTypeProperty = (options: Options, nodeTypePropertyId?: string) => {
  const params = useParams();
  const isTemplateEditPage = useIsTemplateEditPage();
  const queryClient = useQueryClient();

  const mutation = useMutation<ReturnData, unknown, ProjectNodeTypePropertySubmit>({
    mutationFn: (values: ProjectNodeTypePropertySubmit) => {
      const type = values.propertyId ? RequestTypes.Put : RequestTypes.Post;

      const url = values.propertyId
        ? URL_PROJECT_NODE_TYPE_PROPERTY_UPDATE.replace(':id', values.propertyId || '')
        : URL_PROJECT_NODE_TYPE_PROPERTY_CREATE;

      const urlTemplate = values.propertyId
        ? URL_TEMPLATE_NODE_TYPE_PROPERTY_UPDATE.replace(':id', values.propertyId || '')
        : URL_TEMPLATE_NODE_TYPE_PROPERTY_CREATE;

      const { propertyId, ...data } = values;

      const body = {
        ...data,
        project_id: params.id,
      };

      return client[type](
        isTemplateEditPage ? urlTemplate : url,
        isTemplateEditPage ? { template_node_type_id: body.project_type_id, ...data } : body
      );
    },
    onSuccess: (data, variables, context) => {
      if (isTemplateEditPage) {
        queryClient.invalidateQueries([GET_TEMPLATE.replace(':id', params.id || '')]);
      } else {
        queryClient.invalidateQueries([GET_TYPES.replace(':project_id', params.id || '')]);

        queryClient.invalidateQueries([
          GET_PROJECT_NODE_TYPE_PROPERTY.replace(':type_property_id', nodeTypePropertyId || ''),
        ]);
      }

      options?.onSuccess?.(data);
    },
    onError: errorMessage,
  });
  return mutation;
};
