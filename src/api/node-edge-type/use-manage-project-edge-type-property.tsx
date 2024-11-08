import { ApiErrorResponse, ProjectTypePropertyReturnData, RequestTypes } from 'api/types';
import { useMutation, useQueryClient, UseQueryOptions } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';

import client from '../client';
import { GET_PROJECT_EDGE_TYPE_PROPERTIES_LIST, GET_TEMPLATE_EDGE_TYPE_PROPERTIES_LIST } from './use-get-projects-edge-type-properties';
import { NodeEdgeTypePropertiesSubmit } from 'types/node-edge-types';
import { URL_EDGES_NODE_DATA } from 'api/edges/constants';
import { useIsTemplateEditPage } from '../../hooks/use-is-template-page';
import { message } from 'antd';

const URL_PROJECT_EDGE_TYPE_PROPERTY_CREATE = '/edge-type-property/create';
const URL_PROJECT_EDGE_TYPE_PROPERTY_UPDATE = '/edge-type-property/update/:id';

const URL_TEMPLATE_EDGE_TYPE_PROPERTY_CREATE = '/templates/edge-type-property';
const URL_TEMPLATE_EDGE_TYPE_PROPERTY_UPDATE = '/templates/edge-type-property/:id';

type ReturnData = {
  data: ProjectTypePropertyReturnData;
};

type Options = UseQueryOptions<NodeEdgeTypePropertiesSubmit, Error, ReturnData>;

export const useManageProjectNodeTypeProperty = (options?: Options) => {
  const params = useParams();
  const queryClient = useQueryClient();
  const isTemplateEditPage = useIsTemplateEditPage();

  const mutation = useMutation<ReturnData, ApiErrorResponse, NodeEdgeTypePropertiesSubmit>({
    mutationFn: (values: NodeEdgeTypePropertiesSubmit) => {
      const url = values.propertyId
        ? URL_PROJECT_EDGE_TYPE_PROPERTY_UPDATE.replace(':id', values.propertyId || '')
        : URL_PROJECT_EDGE_TYPE_PROPERTY_CREATE;

      const urlTemplate = values.propertyId
        ? URL_TEMPLATE_EDGE_TYPE_PROPERTY_UPDATE.replace(':id', values.propertyId || '')
        : URL_TEMPLATE_EDGE_TYPE_PROPERTY_CREATE;

      const type = values.propertyId ? RequestTypes.Put : RequestTypes.Post;
      const body = {
        ...values,
        project_id: params.id,
      };

      const { project_type_id, ...templateBody } = values;

      return client[type](
        isTemplateEditPage ? urlTemplate : url,
        isTemplateEditPage ? { template_edge_type_id: project_type_id, ...templateBody } : body
      );
    },
    onSuccess: (data, variables, context) => {
      if (isTemplateEditPage) {
        queryClient.invalidateQueries([
          GET_TEMPLATE_EDGE_TYPE_PROPERTIES_LIST.replace(':edge_type_id', data.data.template_edge_type_id || ''),
        ]);
      } else {
        queryClient.invalidateQueries([
          GET_PROJECT_EDGE_TYPE_PROPERTIES_LIST.replace(':edge_type_id', data.data.project_type_id || ''),
        ]);
        queryClient.invalidateQueries([
          URL_EDGES_NODE_DATA.replace(':edge_type_id', data.data.project_type_id || '').replace(
            ':project_id',
            params.id || ''
          ),
        ]);
      }
      options?.onSuccess?.(data);
    },
   onError: (error: ApiErrorResponse) => {
      const errorMessage = error?.response?.data?.errors?.message || 'An unexpected error occurred';
      message.error(errorMessage,3);
    },
  });
  return mutation;
};
