import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import client from 'api/client';
import { GET_AI_CHAT_URL } from './constant';

export type TUseGetMessageAi = (
  message: string,
  options?: UseQueryOptions<{ response: string }, Error>
) => {
  data: { response: string } | undefined;
  isLoading: boolean;
  isSuccess: boolean;
};

export const useGetMessageAi: TUseGetMessageAi = (message, options) => {
  const result = useQuery<{ response: string }, Error>(
    [GET_AI_CHAT_URL, message],
    () => client.post(GET_AI_CHAT_URL, { message, project_id: 'gty23fef723' }),
    options
  );

  const { isLoading, isSuccess, data } = result;

  return {
    data: isSuccess ? data : undefined,
    isLoading,
    isSuccess,
  };
};
