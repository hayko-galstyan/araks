import { ProjectNodeTypePropertyReturnData } from 'api/types';
import { useQuery, UseQueryOptions, UseQueryResult } from '@tanstack/react-query';
import client from '../client';
import { useIsTemplateEditPage } from 'hooks/use-is-template-page';

export const GET_PROJECT_EDGE_TYPE_PROPERTY = '/edge-type-property/:edge_property_id';
export const GET_TEMPLATE_EDGE_TYPE_PROPERTY = 'templates/edge-type-property/:edge_property_id';

type ReturnData = {
  data: ProjectNodeTypePropertyReturnData;
};

type Options = UseQueryOptions<ReturnData, Error, ProjectNodeTypePropertyReturnData>;
type Result = UseQueryResult<ProjectNodeTypePropertyReturnData>;

export const useGetProjectEdgeTypeProperty = (propertyId?: string, options?: Options): Result => {
  const urlNodes = GET_PROJECT_EDGE_TYPE_PROPERTY.replace(':edge_property_id', propertyId || '');
  const templateUrl = GET_TEMPLATE_EDGE_TYPE_PROPERTY.replace(':edge_property_id', propertyId || '');

  const isTemplateEditPage = useIsTemplateEditPage();
  const result = useQuery({
    queryKey: [isTemplateEditPage ? templateUrl : urlNodes],
    queryFn: () => client.get(isTemplateEditPage ? templateUrl : urlNodes),
    ...options,
    select: (data) => data.data,
  });
  const { data, isSuccess } = result;

  return {
    ...result,
    data: isSuccess ? data : ({} as ProjectNodeTypePropertyReturnData),
  } as Result;
};
