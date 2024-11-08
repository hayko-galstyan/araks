import { useMutation, useQueryClient } from '@tanstack/react-query';
import { IGroupParams } from './types';
import { URL_GET_ALL_GROUPS, URL_UPDATE_GROUP_BY_ID } from './constant';
import client from 'api/client';

interface UpdateGroupVariables {
  id: string;
  data: IGroupParams;
}

export const useUpdateGroup = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: async ({ id, data }: UpdateGroupVariables) => {
      return client.put(URL_UPDATE_GROUP_BY_ID.replace(':id', id), data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries([URL_GET_ALL_GROUPS]);
    },
  });

  return mutation;
};
