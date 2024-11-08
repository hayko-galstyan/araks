import { useMutation, useQueryClient } from '@tanstack/react-query';
import client from 'api/client';
import { URL_DELETE_GROUP_MEMBER, URL_GET_ALL_MEMBERS_GROUP } from './constant';
import { useParams } from 'react-router-dom';

export const useDeleteMemberGroup = () => {
  const { id: group_id } = useParams();
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (id: string) => {
      return client.delete(URL_DELETE_GROUP_MEMBER.replace(':group_id', group_id ?? '').replace(':member_id', id));
    },
    onSuccess: () => {
      queryClient.invalidateQueries([URL_GET_ALL_MEMBERS_GROUP]);
    },
  });
  return mutation;
};
