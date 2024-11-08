import { useMutation } from '@tanstack/react-query';
import client from 'api/client';
import { BOARD_ITEMS } from './constant';
import { AnyObject } from 'antd/es/_util/type';

type TUseCreateBoardItemParams = {
  id: string;
  data: AnyObject;
};

export const useCreateBoardItem = () => {
  const mutation = useMutation({
    mutationFn: (data: TUseCreateBoardItemParams) => {
      return client.post(BOARD_ITEMS.replace(':board_id', data.id), data.data);
    },
  });
  return mutation;
};
