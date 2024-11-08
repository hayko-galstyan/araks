import { useMutation } from '@tanstack/react-query';
import client from 'api/client';
import { errorMessage } from 'helpers/utils';
import { useParams } from 'react-router-dom';

import { GET_DOCUMENT_BY_TYPES } from './constants';
import { GetDocumentsByTypeRequestData, GetDocumentsByTypeReturnData } from '../types';

export const useGetDocumentsByType = (search: string | undefined) => {
  const { id } = useParams();

  const url = GET_DOCUMENT_BY_TYPES.replace(':project_id', id || '');

  const mutation = useMutation<GetDocumentsByTypeReturnData, never, GetDocumentsByTypeRequestData>({
    mutationKey:[url, search],
    mutationFn: ({ project_type_id, pageData, search }) => {
      return client.post(url, { project_type_id, ...pageData, search });
    },
    onError: errorMessage,
  });

  return mutation;
};
