import {
  FetchNextPageOptions,
  InfiniteQueryObserverResult,
  UseInfiniteQueryOptions,
  useInfiniteQuery,
} from '@tanstack/react-query';
import { URL_GET_EXTERNAL_RESOURCES } from './constants';
import client from 'api/client';
import { useParams } from 'react-router-dom';
import { IExternalResourcesData } from 'api/types';

export type TUseGetExternalResources = (
  search: string | undefined,
  page: number,
  options?: UseInfiniteQueryOptions<IExternalResourcesData, Error>
) => {
  data: IExternalResourcesData | undefined;
  isLoading: boolean;
  refetch: () => void;
  isFetching?: boolean;
  fetchNextPage: (
    options?: FetchNextPageOptions
  ) => Promise<InfiniteQueryObserverResult<IExternalResourcesData, Error>>;
  hasNextPage: boolean | undefined;
};

export const useGetExternalResources: TUseGetExternalResources = (search, page, options) => {
  const { id } = useParams();
  const result = useInfiniteQuery<IExternalResourcesData, Error>({
    queryKey: [URL_GET_EXTERNAL_RESOURCES, id, search],
    queryFn: ({ pageParam = page }) =>
      client.get(URL_GET_EXTERNAL_RESOURCES.replace(':project_id', id ?? ''), {
        params: {
          page: pageParam,
          search: search?.length ? search : undefined,
          size: 5,
        },
      }),
    ...options,
    keepPreviousData: true,
    staleTime: 0,
    cacheTime: 0,
    getNextPageParam: (lastPage, allPages) => {
      const nextPage = allPages.length + 1;
      return lastPage.count > 5 * allPages.length ? nextPage : undefined;
    },
  });

  const transformedData = result.data
    ? {
        articles: result.data.pages.flatMap((page) => page.articles),
        count: result.data.pages[0]?.count ?? 0,
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
