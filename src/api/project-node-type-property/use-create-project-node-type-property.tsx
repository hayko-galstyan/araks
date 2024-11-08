import { ApiErrorResponse, ProjectTypePropertyReturnData, RequestTypes } from 'api/types';
import { useMutation, useQueryClient, UseQueryOptions } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';

import client from '../client';
import { GET_PROJECT_NODE_TYPE_PROPERTIES_LIST } from './use-get-project-node-type-properties';
import { ProjectNodeTypePropertySubmit } from 'types/project-node-types-property';
import { URL_NODES_LIST } from '../node/constants';
import { message } from 'antd';

export type MoveProjectToAllFormData = {
  projectId: string;
};

const URL_PROJECT_NODE_TYPE_PROPERTY_CREATE = '/node-type-property/create';
const URL_PROJECT_NODE_TYPE_PROPERTY_UPDATE = '/node-type-property/update/:id';

type ReturnData = {
  data: ProjectTypePropertyReturnData;
};

type Options = UseQueryOptions<ProjectNodeTypePropertySubmit, Error, ReturnData>;

export const useCreateProjectNodeTypeProperty = (options: Options, nodeTypePropertyId?: string) => {
  const params = useParams();
  const queryClient = useQueryClient();

  const mutation = useMutation<ReturnData, ApiErrorResponse, ProjectNodeTypePropertySubmit>({
    mutationFn: (values: ProjectNodeTypePropertySubmit) => {
      const url = values.propertyId
        ? URL_PROJECT_NODE_TYPE_PROPERTY_UPDATE.replace(':id', values.propertyId || '')
        : URL_PROJECT_NODE_TYPE_PROPERTY_CREATE;
      const type = values.propertyId ? RequestTypes.Put : RequestTypes.Post;
      const body = {
        ...values,
        project_id: params.id,
        propertyId: undefined,
      };
      return client[type](url, body);
    },
    onSuccess: (data, variables, context) => {
      queryClient.invalidateQueries([
        GET_PROJECT_NODE_TYPE_PROPERTIES_LIST.replace(':node_type_id', data.data.project_type_id || ''),
      ]);
      queryClient.invalidateQueries([
        URL_NODES_LIST.replace(':project_id', params.id || '').replace(
          ':project_type_id',
          data.data.project_type_id || ''
        ),
      ]);
      options?.onSuccess?.(data);
    },
    onError: (error: ApiErrorResponse) => {
      const errorMessage = error?.response?.data?.errors?.message || 'An unexpected error occurred';

      message.error(errorMessage);
    },
  });

  return mutation;
};