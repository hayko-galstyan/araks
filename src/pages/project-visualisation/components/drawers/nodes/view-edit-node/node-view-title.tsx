import { EditOutlined } from '@ant-design/icons';
import { Space } from 'antd';
import { Button } from 'components/button';
import { MenuText } from 'components/typography';
import { Icon } from 'components/icon';
import { useGraph } from 'components/layouts/components/visualisation/wrapper';
import { NodeCommentDrawer } from 'components/drawer/node-drawer/node-comment-drawer';
import { Comments } from 'pages/project-overview/components/comment-like/comments';
import { ReactComponent as JiraSvg } from 'components/icons/jira.svg';

type ViewNodeProps = {
  id: string;
  name: string;
  isEdit: boolean;
  isJira: boolean;
  canEdit?: boolean;
  setIsEdit: (x: boolean) => void;
  setIsJira: (x: boolean) => void;
  parentDrawerClosed: boolean;
  onClose: () => void;
};

export const NodeViewTitle = ({
  id,
  name,
  isEdit,
  setIsEdit,
  canEdit,
  isJira,
  setIsJira,
  parentDrawerClosed,
}: ViewNodeProps) => {
  const { startDeleteNode } = useGraph();

  const handleClickChangeContent = (type: string) => {
    setIsEdit(type === 'edit');
    setIsJira(type === 'jira');
  };

  return (
    <Space style={{ width: '100%', justifyContent: 'space-between' }}>
      <div>
        <MenuText strong>{name}</MenuText>
      </div>
      {canEdit ? (
        <div>
          <Button
            type="link"
            disabled={isEdit}
            icon={<EditOutlined />}
            onClick={() => handleClickChangeContent('edit')}
          />
          <NodeCommentDrawer nodeId={id} parentDrawerClosed={parentDrawerClosed}>
            <Comments nodeId={id} />
          </NodeCommentDrawer>
          <Button type="link" disabled={isJira} icon={<JiraSvg />} onClick={() => handleClickChangeContent('jira')} />
          <Button
            type="link"
            icon={<Icon color="#414141" icon="delete_outline-simple" size={24} />}
            onClick={() => startDeleteNode({ id })}
          />
        </div>
      ) : (
        <></>
      )}
    </Space>
  );
};
