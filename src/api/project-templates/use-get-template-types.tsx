import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { errorMessage } from 'helpers/utils';
import client from '../client';
import { IProjectType } from '../types';

export const GET_TEMPLATE_TYPES = '/templates/left-bar';

export interface ITemplate {
  id: string;
  name: string;
  description: string;
  screenshot: string;
  privacy: string;
  updated_at: string;
  nodes: IProjectType[];
  edges: {
    id: string;
    name: string;
    source: {
      id: string;
      name: string;
      color: string;
    };
    target: {
      id: string;
      name: string;
      color: string;
    };
  }[];
}

export type ITemplateData = {
  rows: ITemplate[];
  count: number;
};

type ReturnData = {
  data: {
    default_templates: ITemplateData;
    public_templates: ITemplateData;
    my_templates: ITemplateData;
  };
};

type QueryResponse = {
  data: ReturnData;
};

type Options = UseQueryOptions<QueryResponse, Error, ReturnData>;

export const useGetTemplateTypes = (search: string, options?: Options) => {
  const result = useQuery({
    queryKey: [GET_TEMPLATE_TYPES, search],
    queryFn: () =>
      client.get(GET_TEMPLATE_TYPES, options?.enabled && search.length > 2 ? { params: { search } } : undefined),
    onSuccess: (data) => {
      options?.onSuccess?.(data);
    },
    onError: errorMessage,
  });

  return { data: result?.data?.data ?? {} };
};
