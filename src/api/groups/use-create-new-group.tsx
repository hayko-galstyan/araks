import { useMutation, useQueryClient } from '@tanstack/react-query';
import client from 'api/client';

import { URL_CREATE_NEW_GROUP, URL_GET_ALL_GROUPS } from './constant';
import { IGroupParams } from './types';

export const useCreateNewGroup = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (data: IGroupParams) => {
      return client.post(URL_CREATE_NEW_GROUP, data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries([URL_GET_ALL_GROUPS]);
    },
  });
  return mutation;
};
