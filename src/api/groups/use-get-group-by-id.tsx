import { useQuery } from '@tanstack/react-query';
import { URL_GET_GROUP_BY_ID } from './constant';
import client from 'api/client';
import { TGroupItem } from './types';

export const useGetGroupById = (id: string) => {
  const fetchGroupById = async () => {
    const response = await client.get(URL_GET_GROUP_BY_ID.replace(':id', id));
    return response.data as TGroupItem;
  };

  const result = useQuery<TGroupItem, Error>({
    queryKey: [URL_GET_GROUP_BY_ID, id],
    queryFn: fetchGroupById,
    enabled: !!id,
  });

  const { isLoading, isSuccess, data, refetch } = result;

  return {
    data,
    isSuccess,
    isLoading,
    refetch,
  };
};
