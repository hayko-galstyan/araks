import { RequestTypes } from 'api/types';
import { useMutation, UseQueryOptions } from '@tanstack/react-query';

import client from '../client';
import { errorMessage } from 'helpers/utils';
import { Edges, Nodes } from './use-get-data';
import { FuzzyMatchResponseData } from './use-create-fuzzy-match';

export type FuzzyMatchRequest = {
  edgeId: string;
  data: FuzzyMatchResponseData[];
};

const URL_CREATE_FUZZY_MATCH = '/edges/fuzzy-match/create-data';

type GraphData = {
  nodes: Nodes;
  edges: Edges;
  count: number;
  relationsCounts: { [key: string]: number };
};

type Options = UseQueryOptions<GraphData, Error, GraphData>;

export const useCreateFuzzyMatchGraph = (options?: Options) => {
  const mutation = useMutation<{ data: GraphData }, unknown, FuzzyMatchRequest>({
    mutationFn: (values: FuzzyMatchRequest) => {
      return client[RequestTypes.Post](URL_CREATE_FUZZY_MATCH, { ...values });
    },
    onSuccess: (data, variables, context) => {
      options?.onSuccess?.(data.data);
    },
    onError: errorMessage,
  });
  return mutation;
};
