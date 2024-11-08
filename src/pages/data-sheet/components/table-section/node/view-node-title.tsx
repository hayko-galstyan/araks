import { UploadOutlined } from '@ant-design/icons';
import { Space } from 'antd';
import { UserProjectRole } from 'api/types';
import { Button } from 'components/button';
import { NodeCommentDrawer } from 'components/drawer/node-drawer/node-comment-drawer';
import { Icon } from 'components/icon';
import { ReactComponent as JiraSvg } from 'components/icons/jira.svg';
import { DeleteNodeModal } from 'components/modal/delete-node-modal';
import { MenuText, Text } from 'components/typography';
import { useViewDatasheet } from 'context/datasheet-view-vontext';
import { useOverview } from 'context/overview-context';
import { useProject } from 'context/project-context';
import { useIsPublicPage } from 'hooks/use-is-public-page';
import { Comments } from 'pages/project-overview/components/comment-like/comments';
import { useDataSheetWrapper } from 'components/layouts/components/data-sheet/wrapper';
import { DownloadFile } from 'components/actions/utils';
import { useLocalStorageGet } from 'hooks/use-local-storage-get';
import { AUTH_KEYS, PATHS } from 'helpers/constants';
import { useNavigate, useParams } from 'react-router-dom';
import { useGetProjectInfo } from 'api/projects/use-get-project-info';
import { useGetSelectedSearchData } from 'api/visualisation/use-get-selected-search';
import { useCallback } from 'react';
import { useJira } from 'components/drawer/tool-set/components/jira/context';

type ViewNodeProps = {
  id: string;
  isView: {
    jira: boolean;
    edit: boolean;
  };
  setIsView: (view: { jira: boolean; edit: boolean }) => void;
  onClose: () => void;
  drawerIsOpened: boolean;
};

export const ViewNodeTitle = ({ id, isView, setIsView, onClose, drawerIsOpened }: ViewNodeProps) => {
  const params = useParams();
  const navigate = useNavigate();

  const { mutate } = useGetSelectedSearchData(params?.id as string, {
    onSuccess: (data) => {
      navigate(`${isPublicPage ? PATHS.PUBLIC : ''}${PATHS.PROJECT_VISUALISATION}`.replace(':id', params?.id ?? ''), {
        state: {
          data: data.data,
        },
      });
    },
  });

  const token = useLocalStorageGet<string>(AUTH_KEYS.TOKEN, '');
  const { nodeTypeId } = useDataSheetWrapper();
  const { projectInfo } = useProject();
  const { state } = useOverview();
  const { setNodeId, setOpenViewJira } = useJira();
  const isPublicPage = useIsPublicPage();
  const { state: selectedView } = useViewDatasheet();
  const { data: projectData } = useGetProjectInfo({ id: params.id }, { enabled: !!params.id });

  const handleDownload = async () => {
    if (nodeTypeId) {
      await DownloadFile([nodeTypeId ?? ''], true, token, id, projectData?.title);
    }
  };

  const handleClickOpenJira = () => {
    handleChangeView('jira');
    setOpenViewJira('edit');
    setNodeId(id);
  };

  const handleChangeView = useCallback(
    (view: string) => {
      setIsView({ jira: view === 'jira', edit: view === 'edit' });
    },
    [setIsView]
  );

  return (
    <Space style={{ width: '100%', justifyContent: 'space-between' }}>
      <div>
        <MenuText strong>{state}</MenuText>
        {' / '}
        <Text>{selectedView?.name}</Text>
      </div>
      <Space>
        {projectInfo && projectInfo?.role !== UserProjectRole.Viewer && !isPublicPage && (
          <Button
            type="link"
            disabled={isView.edit}
            icon={<Icon color="#414141" icon="edit-simple-pen" size={20} />}
            onClick={() => handleChangeView('edit')}
          />
        )}
        <Button
          type="link"
          onClick={() => mutate({ id, action: 'node' })}
          icon={<Icon color="#414141" icon="visualisation" size={24} />}
        />
        <NodeCommentDrawer nodeId={id} parentDrawerClosed={!drawerIsOpened}>
          <Comments nodeId={id} />
        </NodeCommentDrawer>
        <Button
          type="link"
          onClick={handleDownload}
          icon={<UploadOutlined style={{ color: '#414141', fontSize: '24px' }} />}
        />
        <Button type="link" onClick={handleClickOpenJira} icon={<JiraSvg />} />
        {projectInfo && projectInfo?.role !== UserProjectRole.Viewer && !isPublicPage && (
          <DeleteNodeModal id={id} onClose={onClose} />
        )}
      </Space>
    </Space>
  );
};
