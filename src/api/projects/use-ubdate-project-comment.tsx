import { useMutation, useQueryClient } from '@tanstack/react-query';
import { message } from 'antd';
import client from 'api/client';
import { URL_COMMENT_NODES_UPDATE, URL_COMMENT_UPDATE, URL_COMMENTS_LIST, URL_COMMENTS_NODES_LIST } from 'api/comments/constants';
import { ApiErrorResponse } from 'api/types';


interface TProjectComment {
  comments?: string;
  project_id?: string;
  node_id?: string;
}

export const useUpdateProjectComment = () => {
  const queryClient = useQueryClient();
  const pathName = location.pathname.slice(10, 20) === 'data-sheet';

  const mutation = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: TProjectComment }) => {
      return pathName
        ? client.put(URL_COMMENT_NODES_UPDATE.replace(':id', id), data)
        : client.put(URL_COMMENT_UPDATE.replace(':id', id), data);
    },
    onSuccess: (data, variables, context) => {
      message.success('Comment updated');
      pathName
        ? queryClient.invalidateQueries([URL_COMMENTS_NODES_LIST.replace(':node_id', data?.data?.node_id)])
        : queryClient.invalidateQueries([URL_COMMENTS_LIST.replace(':project_id', data?.data?.project_id)]);
    },
    onError: (error: ApiErrorResponse) => {
      const errorMessage = error?.response?.data?.errors?.message;
      message.error(errorMessage);
    },
  });

  return mutation;
};
