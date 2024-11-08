import { useMutation } from '@tanstack/react-query';
import client from 'api/client';
import { BOARD_TOOL_BY_ID } from './constant';

type TUseUpdateToolPositionParams = {
  id: string;
  chart_id: string;
  position: {
    fx: number;
    fy: number;
    width: number;
    height: number;
  };
};

export const useUpdateToolPosition = () => {
  return useMutation({
    mutationFn: (data: TUseUpdateToolPositionParams) => {
      const { id, chart_id, position } = data;
      return client.patch(BOARD_TOOL_BY_ID.replace(':id', id).replace(':chart_id', chart_id), {
        ...position,
      });
    },
  });
};
