import { ReactComponent as RepositorySvg } from '../icons/repository.svg';
import { ReactComponent as AnalysisSvg } from '../icons/analysis.svg';
import { ReactComponent as JiraSvg } from 'components/icons/jira.svg';
import { ReactNode } from 'react';
import {
  ANALYTICS_DESCRIPTION,
  ANALYTICS_TITLE,
  DOCUMENT_REPOSITORY_DESCRIPTION,
  DOCUMENT_REPOSITORY_TITLE,
  JIRA_CONNECTED_TITLE,
  JIRA_DESCRIPTION,
  JIRA_NOT_CONNECTED_TITLE,
  SYNC_PROPERTIES,
  SYNC_PROPERTIES_DESCRIPTION,
} from './constants';
import { ToolSetDataParams } from 'types/jira-integration';
import { SyncOutlined } from '@ant-design/icons';

const createToolItem = (title: string, description: string, icon: ReactNode, handleClick?: VoidFunction) => ({
  title,
  description,
  icon,
  handleClick,
});

export const toolSetDataHandle: ToolSetDataParams = ({
  handleAnalyticsClick,
  handleDocumentClick,
  handleJiraClick,
  handleSyncPropertiesClick,
  isJiraConnected,
}) => [
  createToolItem(ANALYTICS_TITLE, ANALYTICS_DESCRIPTION, <AnalysisSvg />, handleAnalyticsClick),
  createToolItem(DOCUMENT_REPOSITORY_TITLE, DOCUMENT_REPOSITORY_DESCRIPTION, <RepositorySvg />, handleDocumentClick),
  createToolItem(
    isJiraConnected ? JIRA_CONNECTED_TITLE : JIRA_NOT_CONNECTED_TITLE,
    isJiraConnected ? JIRA_DESCRIPTION : '',
    <JiraSvg />,
    handleJiraClick
  ),
  createToolItem(SYNC_PROPERTIES, SYNC_PROPERTIES_DESCRIPTION, <SyncOutlined />, handleSyncPropertiesClick),
];
