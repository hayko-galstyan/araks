import { useInfiniteQuery } from '@tanstack/react-query';
import { GET_TABLE_EXTERNAL_DATA } from './constant';
import client from 'api/client';
import { ANALYTICS } from 'helpers/constants';
import { TUseGetTableExternalData } from 'api/types';

const { ANALYTIC_TABLE_PAGE_SIZE } = ANALYTICS;

export const useGetTableExternalData: TUseGetTableExternalData = (id, page, options) => {
  const result = useInfiniteQuery({
    queryKey: [GET_TABLE_EXTERNAL_DATA],
    queryFn: ({ pageParam = page }) =>
      client.get(GET_TABLE_EXTERNAL_DATA.replace(':id', id ?? ''), {
        params: {
          page: pageParam,
          size: ANALYTIC_TABLE_PAGE_SIZE,
        },
      }),
    ...options,
    keepPreviousData: true,
    staleTime: 0,
    cacheTime: 0,
    getNextPageParam: (lastPage, allPages) => {
      const nextPage = allPages.length + 1;
      return lastPage.count > ANALYTIC_TABLE_PAGE_SIZE * allPages.length ? nextPage : undefined;
    },
  });

  const transformedData = result.data
    ? {
        count: result.data.pages[0]?.count ?? 0,
        data: result.data.pages.flatMap((page) => page.data),
      }
    : undefined;

  const { isLoading, refetch, isFetching, fetchNextPage, hasNextPage } = result;

  return {
    data: transformedData,
    isLoading,
    refetch,
    isFetching,
    fetchNextPage,
    hasNextPage,
  };
};
