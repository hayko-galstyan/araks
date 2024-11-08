import { useMutation } from '@tanstack/react-query';
import client from 'api/client';
import { UPDATE_BOARD_CHART } from './constant';
import { TBoardUpdateParam } from 'api/types';

export const useUpdateBoard = () => {
  const mutation = useMutation({
    mutationFn: (data: TBoardUpdateParam) => {
      return client.put(UPDATE_BOARD_CHART.replace(':id', data.id), {
        chart_id: data.chart_id,
      });
    },
  });

  return mutation;
};
