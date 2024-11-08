import { useMutation, useQueryClient } from '@tanstack/react-query';
import client from 'api/client';
const URL_PUT_CHANGE_GROUP_OWNER = '/admin/groups/owner';
import { ApiErrorResponse, TAdminProjectChangeOwner } from 'api/types';
import { message } from 'antd';
import { GET_ADMIN_USERS_GROUPS_DATA } from './use-get-user-groups-by-id';

export const useChangeGroupOwner = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (data: TAdminProjectChangeOwner) => {
      return client.put(URL_PUT_CHANGE_GROUP_OWNER, data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries([GET_ADMIN_USERS_GROUPS_DATA]);
    },
    onError: (error: ApiErrorResponse) => {
      const errorMessage = error?.response?.data?.errors?.message || 'An unexpected error occurred';
      message.error(errorMessage);
    },
  });
  return mutation;
};
