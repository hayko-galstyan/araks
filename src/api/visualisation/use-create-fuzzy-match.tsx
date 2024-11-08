import { RequestTypes } from 'api/types';
import { useMutation, UseQueryOptions } from '@tanstack/react-query';

import client from '../client';
import { errorMessage } from 'helpers/utils';
import { FuzzyMatchRequest } from '../../pages/project-visualisation/fuzzy-match/create-modal/components/form-data/fuzzy-form';
import { useParams } from 'react-router-dom';

const URL_CREATE_FUZZY_MATCH = '/edges/fuzzy-match/get-data';

export type MatchProperty = {
  exact?: boolean;
  fuzzy_match?: number;
  id: string;
  name: string;
};

type TypeData = {
  match_property: MatchProperty[];
  node_id: string;
  node_name: string;
  type_id: string;
};

export type FuzzyMatchResponseData = {
  source: TypeData;
  target: TypeData;
};

export const useCreateFuzzyMatch = (options?: UseQueryOptions) => {
  const { id } = useParams();

  const mutation = useMutation<{ data: FuzzyMatchResponseData[] }, unknown, FuzzyMatchRequest>({
    mutationFn: (values: FuzzyMatchRequest) => {
      return client[RequestTypes.Post](URL_CREATE_FUZZY_MATCH, { projectId: id, ...values });
    },
    onSuccess: (data, variables, context) => {
      options?.onSuccess?.(data.data);
    },
    onError: errorMessage,
  });
  return mutation;
};
