import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { errorMessage } from 'helpers/utils';
import client from '../client';

export const GET_TEMPLATE = '/templates/:id';

type ReturnData = {
  data: {
    types: [];
  };
};

type Options = UseQueryOptions<{ id: string }, Error, ReturnData>;

export const useGetTemplateById = (id: string, options?: Options) => {
  const urlNodes = GET_TEMPLATE.replace(':id', id);
  const result = useQuery({
    queryKey: [urlNodes],
    queryFn: () => client.get(urlNodes),
    onSuccess: (data) => {
      options?.onSuccess?.(data);
    },
    enabled: options?.enabled,
    onError: errorMessage,
  });

  return result;
};
