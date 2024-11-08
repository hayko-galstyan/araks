import { ProjectNodeTypePropertyReturnData } from 'api/types';
import { useQuery, UseQueryOptions, UseQueryResult } from '@tanstack/react-query';
import client from '../client';
import { useIsTemplateEditPage } from '../../hooks/use-is-template-page';

export const GET_PROJECT_NODE_TYPE_PROPERTY = '/node-type-property/:type_property_id';

export const URL_TEMPLATE_NODE_TYPE_PROPERTY = '/templates/node-type-property/:id';

type ReturnData = {
  data: ProjectNodeTypePropertyReturnData;
};

type Options = UseQueryOptions<ReturnData, Error, ProjectNodeTypePropertyReturnData>;
type Result = UseQueryResult<ProjectNodeTypePropertyReturnData>;

export const useGetProjectNodeTypeProperty = (propertyId?: string, options?: Options): Result => {
  const isTemplateEditPage = useIsTemplateEditPage();

  const urlNodes = GET_PROJECT_NODE_TYPE_PROPERTY.replace(':type_property_id', propertyId || '');
  const urlTemplate = URL_TEMPLATE_NODE_TYPE_PROPERTY.replace(':id', propertyId || '');
  const result = useQuery({
    queryKey: [GET_PROJECT_NODE_TYPE_PROPERTY],
    queryFn: () => client.get(isTemplateEditPage ? urlTemplate : urlNodes),
    select: (data) => data.data,
    ...options,
  });

  const { data, isSuccess } = result;

  return {
    ...result,
    data: isSuccess ? data : ({} as ProjectNodeTypePropertyReturnData),
  } as Result;
};
