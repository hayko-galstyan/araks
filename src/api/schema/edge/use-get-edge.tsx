import { useQuery, UseQueryOptions, UseQueryResult } from '@tanstack/react-query';
import client from 'api/client';
import { EdgeTypePropertiesResponse } from 'api/node-edge-type/types';
import { errorMessage } from 'helpers/utils';
import { useIsTemplateEditPage } from '../../../hooks/use-is-template-page';

export const GET_EDGE = '/projects-edge-type/:id';
export const GET_TEMPLATE_EDGE = '/templates/edge-type/:id';

type ReturnData = {
  data: EdgeTypePropertiesResponse;
};

type Options = UseQueryOptions<ReturnData, Error, EdgeTypePropertiesResponse>;
type Result = UseQueryResult<EdgeTypePropertiesResponse>;

export const useGetEdge = (edgeId?: string, options?: Options): Result => {
  const isTemplateEditPage = useIsTemplateEditPage();
  const urlNodes = GET_EDGE.replace(':id', edgeId || '');
  const templateUrl = GET_TEMPLATE_EDGE.replace(':id', edgeId || '');
  const result = useQuery({
    queryKey: [isTemplateEditPage ? templateUrl : urlNodes],
    queryFn: () => client.get(isTemplateEditPage ? templateUrl : urlNodes),
    ...options,
    onError: errorMessage,
    enabled: !!edgeId,
    select: (data) => data.data,
  });
  const { data, isSuccess } = result;

  return {
    ...result,
    data: isSuccess ? data : ({} as EdgeTypePropertiesResponse),
  } as Result;
};
