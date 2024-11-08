import { useQuery } from '@tanstack/react-query';
import client from 'api/client';
import { GET_IMPOERT_PROPERTY_COUNT } from './constants';
import { TUseGetPropertyCount } from './types';

export const useGetPropertyCount: TUseGetPropertyCount = (id, options) => {
  const result = useQuery({
    queryKey: [GET_IMPOERT_PROPERTY_COUNT, id],
    queryFn: async () => {
      const response = await client.get(GET_IMPOERT_PROPERTY_COUNT.replace(':id', id));
      return response.data;
    },
    ...options,
  });

  const { data } = result;

  return {
    data: {
      count: data?.count ?? 0,
    },
  };
};
