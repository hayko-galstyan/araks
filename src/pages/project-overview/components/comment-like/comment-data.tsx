import { Avatar, Divider, Form, List, Skeleton, Space } from 'antd';
import { useGetComments } from 'api/comments/use-get-comments';
import { useGetNodeComments } from 'api/comments/use-get-node-comments';
import { CommentData } from 'api/types';
import { Icon } from 'components/icon';
import { VerticalSpace } from 'components/space/vertical-space';
import { SecondaryText, Text, Title } from 'components/typography';
import { ShowSafeText } from 'components/typography/show-safe-text';
import { useAuth } from 'context/auth-context';
import dayjs from 'dayjs';
import { COLORS } from 'helpers/constants';
import { DeleteComment } from './delete-comment';

import './index.css';
import { getAvatarPath } from 'helpers/utils';
import { ReactComponent as EditSVG } from '../../../../components/icons/edit-pencil.svg';

interface CommentListProps {
  data: CommentData[];
  level: number;
  rowsData: CommentData[];
  nodeId?: string;
  toDo: (item: { id: string; comments: string }) => void;
}

const CommentList = ({ data, level, rowsData, nodeId, toDo }: CommentListProps) => {
  const form = Form.useFormInstance();
  const { user } = useAuth();

  const handleEditClick = (item: { id: string; comments: string }) => {
    toDo(item);
  };
  return (
    <>
      <List
        itemLayout="horizontal"
        dataSource={data}
        renderItem={(item) => {
          const childData = rowsData.filter((comment) => comment.parent_id === item.id);

          return (
            <VerticalSpace size={0}>
              <List.Item style={{ paddingLeft: level * 30 }}>
                <List.Item.Meta
                  avatar={<Avatar src={getAvatarPath(item.user.avatar)} />}
                  title={
                    <Space style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <VerticalSpace size={0}>
                        <SecondaryText
                          strong
                          color={COLORS.PRIMARY.BLUE}
                        >{`${item.user.first_name} ${item.user.last_name}`}</SecondaryText>
                        <SecondaryText color={COLORS.PRIMARY.GRAY}>
                          {dayjs(item.created_at).format('DD MM YYYY')}
                        </SecondaryText>
                      </VerticalSpace>
                      <Space>
                        {level < 2 && (
                          <Icon
                            color={COLORS.PRIMARY.BLUE}
                            icon="arrow-up-left1"
                            key="reply"
                            size={20}
                            style={{ cursor: 'pointer' }}
                            onClick={() => form.setFieldValue('parent_id', item.id)}
                          />
                        )}
                        {user && item.user.id === user?.id && (
                          <Space>
                            <DeleteComment id={item.id} key="delete" nodeId={nodeId} />
                            <EditSVG style={{ cursor: 'pointer' }} onClick={() => handleEditClick(item)} />
                          </Space>
                        )}
                      </Space>
                    </Space>
                  }
                  style={{ margin: 0 }}
                  description={
                    <Text color="#424242" className="comment-description">
                      <ShowSafeText text={item.comments} />
                    </Text>
                  }
                />
              </List.Item>
              <Divider style={{ margin: '4px 0' }} />
              {childData.length ? (
                <CommentList toDo={toDo} data={childData} rowsData={rowsData} level={level + 1} nodeId={nodeId} />
              ) : (
                <></>
              )}
            </VerticalSpace>
          );
        }}
      />
      {/* {level === 0 && <Divider />} */}
    </>
  );
};
interface CommentDataShowProps {
  toDo: (item: { id: string; comments: string }) => void;
}

export const CommentDataShow = ({ toDo }: CommentDataShowProps) => {
  const { rowsData, count, isInitialLoading, isFetched } = useGetComments();

  if (isFetched && !count) {
    return (
      <Title level={1} align="center" style={{ color: COLORS.SECONDARY.LIGHT_SILVER }}>
        No comments yet
      </Title>
    );
  }

  if (isInitialLoading) {
    return <Skeleton avatar title={false} loading={isInitialLoading} active />;
  }

  // Create a list of top-level comments (comments without parents)
  const topLevelComments = rowsData.filter((comment) => comment.parent_id === null);

  return (
    <div style={{ height: '100%', overflow: 'auto' }} className="scroll-container">
      {topLevelComments.map((comment) => (
        <CommentList toDo={toDo} key={comment.id} data={[comment]} rowsData={rowsData} level={0} />
      ))}
    </div>
  );
};

type NodeDataCommentsProps = {
  nodeId: string;
  toDo: (item: { id: string; comments: string }) => void;
};

export const CommentNodeDataShow = ({ nodeId, toDo }: NodeDataCommentsProps) => {
  const { rowsData, count, isInitialLoading, isFetched } = useGetNodeComments(nodeId);

  if (isFetched && !count) {
    return (
      <Title level={1} color={COLORS.PRIMARY.GRAY_DARK} align="center">
        No comments yet
      </Title>
    );
  }

  if (isInitialLoading) {
    return <Skeleton avatar title={false} loading={isInitialLoading} active />;
  }

  // Create a list of top-level comments (comments without parents)
  const topLevelComments = rowsData.filter((comment) => comment.parent_id === null);

  return (
    <div style={{ height: '100%', overflow: 'auto' }} className="scroll-container">
      {topLevelComments.map((comment) => (
        <CommentList toDo={toDo} key={comment.id} data={[comment]} rowsData={rowsData} level={0} nodeId={nodeId} />
      ))}
    </div>
  );
};
