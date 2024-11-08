import { useMutation } from '@tanstack/react-query';
import client from 'api/client';
import { errorMessage } from 'helpers/utils';
import { useParams } from 'react-router-dom';

import { GET_EXPAND_DOCUMENT } from './constants';
import { IDocumentTagResponse } from '../types';

export const useGetExpandTags = () => {
  const { id } = useParams();

  const url_tags = GET_EXPAND_DOCUMENT.replace(':project_id', id || '');

  const mutation = useMutation<IDocumentTagResponse, never, { url: string; keyword: string }>({
    mutationFn: ({ url, keyword }) => {
      return client.post(url_tags, { url, keyword });
    },
    onError: errorMessage,
  });

  return mutation;
};
