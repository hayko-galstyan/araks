import { useMutation } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import client from 'api/client';
import { BOARD_BY_ID } from './constant';

type TUseChangeBoardParams = {
  name: string;
  id: string;
};

export const useChangeBoard = () => {
  const { id } = useParams();
  const mutation = useMutation({
    mutationFn: (data: TUseChangeBoardParams) => {
      return client.put(BOARD_BY_ID.replace(':project_id', id ?? '').replace(':id', data.id), {
        name: data.name,
      });
    },
  });
  return mutation;
};
