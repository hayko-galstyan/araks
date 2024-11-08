import { useQuery, UseQueryOptions, UseQueryResult } from '@tanstack/react-query';
import client from '../client';

export const GET_DICTIONARY_PROPERTY_TYPES = '/dictionary/property-type';

type ReturnData<DataType> = {
  data: DataType;
};

type Options<DataType> = UseQueryOptions<ReturnData<DataType>, Error, ReturnData<DataType>>;
type Result<DataType> = UseQueryResult<DataType>;

export const useGetDictionary = <DataType>(
  params: { url: string; codes: string | undefined },
  options: Options<DataType> = { enabled: true }
): Result<DataType> => {
  const { url, codes } = params;
  const result = useQuery({
    queryKey: [params],
    queryFn: () => client.get(url, { params: { codes } }),
    ...options,
    // select: (data) => data.data,
  });
  const { data, isSuccess } = result;

  return {
    ...result,
    data: isSuccess ? data.data : ([] as DataType),
  } as Result<DataType>;
};
