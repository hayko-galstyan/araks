import { Drawer as DrawerWrapper } from 'antd';
import { ToolSetJira } from './components/jira';
import { useToolsetHandlers } from './hooks/useToolsetHandlers';
import { useToolsetData } from './hooks/useToolsetData';
import { bodyStyle, contentStyle, drawerPosition, drawerStyle, maskStyle } from './styles';
import { useJira } from './components/jira/context';
import { CloseOutlined } from '@ant-design/icons';

export const ToolSetDrawer = () => {
  const { openToolset: open, setOpenToolset } = useJira();
  const { isJira, handleAnalyticsClick, handleDocumentClick, handleJiraClick, handleSyncPropertiesClick } =
    useToolsetHandlers();
  const toolset = useToolsetData(handleAnalyticsClick, handleDocumentClick, handleJiraClick, handleSyncPropertiesClick);

  const styles = {
    bodyStyle,
    drawerStyle,
    maskStyle,
    contentWrapperStyle: { ...contentStyle, ...drawerPosition() },
  };

  const props = {
    open,
    mask: true,
    onClose: () => setOpenToolset(false),
    closable: true,
    closeIcon: <CloseOutlined />,
    getContainer: undefined,
    ...styles,
  };

  return (
    <DrawerWrapper {...props}>{isJira ? <ToolSetJira handleBackClick={handleJiraClick} /> : toolset}</DrawerWrapper>
  );
};
