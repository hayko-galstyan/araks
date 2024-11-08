import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import client from '../client';
import { AdminUsersManagmentResponse, GetAdminUsersManagmentParameters } from 'api/types';

export const GET_ADMIN_USERS_MANAGEMENT_DATA = '/admin/users';

type ReturnDataType = {
  data: AdminUsersManagmentResponse[];
  count: number;
};

type TUseGetAdminUsersManagementData = (
  params: GetAdminUsersManagmentParameters,
  options?: UseQueryOptions<{ data: ReturnDataType }, Error, ReturnDataType>
) => {
  data: ReturnDataType;
  isSuccess: boolean;
};

export const useGetAdminUsersManagementData: TUseGetAdminUsersManagementData = (params, options) => {
  const result = useQuery({
    queryKey: [GET_ADMIN_USERS_MANAGEMENT_DATA, params],
    queryFn: () => client.get(GET_ADMIN_USERS_MANAGEMENT_DATA, { params }),
    ...options,
  });

  const { data, isSuccess } = result;

  return {
    data: isSuccess ? data : ({} as ReturnDataType),
    isSuccess,
  };
};
