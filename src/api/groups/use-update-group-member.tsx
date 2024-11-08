import { useMutation } from '@tanstack/react-query';
import client from 'api/client';
import { URL_UPDATE_GROUP_MEMBER } from './constant';
import { useParams } from 'react-router-dom';
import { TMemberUpdatedProps } from './types';

export const useUpdateGroupMember = () => {
  const { id } = useParams();
  const mutation = useMutation({
    mutationFn: (data: TMemberUpdatedProps) => {
      return client.put(URL_UPDATE_GROUP_MEMBER.replace(':group_id', id ?? ''), data);
    },
  });
  return mutation;
};
