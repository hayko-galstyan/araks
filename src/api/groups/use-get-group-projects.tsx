import { useQuery } from '@tanstack/react-query';
import { URL_GET_ALL_GROUP_PROJECTS } from './constant';
import client from 'api/client';
import { TUseGroupProjectsData } from './types';

export const useGetGroupProjects = (id: string) => {
  const BASE_URL = URL_GET_ALL_GROUP_PROJECTS.replace(':id', id);
  const result = useQuery<TUseGroupProjectsData, Error>({
    queryKey: [BASE_URL],
    queryFn: () => client.get(BASE_URL),
    enabled: !!id,
  });

  const { isLoading, isSuccess, data, refetch } = result;

  return {
    data,
    isLoading,
    isSuccess,
    refetch,
  };
};
