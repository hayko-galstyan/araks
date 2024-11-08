import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import client from 'api/client';
import { errorMessage } from 'helpers/utils';
import { useParams } from 'react-router-dom';
import { GET_DOCUMENT_GRAPH } from './constants';

export type Node = {
  id: string;
  name: string;
  color: string;
  default_image: string;
  documents: {
    url: string;
    name: string;
  }[];
};

export type DocumentNodes = Node[];

export type ResponseData = {
  count: number;
  data: Node[];
};

type QueryResponse = {
  data: {
    count: number;
    data: Node[];
  };
};

type Options = UseQueryOptions<QueryResponse, Error, ResponseData>;

type Result = {
  nodes: Node[] | undefined;
  count: number;
  isInitialLoading: boolean;
};

export const useGetDocumentGraph = (
  options: Options = { enabled: true },
  search?: string,
  project_type_id?: string
): Result => {
  const params = useParams();

  const url = GET_DOCUMENT_GRAPH.replace(':project_id', params?.id || '');

  const result = useQuery({
    queryKey: [url, project_type_id],
    queryFn: () => client.get(url, { params: { search, project_type_id } }),
    ...options,
    onError: errorMessage,
  });

  const { data, isInitialLoading } = result;

  const { data: nodes, count } = data ?? {};

  return { isInitialLoading, nodes, count: count ?? 0 };
};
