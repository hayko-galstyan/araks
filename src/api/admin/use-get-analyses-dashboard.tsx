import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import client from '../client';
import { AdminAnalysesDashboardResponse, GetAdminAnalysesDasboardParameters } from 'api/types';

export const GET_ADMIN_STATIC_COUNTS_DATA = '/admin/counts-year';

type ReturnDataType = {
  data: AdminAnalysesDashboardResponse[];
};

type TUseGetAdminStaticsCountsData = (
  params: GetAdminAnalysesDasboardParameters,
  options?: UseQueryOptions<{ data: ReturnDataType }, Error, ReturnDataType>
) => {
  data: ReturnDataType;
  isSuccess: boolean;
};

export const useGetAdminAnalysesDashboard: TUseGetAdminStaticsCountsData = (params, options) => {
  const result = useQuery({
    queryKey: [GET_ADMIN_STATIC_COUNTS_DATA,params],
    queryFn: () => client.get(GET_ADMIN_STATIC_COUNTS_DATA, { params }),
    ...options,
  });

  const { data, isSuccess } = result;

  return {
    data: isSuccess ? data : ({} as ReturnDataType),
    isSuccess,
  };
};
