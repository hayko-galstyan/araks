import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { BOARD_ITEMS } from './constant';
import client from 'api/client';
import { TAnalyticsBoard } from 'api/types';

type TUseGetAllBoardItems = (
  id: string,
  options?: UseQueryOptions<TAnalyticsBoard[], Error>
) => {
  data: TAnalyticsBoard[] | undefined;
  isLoading: boolean;
};

export const useGetAllBoardItems: TUseGetAllBoardItems = (id, options) => {
  const url = BOARD_ITEMS.replace(':board_id', id);

  const result = useQuery({
    queryKey: [url],
    queryFn: async () => {
      const response = await client.get(url);
      return response.data;
    },
    ...options,
  });

  const { data, isLoading } = result;

  return {
    data,
    isLoading,
  };
};
