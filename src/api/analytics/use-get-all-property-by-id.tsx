import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import client from 'api/client';
import { useParams } from 'react-router-dom';
import { GET_NODE_TYPE_PROPERTIES } from './constant';
import { TAnalyticsNodeTypeProperties } from 'api/types';

export type TUseGetAllNodeTypeProperties = (
  nodeTypeId: string,
  options?: UseQueryOptions<TAnalyticsNodeTypeProperties, Error>
) => {
  data?: TAnalyticsNodeTypeProperties;
  isLoading: boolean;
};

export const useGetAllNodeTypeProperties: TUseGetAllNodeTypeProperties = (nodeTypeId, options) => {
  const { id } = useParams();

  const result = useQuery<TAnalyticsNodeTypeProperties, Error>(
    [id, nodeTypeId],
    () =>
      client
        .get(GET_NODE_TYPE_PROPERTIES.replace(':project_id', id || '').replace(':id', nodeTypeId))
        .then((res) => res.data),
    {
      ...options,
    }
  );

  const { isLoading, data } = result;

  return {
    data: !isLoading ? data : ({} as TAnalyticsNodeTypeProperties),
    isLoading,
  };
};
