import { createContext, useContext, useEffect, useMemo, useReducer, useCallback, useState } from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';
import { JiraActionType, JiraContextType, Props } from './types';
import { jiraInitialState, jiraReducer } from './reducer';
import { AUTH_KEYS, COLORS } from 'helpers/constants';
import { useGetUsersMe } from 'api/user/use-get-users-me';
import { useLocalStorage } from 'hooks/use-local-storage';
import { UserDetails } from 'types/auth';
import { Modal } from 'antd';

const JiraContext = createContext<JiraContextType | undefined>(undefined);

const JiraProvider = ({ children }: Props) => {
  const [isJiraConnected, setIsJiraConnected] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const queryParams = new URLSearchParams(window.location.search);
  const errorMessage = queryParams.get('jiraConnectErrorMessage');
  const location = useLocation();
  const { getItem, setItem } = useLocalStorage();

  const [searchParams, setSearchParams] = useSearchParams();

  const { data } = useGetUsersMe({
    enabled: isJiraConnected,
    onSuccess: () => {
      const user = JSON.parse(getItem(AUTH_KEYS.USER) as string) as UserDetails;
      user.jira_account_id = data?.jira_account_id;
      setItem(AUTH_KEYS.USER, JSON.stringify(user));
    },
  });

  const [state, dispatch] = useReducer(jiraReducer, jiraInitialState);

  const handleAction = useCallback((type: JiraActionType, payload: string | boolean) => {
    dispatch({ type, payload });
  }, []);

  const callbacks = useMemo(
    () => ({
      setPageName: (payload: string) => handleAction(JiraActionType.SET_PAGE_NAME, payload),
      setOpenToolset: (payload: boolean) => handleAction(JiraActionType.SET_OPEN_TOOLSET, payload),
      setHideLeftSection: (payload: boolean) => handleAction(JiraActionType.SET_HIDE_LEFT_SECTION, payload),
      setOpenViewJira: (payload: string) => handleAction(JiraActionType.SET_OPEN_TASK_VIEW, payload),
      setNodeId: (payload: string) => handleAction(JiraActionType.SET_NODE_ID, payload),
      setResetOpenViews: () => handleAction(JiraActionType.RESET_OPEN_VIEW_JIRA, true),
    }),
    [handleAction]
  );

  const navigateIssueJira = useCallback((url: string, issue_key: string) => {
    window.open(url.concat(issue_key));
  }, []);

  const generationWithStatusColor = useCallback((status: string) => {
    switch (status) {
      case 'In Progress':
        return COLORS.JIRA.BLUE;
      case 'Done':
        return COLORS.JIRA.GREEN;
      default:
        return COLORS.JIRA.GRAY;
    }
  }, []);

  const context = useMemo(
    () => ({ ...callbacks, ...state, generationWithStatusColor, navigateIssueJira }),
    [callbacks, generationWithStatusColor, navigateIssueJira, state]
  );
  const handleModalClose = () => {
    setIsModalVisible(false);
    setSearchParams('');
  };

  useEffect(() => {
    if (location.search.includes('jiraConnect')) {
      setIsJiraConnected(searchParams.get('jiraConnect') === 'true');
      handleAction(JiraActionType.SET_OPEN_TOOLSET, true);
    }
    const decodedErrorMessage = decodeURIComponent(errorMessage || '');
    if (isJiraConnected === false && decodedErrorMessage !== '') {
      setIsModalVisible(true);
    } else {
      setIsModalVisible(false);
    }
  }, [location.search, searchParams, setSearchParams, handleAction, isJiraConnected, errorMessage]);

  return (
    <JiraContext.Provider value={context}>
      {children}
      <Modal
        title="Error Connecting to Jira"
        open={isModalVisible}
        onOk={handleModalClose}
        cancelButtonProps={{ style: { display: 'none' } }}
        closeIcon={null}
      >
        <p>{decodeURIComponent(errorMessage || '')}</p>
      </Modal>
    </JiraContext.Provider>
  );
};

const useJira = () => {
  const context = useContext(JiraContext);
  if (context === undefined) {
    throw new Error('useJira must be used within a JiraProvider');
  }
  return context;
};

export { JiraProvider, useJira };
