import { useQuery } from '@tanstack/react-query';
import client from 'api/client';
import { URL_GET_ALL_MY_MEMBERSHIPS } from './constant';
import { TGroupsData } from './types';

export const useGetMyMemberships = () => {
  const result = useQuery<TGroupsData, Error>({
    queryKey: [URL_GET_ALL_MY_MEMBERSHIPS],
    queryFn: () => client.get(URL_GET_ALL_MY_MEMBERSHIPS),
  });

  const { isLoading, data } = result;

  return {
    data,
    isLoading,
  };
};
