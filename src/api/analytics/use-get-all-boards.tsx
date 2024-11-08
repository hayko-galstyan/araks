import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import client from 'api/client';
import { useParams } from 'react-router-dom';
import { ANALYTICS_BOARDS } from './constant';
import { TAnalyticsBoardItem } from 'api/types';

type TUseGetAllBoards = (options?: UseQueryOptions<TAnalyticsBoardItem[], Error>) => {
  data: TAnalyticsBoardItem[];
  isLoading: boolean;
};

export const useGetAllBoards: TUseGetAllBoards = (options) => {
  const { id } = useParams();

  const url = ANALYTICS_BOARDS.replace(':project_id', id || '');

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
    isLoading,
    data: data ?? ([] as TAnalyticsBoardItem[]),
  };
};
