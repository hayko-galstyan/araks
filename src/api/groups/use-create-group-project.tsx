import { useMutation } from '@tanstack/react-query';
import client from 'api/client';
import { URL_CREATE_GROUP_PROJECT } from './constant';
import { IProjectParams } from './types';

export const useCreateGroupProject = () => {
  const mutation = useMutation({
    mutationFn: (data: IProjectParams) => {
      return client.post(URL_CREATE_GROUP_PROJECT, data);
    },
  });
  return mutation;
};
