import { JiraAction, JiraActionType, JiraState } from './types';

export const jiraInitialState: JiraState = {
  pageName: undefined,
  openToolset: false,
  isSuccess: false,
  hideLeftSection: false,
  node_id: undefined,
  openViewJira: {
    edit: false,
    task: false,
    list: false,
    connect: false,
  },
};

export const jiraReducer = (state: JiraState, action: JiraAction): JiraState => {
  switch (action.type) {
    case JiraActionType.SET_PAGE_NAME:
      return { ...state, pageName: action.payload as string };
    case JiraActionType.SET_OPEN_TOOLSET:
      return { ...state, openToolset: action.payload as boolean };
    case JiraActionType.SET_IS_SUCCESS_MODE:
      return { ...state, isSuccess: action.payload as boolean };
    case JiraActionType.SET_HIDE_LEFT_SECTION:
      return { ...state, hideLeftSection: action.payload as boolean };
    case JiraActionType.SET_OPEN_TASK_VIEW:
    case JiraActionType.SET_OPEN_TASK_VIEW:
      return {
        ...state,
        openViewJira: {
          edit: action.payload === 'edit',
          task: action.payload === 'task',
          list: action.payload === 'list',
          connect: action.payload === 'connect',
        },
      };
    case JiraActionType.RESET_OPEN_VIEW_JIRA:
      return {
        ...state,
        openViewJira: { edit: false, task: false, list: false, connect: false },
      };
    case JiraActionType.SET_NODE_ID:
      return { ...state, node_id: action.payload as string };
    default:
      return state;
  }
};
