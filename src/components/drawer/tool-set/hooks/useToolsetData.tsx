import { useMemo } from 'react';
import { toolSetDataHandle } from '../helpers/utils';
import { ToolSetPanel } from '../components/tool-set-panel';
import { useAuth } from 'context/auth-context';

export const useToolsetData = (
  handleAnalyticsClick: VoidFunction,
  handleDocumentClick: VoidFunction,
  handleJiraClick: VoidFunction,
  handleSyncPropertiesClick: VoidFunction
) => {
  const { user } = useAuth();

  return useMemo(
    () =>
      toolSetDataHandle({
        handleAnalyticsClick,
        handleDocumentClick,
        handleJiraClick,
        handleSyncPropertiesClick,
        isJiraConnected: !!user?.jira_account_id,
      }).map((item, index) => <ToolSetPanel key={index} {...item} />),
    [handleAnalyticsClick, handleDocumentClick, handleJiraClick, handleSyncPropertiesClick, user?.jira_account_id]
  );
};
