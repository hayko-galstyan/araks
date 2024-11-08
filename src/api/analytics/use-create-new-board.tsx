import { useMutation } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import client from 'api/client';
import { ANALYTICS_BOARDS } from './constant';

export const useCreateNewBoard = () => {
  const { id } = useParams();
  const mutation = useMutation({
    mutationFn: (name: string) => {
      return client.post(ANALYTICS_BOARDS.replace(':project_id', id ?? ''), {
        name: name,
      });
    },
  });
  return mutation;
};
