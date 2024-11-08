import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import client from '../client';
import { AdminUsersGroupDataResponse, GetAdminUsersDataParameters } from 'api/types';

export const GET_ADMIN_USERS_GROUPS_DATA = '/admin/groups/:id';

type ReturnDataType = {
  data: AdminUsersGroupDataResponse[];
  count: number;
};

type TUseGetAdminUsersManagementData = (
  params: GetAdminUsersDataParameters,
  options?: UseQueryOptions<{ data: ReturnDataType }, Error, ReturnDataType>
) => {
  data: ReturnDataType;
  isSuccess: boolean;
};

export const useGetAdminUsersGroupsData: TUseGetAdminUsersManagementData = (params, options) => {
  const url = GET_ADMIN_USERS_GROUPS_DATA.replace(':id', params.id || '');

  const result = useQuery({
    queryKey: [GET_ADMIN_USERS_GROUPS_DATA,url, params],
    queryFn: () => client.get(url, { params: params.params }),
    enabled: !!params.id,
    ...options,
  });
  const { data, isSuccess } = result;

  return {
    data: isSuccess ? data : ({} as ReturnDataType),
    isSuccess,
  };
};
