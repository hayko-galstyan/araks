import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import client from 'api/client';
import { URL_GET_SEARCH_DATA } from './constant';

type TUseGetSearchDataParams = {
  id: string;
  search: string;
};

type TNodesItem = {
  id: string;
  name: string;
  properties: [
    {
      id: string;
      nodes_data: string[];
    }
  ];
};

type TDataItem = {
  id: string;
  icon: string;
  title: string;
  color: string;
  nodes: TNodesItem[];
};

export type TUseGetSearchData = (
  params: TUseGetSearchDataParams,
  options?: UseQueryOptions<{ data: TDataItem[] }, Error, TDataItem[]>
) => {
  data: TDataItem[];
  isLoading: boolean;
  isSuccess: boolean;
};

export const useGetSearchData: TUseGetSearchData = (params, options) => {
  const result = useQuery({
    queryKey: [URL_GET_SEARCH_DATA, params],
    queryFn: () =>
      client.get(URL_GET_SEARCH_DATA.replace(':id', params?.id), {
        params: {
          search: params?.search,
        },
      }),
    select: (data) => data?.data,
    ...options,
  });

  const { isLoading, isSuccess, data } = result;
  const typedData = data as TDataItem[];

  return {
    isLoading,
    isSuccess,
    data: typedData,
  };
};
