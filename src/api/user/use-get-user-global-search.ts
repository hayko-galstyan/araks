import { UseQueryOptions, useQuery } from '@tanstack/react-query';
import { errorMessage } from 'helpers/utils';
import client from '../client';
import { CommentsType } from 'api/visualisation/use-get-search';

export type NodeType = {
  project_id: string;
  title: string;
  color: string;
  id: string;
  name: string;
  privacy: string;
  user_id: string;
  icon: string;
  default_image: string;
  node_type: string;
};

export type TypeProp = {
  id: string;
  title: string;
  color: string;
  node_type_id: string;
  name: string;
  user_id: string;
  privacy: string;
  icon: string;
  project_id: string;
};

export type ProjectType = {
  id: string;
  title: string;
  color: string;
  created_at: string;
  privacy: string;
  user_id: string;
  icon: string;
};

export type PropertyType = {
  project_id: string;
  node_id: string;
  color: string;
  icon: string;
  privacy: string;
  id: string;
  title: string;
  user_id: string;
  node_name: string;
  property: string[];
  default_image: string;
  node_type: string;
};

type UsersGlobalSearchResponseData = {
  nodes: NodeType[];
  projects: ProjectType[];
  types: TypeProp[];
  properties: PropertyType[];
  comments: CommentsType[]
};

type Options = UseQueryOptions<QueryResponse, Error, QueryResponse>;

type QueryResponse = {
  data: UsersGlobalSearchResponseData;
};

export const useGetUserGlobalSearch = (
  url: string,
  options: Options = { enabled: false },
  search: string
): QueryResponse => {
  const result = useQuery({
    queryKey: [url, search],
    queryFn: () => client.get(url, { params: { search } }),
    ...options,
    onError: errorMessage,
  });

  const { data } = result;

  return { data: data?.data ?? ({} as UsersGlobalSearchResponseData) };
};
