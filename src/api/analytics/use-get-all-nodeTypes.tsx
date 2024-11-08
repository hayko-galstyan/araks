import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import client from 'api/client';
import { useParams } from 'react-router-dom';
import { GET_NODE_TYPES_ANALYTICS } from './constant';
import { TAnalyticsNodeType } from 'api/types';

export type TUseGetAllNodeTypes = (options?: UseQueryOptions<{ data: TAnalyticsNodeType }, Error>) => {
  data: TAnalyticsNodeType[];
  isLoading: boolean;
};

export const useGetAllNodeTypes: TUseGetAllNodeTypes = () => {
  const { id } = useParams();

  const result = useQuery({
    queryKey: [id],
    queryFn: () => client.get(GET_NODE_TYPES_ANALYTICS.replace(':project_id', id || '')),
    select: (data) => data.data,
  });

  const { isLoading, data } = result;

  return {
    data: !isLoading ? data : ([] as TAnalyticsNodeType[]),
    isLoading,
  };
};
