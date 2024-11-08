import { useMutation } from '@tanstack/react-query';
import client from 'api/client';

import { URL_PUT_NEW_MEMBER_GROUP } from './constant';
import { TGroupNewMemberProps } from './types';

export const useCreateNewGroupMember = () => {
  const mutation = useMutation({
    mutationFn: (data: TGroupNewMemberProps) => {
      return client.post(URL_PUT_NEW_MEMBER_GROUP, data);
    },
  });
  return mutation;
};
