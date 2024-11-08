import { UseQueryOptions } from '@tanstack/react-query';
import { CSSProperties, Dispatch, FC, ReactNode, SetStateAction } from 'react';

export interface IJiraProject {
  id: string;
  key: string;
  name: string;
}

export interface IJiraIssueTypes {
  id: string;
  name: string;
}

export interface IJiraTaskItem {
  id: string;
  user_id: string;
  project_id: string;
  node_id: string;
  jira_project_ref_id: string;
  jira_project_id: string;
  project_key: string;
  issue_id: string;
  issue_key: string;
  name: string;
  description: string;
  assignee_id: string;
  assignee_name: string;
  assignee_image: string;
  reporter_id: string;
  reporter_name: string;
  reporter_image: string;
  status_id: string;
  status_name: string;
  issue_type_id: string;
  issue_type_name: string;
  dueDate: string;
  deleted_at: string | null;
  url?: string;
}
export interface IJiraIssue {
  jiraTask: IJiraTaskItem;
  url: string;
}

export interface IJiraStatus {
  id: string;
  status_id: string;
  name: string;
}

export interface IJiraUser {
  self: string;
  accountId: string;
  accountType: string;
  emailAddress: string;
  avatarUrls: {
    '48x48': string;
    '24x24': string;
    '16x16': string;
    '32x32': string;
  };
  displayName: string;
  active: boolean;
  timeZone: string;
  locale: string;
}

export interface IJiraUsers {
  project: {
    id: string;
    user_id: string;
    project_id: string;
    jira_project_id: string;
    project_key: string;
    name: string;
    created_at: string;
    updated_at: string;
  };
  users: Array<IJiraUser>;
}

type ClickHandlers = {
  handleAnalyticsClick: VoidFunction;
  handleDocumentClick: VoidFunction;
  handleSyncPropertiesClick: VoidFunction;
  handleJiraClick: VoidFunction;
  isJiraConnected?: boolean;
  isJira?: boolean;
};

type ToolSetItem = {
  title: string;
  description: string;
  icon: ReactNode;
  handleClick?: VoidFunction;
};

type JiraIntegrationProps = {
  data: IJiraProject[];
  handleBackClick: VoidFunction;
  selected?: string;
  jiraConnect?: IJiraProject;
  setSelectedProject?: Dispatch<SetStateAction<string | undefined>>;
};

export type ToolSetDataParams = (params: ClickHandlers) => ToolSetItem[];

export type JiraIntegrationContent = (props: JiraIntegrationProps) => JSX.Element;

export type UseToolsetHandlers = () => ClickHandlers;

export type ClickableColProps = {
  children: ReactNode;
  onClick: VoidFunction;
  style?: CSSProperties;
  span?: number;
};

export type FlexColProps = {
  children: ReactNode;
  span: number;
  style?: CSSProperties;
};

export type TToolSetJiraHeaderProps = FC<{
  handleBackClick: VoidFunction;
  selectedProject?: string;
  jiraConnect?: IJiraProject;
}>;

export interface IJiraProjectActionPopoverProps {
  onClickDelete: VoidFunction;
}

export interface IJiraTasksParams {
  page: number;
  size: number;
}

export interface IJiraTasksData {
  url: string;
  count: number;
  data: IJiraTaskItem[];
}

export type TUseGetProjectTasks = (
  params: IJiraTasksParams,
  options?: UseQueryOptions<{ data: IJiraTasksData }, Error, IJiraTasksData>
) => {
  data: IJiraTasksData;
  isSuccess: boolean;
  isLoading: boolean;
};

export type TWarningProps = {
  isOpen?: boolean;
  onClose: VoidFunction;
  onSubmit: VoidFunction;
  title: string;
  text: string;
};
