import { useMutation } from '@tanstack/react-query';
import client from 'api/client';
import { BOARD_TOOL_BY_ID } from './constant';

type TUseDeleteBoardToolByIdParams = {
  id: string;
  chart_id: string;
};

export const useDeleteBoardToolById = () => {
  return useMutation({
    mutationFn: (data: TUseDeleteBoardToolByIdParams) => {
      const { id, chart_id } = data;
      return client.delete(BOARD_TOOL_BY_ID.replace(':id', id).replace(':chart_id', chart_id));
    },
  });
};
