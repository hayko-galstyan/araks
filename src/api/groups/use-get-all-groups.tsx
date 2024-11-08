import { useQuery } from '@tanstack/react-query';
import { URL_GET_ALL_GROUPS } from './constant';
import client from 'api/client';
import { TGroupsData } from './types';

export const useGetAllGroups = () => {
  const result = useQuery<TGroupsData, Error>({
    queryKey: [URL_GET_ALL_GROUPS],
    queryFn: () => client.get(URL_GET_ALL_GROUPS),
  });

  const { isLoading, isSuccess, data } = result;

  return {
    data,
    isSuccess,
    isLoading,
  };
};
