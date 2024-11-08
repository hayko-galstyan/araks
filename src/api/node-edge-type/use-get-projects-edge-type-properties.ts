import { useQuery, UseQueryOptions, UseQueryResult } from '@tanstack/react-query';
import { useIsPublicPage } from 'hooks/use-is-public-page';
import client from '../client';
import { EdgeTypePropertiesResponse } from './types';
import { useIsTemplateEditPage } from '../../hooks/use-is-template-page';

export const GET_PROJECT_EDGE_TYPE_PROPERTIES_LIST = '/projects-edge-type/:edge_type_id/properties';
export const GET_PUBLIC_PROJECT_EDGE_TYPE_PROPERTIES_LIST = '/public/projects-edge-type/:edge_type_id/property';

export const GET_TEMPLATE_EDGE_TYPE_PROPERTIES_LIST = '/templates/edge-type/:edge_type_id';

type ReturnData = {
  data: EdgeTypePropertiesResponse;
};

type Options = UseQueryOptions<ReturnData, Error, EdgeTypePropertiesResponse>;
type Result = UseQueryResult<EdgeTypePropertiesResponse>;

export const useGetProjectsEdgeTypeProperties = (edgeypeId?: string, options?: Options): Result => {
  const isPublicPage = useIsPublicPage();
  const isTemplateEditPage = useIsTemplateEditPage();

  const urlNodes = (
    isPublicPage ? GET_PUBLIC_PROJECT_EDGE_TYPE_PROPERTIES_LIST : GET_PROJECT_EDGE_TYPE_PROPERTIES_LIST
  ).replace(':edge_type_id', edgeypeId || '');

  const urlTemplate = GET_TEMPLATE_EDGE_TYPE_PROPERTIES_LIST.replace(':edge_type_id', edgeypeId || '');

  const result = useQuery({
    queryKey: [isTemplateEditPage ? urlTemplate : urlNodes],
    queryFn: () => client.get(isTemplateEditPage ? urlTemplate : urlNodes).then((data) => data.data),
    ...options,
  });

  const { data, isSuccess } = result;

  return {
    ...result,
    data: (isSuccess ? data : {}) as EdgeTypePropertiesResponse,
  } as Result;
};
