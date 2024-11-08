import { useMutation } from '@tanstack/react-query';
import client from 'api/client';
import { DELETE_TASK_BY_ID } from './constant';

export const useDeleteIssueById = () => {
  const mutation = useMutation({
    mutationFn: (node_id: string) => client.delete(DELETE_TASK_BY_ID.replace(':id', node_id)),
  });
  return mutation;
};
