import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import client from '../client';
import { AdminUsersDataResponse, GetAdminUsersDataParameters } from 'api/types';

export const GET_ADMIN_USERS_PROJECTS_DATA = '/admin/projects/:id';

type ReturnDataType = {
  data: AdminUsersDataResponse[];
  count: number;
};

type TUseGetAdminUsersManagementData = (
  params: GetAdminUsersDataParameters,
  options?: UseQueryOptions<{ data: ReturnDataType }, Error, ReturnDataType>
) => {
  data: ReturnDataType;
  isSuccess: boolean;
};

export const useGetAdminUsersData: TUseGetAdminUsersManagementData = (params, options) => {
  const url = GET_ADMIN_USERS_PROJECTS_DATA.replace(':id', params.id || '');

  const result = useQuery({
    queryKey: [GET_ADMIN_USERS_PROJECTS_DATA,url, params, ],
    queryFn: () => client.get(url, { params:params.params }),
    enabled: !!params.id,
    ...options,
  });

  const { data, isSuccess } = result;

  return {
    data: isSuccess ? data : ({} as ReturnDataType),
    isSuccess,
  };
};
