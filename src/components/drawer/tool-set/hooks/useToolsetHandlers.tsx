import { useCallback, useState } from 'react';
import { PATHS } from 'helpers/constants';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuth } from 'context/auth-context';
import { UseToolsetHandlers } from 'types/jira-integration';
import { useRedirectToJira } from 'api/jira/use-redirect-to-jira';
import { useJira } from '../components/jira/context';
import { useCreateSyncProperties } from '../../../../api/project-node-type-property/use-sync-properties';

export const useToolsetHandlers: UseToolsetHandlers = () => {
  const { setOpenToolset } = useJira();
  const params = useParams();

  const { mutate: createSyncPropertiesFn } = useCreateSyncProperties();

  const [isJira, setIsJira] = useState(false);

  const [accessRequest, setAccessRequest] = useState<boolean>(false);
  const navigate = useNavigate();

  const { user } = useAuth();

  useRedirectToJira({
    enabled: accessRequest,
    onSuccess: (data) => {
      location.href = data.data.url;
    },
  });

  const handleAnalyticsClick = useCallback(() => {
    void navigate(PATHS.PROJECT_ANALYTICS.replace(':id', params.id || ''));
    setOpenToolset(false);
  }, [navigate, params.id, setOpenToolset]);

  const handleDocumentClick = useCallback(() => {
    void navigate(PATHS.PROJECT_DOCUMENTS.replace(':id', params.id || ''));
    setOpenToolset(false);
  }, [navigate, params.id, setOpenToolset]);

  const handleSyncPropertiesClick = useCallback(() => {
    createSyncPropertiesFn();
  }, [createSyncPropertiesFn]);

  const handleJiraClick = useCallback(() => {
    if (user?.jira_account_id) {
      setIsJira(!isJira);
    } else {
      setAccessRequest(true);
    }
  }, [isJira, setIsJira, user]);

  return { isJira, handleAnalyticsClick, handleDocumentClick, handleJiraClick, handleSyncPropertiesClick };
};
