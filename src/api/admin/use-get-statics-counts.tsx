import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import client from '../client';
import { AdminStaticsCountResponse } from 'api/types';

export const GET_ADMIN_STATIC_COUNTS_DATA = '/admin/counts';

type ReturnDataType = {
  data: AdminStaticsCountResponse;
};

type TUseGetAdminStaticsCountsData = (
  options?: UseQueryOptions<{ data: ReturnDataType }, Error, ReturnDataType>
) => {
  data: ReturnDataType;
  isSuccess: boolean;
};

export const useGetAdminStaticsCountData: TUseGetAdminStaticsCountsData = (options) => {
  const result = useQuery({
    queryKey: [GET_ADMIN_STATIC_COUNTS_DATA],
    queryFn: () => client.get(GET_ADMIN_STATIC_COUNTS_DATA),
    ...options,
  });

  const { data, isSuccess } = result;

  return {
    data: isSuccess ? data : ({} as ReturnDataType),
    isSuccess,
  };
};
