import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useLocation } from 'react-router-dom';
import client from '../client';
import { PATHS } from 'helpers/constants';
import { errorMessage } from 'helpers/utils';

import { GET_FOLDERS_LIST } from 'api/folders/use-get-folders';
import {
  GET_FOLDER_PROJECTS_LIST,
  GET_PROJECTS_LIST,
  GET_PROJECTS_PUBLIC_LIST,
  GET_PROJECTS_SHARED,
} from 'api/projects/use-get-projects';
import { URL_GET_ALL_GROUP_PROJECTS } from 'api/groups/constant';

export const PROJECT_DELETE_URL = 'projects/delete/:id';
export const SHARED_PROJECT_DELETE_URL = 'shared/delete/:id';
export const GROUP_PROJECT_DELETE_URL = '/groups/:group_id/projects/:project_id';

type ReturnType = {
  folderId: string;
};

type Props = {
  projectId: string;
  folderId?: string;
  isGroupProject?: boolean;
  url?: string;
};

export const useDeleteProject = ({ projectId, folderId, isGroupProject = false, url = PROJECT_DELETE_URL }: Props) => {
  const location = useLocation();
  const queryClient = useQueryClient();

  const mutation = useMutation<ReturnType>({
    mutationFn: () =>
      client.delete(
        isGroupProject
          ? url.replace(':project_id', projectId).replace(':group_id', folderId ?? '')
          : url.replace(':id', projectId)
      ),
    onSuccess: (data, variables, context) => {
      queryClient.invalidateQueries([GET_FOLDERS_LIST]);

      if (isGroupProject) {
        queryClient.invalidateQueries([URL_GET_ALL_GROUP_PROJECTS.replace(':id', folderId ?? '')]);
      } else {
        if (folderId) {
          const folderProjectsKey = [GET_FOLDER_PROJECTS_LIST.replace(':id', folderId)];
          queryClient.invalidateQueries(folderProjectsKey);
        } else {
          queryClient.invalidateQueries([GET_FOLDERS_LIST]);
        }

        if (location.pathname === PATHS.PUBLIC) {
          queryClient.invalidateQueries([GET_PROJECTS_PUBLIC_LIST]);
        }
        if (location.pathname === PATHS.SHARED) {
          queryClient.invalidateQueries([GET_PROJECTS_SHARED]);
        }
        queryClient.invalidateQueries([GET_PROJECTS_LIST]);
      }
    },
    onError: (error) => errorMessage(error),
  });

  return mutation;
};
