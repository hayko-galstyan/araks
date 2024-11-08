import { useQuery, UseQueryResult } from '@tanstack/react-query';
import client from '../client';
import { IResponsePerspectiveData } from '../types';
import { useParams } from 'react-router-dom';

export const GET_PERSPECTIVES_DATA = '/perspectives/list/:project_id';

type Result = UseQueryResult<IResponsePerspectiveData[]>;

export const useGetPerspectives = (): Result => {
  const { id } = useParams();

  const url = GET_PERSPECTIVES_DATA.replace(':project_id', id || '');

  const result = useQuery({
    queryKey: [url, id],
    queryFn: () => client.get(url),
    enabled: !!id,
  });
  const { data, isSuccess } = result;
  return {
    ...result,
    data: isSuccess ? data.data : [],
  } as Result;
};
