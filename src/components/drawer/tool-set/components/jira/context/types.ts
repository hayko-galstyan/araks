export enum JiraActionType {
  SET_PAGE_NAME = 'SET_PAGE_NAME',
  SET_OPEN_TOOLSET = 'SET_OPEN_TOOLSET',
  SET_HIDE_LEFT_SECTION = 'SET_HIDE_LEFT_SECTION',
  SET_IS_SUCCESS_MODE = 'SET_IS_SUCCESS_MODE',
  SET_OPEN_TASK_VIEW = 'SET_OPEN_TASK_VIEW',
  SET_NODE_ID = 'SET_NODE_ID',
  RESET_OPEN_VIEW_JIRA = 'RESET_OPEN_VIEW_JIRA',
}

export interface JiraState {
  pageName: string | undefined;
  openToolset: boolean;
  isSuccess: boolean;
  hideLeftSection: boolean;
  node_id: string | undefined;
  openViewJira: {
    edit: boolean;
    task: boolean;
    list: boolean;
    connect: boolean;
  };
}

export interface JiraAction {
  type: JiraActionType;
  payload: string | boolean;
}

export type JiraContextType = {
  pageName: string | undefined;
  openToolset: boolean;
  hideLeftSection: boolean;
  node_id: string | undefined;
  openViewJira: {
    edit: boolean;
    task: boolean;
    list: boolean;
    connect: boolean;
  };
  setPageName: (payload: string) => void;
  setOpenToolset: (payload: boolean) => void;
  setHideLeftSection: (payload: boolean) => void;
  setOpenViewJira: (payload: string) => void;
  setNodeId: (payload: string) => void;
  navigateIssueJira: (url: string, issue_key: string) => void;
  generationWithStatusColor: (status: string) => string;
  setResetOpenViews: () => void;
};

export type Props = { children: React.ReactNode };
