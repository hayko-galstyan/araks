import { useMutation } from '@tanstack/react-query';
import client from 'api/client';
import { errorMessage } from 'helpers/utils';
import { useParams } from 'react-router-dom';

import { GET_SIMILAR_TAGS } from './constants';
import { IDocumentTagResponse } from '../types';

export const useGetSimilarTag = () => {
  const { id } = useParams();

  const url_tags = GET_SIMILAR_TAGS.replace(':project_id', id || '');

  const mutation = useMutation<IDocumentTagResponse, never, { url: string }>({
    mutationFn: ({ url }) => {
      return client.post(url_tags, { url });
    },
    onError: errorMessage,
  });

  return mutation;
};
