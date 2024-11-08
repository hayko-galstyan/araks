import { useQuery } from '@tanstack/react-query';
import client from 'api/client';
import { errorMessage } from 'helpers/utils';
import { DEFAULT_PAGE_NUMBER, DEFAULT_PAGE_SIZE } from '../../helpers/constants';
import { useParams } from 'react-router-dom';
import {
  IResponseDocumentTypeData,
  PageParameters,
  UseGetDocumentTypesOptions,
  UseGetDocumentTypesResult,
} from '../types';

import { GET_DOCUMENT_TYPES } from './constants';

const initPageData: PageParameters = {
  page: DEFAULT_PAGE_NUMBER,
  size: DEFAULT_PAGE_SIZE,
};

export const useGetDocumentTypes = (options?: UseGetDocumentTypesOptions): UseGetDocumentTypesResult => {
  const { id } = useParams();

  const url = GET_DOCUMENT_TYPES.replace(':project_id', id || '');

  const result = useQuery({
    queryKey: [url, initPageData],
    queryFn: () => client.get(url, { params: initPageData }),
    ...options,
    onError: errorMessage,
    enabled: !!id,
    select: (data) => data.data,
  });
  const { data, isSuccess } = result;

  return {
    ...result,
    data: isSuccess ? data : ([] as IResponseDocumentTypeData[]),
  } as UseGetDocumentTypesResult;
};
