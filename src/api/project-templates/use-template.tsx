import { RequestTypes } from 'api/types';
import { useMutation, useQueryClient, UseQueryOptions } from '@tanstack/react-query';

import client from '../client';
import { errorMessage } from 'helpers/utils';
import { useParams } from 'react-router-dom';
import { GET_TYPES } from '../schema/type/use-get-types';
import { GET_EDGES } from '../schema/edge/use-get-edges';
import { animateGraphFit } from 'components/layouts/components/schema/helpers/utils';
import { useSchema } from 'components/layouts/components/schema/wrapper';

const URL_SAVE_AS_TEMPLATE = '/templates/use';

type ReturnData = {
  data: { project_id: string };
};

type QueryResponse = {
  data: ReturnData;
};

type Options = UseQueryOptions<QueryResponse, Error, ReturnData>;

export const useTemplate = (options?: Options) => {
  const { id } = useParams();
  const queryClient = useQueryClient();
  const { graph } = useSchema() ?? {};

  const mutation = useMutation<ReturnData, unknown, { template_id: string; project_id?: string | undefined }>({
    mutationFn: ({ template_id, project_id }) => {
      const params = project_id ? { template_id, project_id } : { template_id };
      return client[RequestTypes.Post](URL_SAVE_AS_TEMPLATE, { ...params });
    },
    onSuccess: async (data) => {
      await queryClient.invalidateQueries([GET_TYPES.replace(':project_id', id || '')], { stale: true });
      await queryClient.invalidateQueries([GET_EDGES.replace(':project_id', id || '')], { stale: true });
      options?.onSuccess?.(data);
      animateGraphFit(graph, '0.4');
      if (graph?.zoomToFit) graph?.zoomToFit({ padding: 10, maxScale: 1 });
    },
    onError: (er) => {
      errorMessage(er);
      options?.onError?.(er as Error);
    },
  });
  return mutation;
};
