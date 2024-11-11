import { useMutation } from '@tanstack/react-query';
import { message } from 'antd';
import client from 'api/client';
import { useParams } from 'react-router-dom';

interface SyncPropertiesResponse {
  message: string;
}

const url = '/projects/sync-properties/:project_id';

export const useCreateSyncProperties = (type?: string) => {
  const { id } = useParams();

  const type_id = localStorage.getItem('type_id');

  const mutation = useMutation<SyncPropertiesResponse>({
    mutationFn: () => client.post(url.replace(':project_id', id ?? ''), type ? { type_id } : undefined),
    onSuccess: (data) => {
       message.success(data?.message);
    },
  });
  return mutation;
};
