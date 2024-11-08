import { ApiErrorResponse, RequestTypes } from 'api/types';
import { useMutation, useQueryClient, UseMutationOptions } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { ProjectNodeTypeResponse, ProjectNodeTypeSubmit } from 'types/project-node-types';

import client from '../client';
import { GET_PROJECT_NODE_TYPES_LIST, GET_PROJECT_NODE_TYPES_LIST_LEFT_MENU } from './use-get-project-note-types';
import { message } from 'antd';

export type MoveProjectToAllFormData = {
  projectId: string;
};

const URL_PROJECT_NODE_TYPES_CREATE = '/projects-node-types/create';
const URL_PROJECT_NODE_TYPES_UPDATE = '/projects-node-types/update/:id';

type ReturnData = {
  data: ProjectNodeTypeResponse;
};

type Options = UseMutationOptions<ReturnData, Error, ProjectNodeTypeSubmit>;

export const useCreateProjectNodeType = (options: Options, nodeTypeId?: string) => {
  const params = useParams();
  const url = nodeTypeId
    ? URL_PROJECT_NODE_TYPES_UPDATE.replace(':id', nodeTypeId || '')
    : URL_PROJECT_NODE_TYPES_CREATE;
  const queryClient = useQueryClient();

  const mutation = useMutation<ReturnData, ApiErrorResponse, ProjectNodeTypeSubmit>({
    mutationFn: ({ parent_id, ...values }: ProjectNodeTypeSubmit) => {
      const type = nodeTypeId ? RequestTypes.Put : RequestTypes.Post;
      const body = nodeTypeId
        ? { ...values, ...{ parent_id: parent_id || null } }
        : { ...values, project_id: params.id, parent_id };
      return client[type](url, body);
    },
    onSuccess: (data: ReturnData, variables: ProjectNodeTypeSubmit, context: unknown) => {
      queryClient.invalidateQueries([GET_PROJECT_NODE_TYPES_LIST.replace(':project_id', params.id || '')]);
      queryClient.invalidateQueries([GET_PROJECT_NODE_TYPES_LIST_LEFT_MENU.replace(':project_id', params.id || '')]);

      options?.onSuccess?.(data, variables, context);
    },
    onError: (error: ApiErrorResponse) => {
      const errorMessage = error?.response?.data?.errors?.message || 'An unexpected error occurred';

      message.error(errorMessage);
    },
  });

  return mutation;
};