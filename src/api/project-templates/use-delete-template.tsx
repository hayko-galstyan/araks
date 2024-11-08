import { useMutation, useQueryClient } from '@tanstack/react-query';
import { GET_TEMPLATES_MY } from './use-get-templates-my';
import client from '../client';
import { errorMessage } from 'helpers/utils';
export const TEMPLATE_DELETE_URL = 'templates/:id';
export const SHARED_PROJECT_DELETE_URL = 'shared/delete/:id';

type ReturnType = {
    message: string;
};

type Props = {
  projectId: string;
  url?: string;
};

export const useDeleteTemplate = ({ projectId, url = TEMPLATE_DELETE_URL }: Props) => {
  const queryClient = useQueryClient();
  const mutation = useMutation<ReturnType>({
    mutationFn: () => client.delete(url.replace(':id', projectId)),
    onSuccess: (data, variables, context) => {
      queryClient.invalidateQueries([GET_TEMPLATES_MY]);
    },
    onError: errorMessage,
  });
  return mutation;
};
