import { useMutation, UseQueryOptions } from '@tanstack/react-query';
import client from '../client';
import { errorMessage } from 'helpers/utils';
import { RequestTypes } from '../types';
import { JIRA_CREATE_ISSUE_URL } from './constant';

export type JiraIssueRequestType = {
  nodeId?: string;
  status_id: string;
  issue_type_id: string;
  assignee_id: string;
  dueDate?: string;
  isUpdate?: boolean;
};

type Options = UseQueryOptions<JiraIssueRequestType, Error, { data: JiraIssueRequestType }>;

export const useCreateIssue = (options?: Options) => {
  const mutation = useMutation<{ data: JiraIssueRequestType }, unknown, JiraIssueRequestType, JiraIssueRequestType>({
    mutationKey: [JIRA_CREATE_ISSUE_URL],
    mutationFn: (request) => {
      const { nodeId, isUpdate, ...params } = request;

      const type = isUpdate ? RequestTypes.Put : RequestTypes.Post;

      return client[type](JIRA_CREATE_ISSUE_URL.replace(':nodeId', nodeId ?? ''), { ...params });
    },
    onError: errorMessage,
    onSuccess: (data: { data: JiraIssueRequestType }) => {
      options?.onSuccess?.(data);
    },
  });
  return mutation;
};
