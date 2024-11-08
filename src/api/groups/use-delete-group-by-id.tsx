import { useMutation, useQueryClient } from '@tanstack/react-query';
import client from 'api/client';
import { URL_DELETE_GROUP_BY_ID, URL_GET_ALL_GROUPS } from './constant';

export const useDeleteGroupById = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (id: string) => {
      return client.delete(URL_DELETE_GROUP_BY_ID.replace(':id', id));
    },
    onSuccess: () => {
      queryClient.invalidateQueries([URL_GET_ALL_GROUPS]);
    },
  });
  return mutation;
};
