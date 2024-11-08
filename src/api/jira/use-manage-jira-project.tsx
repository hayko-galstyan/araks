import { useMutation } from '@tanstack/react-query';
import client from '../client';
import { useParams } from 'react-router-dom';
import { useGetProject } from '../projects/use-get-project';
import { RequestTypes } from '../types';
import { IJiraProject } from '../../types/jira-integration';
import { errorMessage } from '../../helpers/utils';
import { CREATE_JIRA_PROJECT_URL } from './constant';

export const useManageJiraProject = (isDelete?: boolean) => {
  const { id } = useParams();
  const { data: project } = useGetProject({ id: id ?? '' });

  let requestType = project?.jiraConnect ? RequestTypes.Put : RequestTypes.Post;

  if (isDelete) requestType = RequestTypes.Delete;

  const mutation = useMutation({
    mutationFn: (params?: IJiraProject) => {
      return client[requestType](
        CREATE_JIRA_PROJECT_URL.replace(':project_id', id ?? ''),
        isDelete ? undefined : { ...params }
      );
    },
    onError: errorMessage,
  });
  return mutation;
};
