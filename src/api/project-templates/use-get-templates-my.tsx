import { GetTemplatesMyParameters, TemplatesItemInfo } from 'api/types';
import { useQuery } from '@tanstack/react-query';
import client from '../client';

export const GET_TEMPLATES_MY = '/templates/my';
export const GET_TEMPLATES_PUBLIC = '/templates/public';
export const GET_TEMPLATES_DEFAULT = '/templates/default';

type ReturnDataType = {
  templates: TemplatesItemInfo[];
  count: number;
};

type ProjectReturnType = {
  data: ReturnDataType;
};

export const useGetTemplates = (
  params: GetTemplatesMyParameters,
  url = GET_TEMPLATES_MY,
  options = { enabled: true }
) => {
  const result = useQuery<ProjectReturnType>({
    queryKey: [url, params],
    queryFn: () => client.get(url, { params }),
    ...options,
  });
  const { data, isSuccess } = result;
  return {
    ...result,
    data: isSuccess ? data : ({} as ProjectReturnType),
  };
};
