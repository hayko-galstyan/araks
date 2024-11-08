import { useMutation, useQueryClient } from '@tanstack/react-query';
import client from 'api/client';
const URL_PUT_CHANGE_PROJECT_OWNER = '/admin/projects/owner';

import { GET_ADMIN_USERS_PROJECTS_DATA } from './use-get-user-data-by-id';
import { ApiErrorResponse, TAdminProjectChangeOwner } from 'api/types';
import { message } from 'antd';
import { GET_ADMIN_USERS_MANAGEMENT_DATA } from './use-get-users-list';

export const useChangeProjectOwner = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (data: TAdminProjectChangeOwner) => {
      return client.put(URL_PUT_CHANGE_PROJECT_OWNER, data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries([GET_ADMIN_USERS_PROJECTS_DATA]);
      queryClient.invalidateQueries([GET_ADMIN_USERS_MANAGEMENT_DATA]);
    },
    onError: (error: ApiErrorResponse) => {
      const errorMessage = error?.response?.data?.errors?.message || 'An unexpected error occurred';
      message.error(errorMessage);
    },
  });
  return mutation;
};
