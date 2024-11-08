import { useParams } from 'react-router-dom';
import { useMutation, useQueryClient, UseQueryOptions } from '@tanstack/react-query';
import { ApiErrorResponse, RequestTypes } from 'api/types';
import client from 'api/client';
import { ProjectEdgeResponse } from 'types/project-edge';
import { GET_EDGES } from './use-get-edges';
import { GET_TYPES } from '../type/use-get-types';
import { NodeEdgeTypesSubmit } from 'types/node-edge-types';
import { GET_TEMPLATE } from '../../project-templates/use-get-template-by-id';
import { useIsTemplateEditPage } from 'hooks/use-is-template-page';
import { message } from 'antd';

const URL_PROJECT_EDGE_CREATE = '/projects-edge-type/create';
const URL_PROJECT_EDGE_UPDATE = '/projects-edge-type/update/:id';

const URL_TEMPLATE_PROJECT_EDGE_CREATE = 'templates/edge-type';
const URL_TEMPLATE_PROJECT_EDGE_UPDATE = 'templates/edge-type/:id';

type ReturnData = {
  data: ProjectEdgeResponse;
};

type Options = UseQueryOptions<NodeEdgeTypesSubmit, Error, ReturnData>;

export const useCreateEdge = (id?: string, options?: Options) => {
  const params = useParams();
  const queryClient = useQueryClient();
  const isTemplateEditPage = useIsTemplateEditPage();

  const mutation = useMutation<ReturnData, ApiErrorResponse, ProjectEdgeResponse>({
    mutationFn: ({ id, ...values }: ProjectEdgeResponse) => {
      const url = id ? URL_PROJECT_EDGE_UPDATE.replace(':id', id || '') : URL_PROJECT_EDGE_CREATE;
      const urlTemplate = id
        ? URL_TEMPLATE_PROJECT_EDGE_UPDATE.replace(':id', id || '')
        : URL_TEMPLATE_PROJECT_EDGE_CREATE;

      const type = id ? RequestTypes.Put : RequestTypes.Post;

      const body = { ...values };

      if (!id && !isTemplateEditPage) {
        body.project_id = params.id;
      }

      if (isTemplateEditPage) {
        body.template_id = params.id;
      }

      const { project_id, ...templateParams } = values;

      return client[type](isTemplateEditPage ? urlTemplate : url, values.template_id ? templateParams : body);
    },
    onSuccess: (data) => {
      if (data.data.template_id) {
        queryClient.invalidateQueries([GET_TEMPLATE.replace(':id', data.data.template_id)]);
      } else {
        queryClient.invalidateQueries([GET_TYPES.replace(':project_id', params.id || '')]);
        queryClient.invalidateQueries([GET_EDGES.replace(':project_id', params.id || '')]);
      }

      options?.onSuccess?.(data);
    },
    onError: (error: ApiErrorResponse) => {
      const errorMessage = error?.response?.data?.errors?.message || 'An unexpected error occurred';

      message.error(errorMessage);
    },
  });
  return mutation;
};
