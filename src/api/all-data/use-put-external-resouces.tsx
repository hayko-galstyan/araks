import { useMutation } from '@tanstack/react-query';
import client from 'api/client';
import { URL_GET_EXTERNAL_RESOURCES } from './constants';
import { useParams } from 'react-router-dom';
import { IDataExternalResourcesItem } from 'api/types';

export const useAddExternalResources = () => {
  const { id } = useParams();
  const mutation = useMutation({
    mutationFn: (params: IDataExternalResourcesItem[]) => {
      return client.post(URL_GET_EXTERNAL_RESOURCES.replace(':project_id', id ?? ''), {
        articles: params,
      });
    },
  });
  return mutation;
};
