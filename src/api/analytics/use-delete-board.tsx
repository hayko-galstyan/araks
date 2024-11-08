import { useMutation } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import client from 'api/client';
import { BOARD_BY_ID } from './constant';

export const useDeleteBoard = () => {
  const { id } = useParams();
  const mutation = useMutation({
    mutationFn: (board_id: string) => {
      return client.delete(BOARD_BY_ID.replace(':project_id', id ?? '').replace(':id', board_id));
    },
  });
  return mutation;
};
