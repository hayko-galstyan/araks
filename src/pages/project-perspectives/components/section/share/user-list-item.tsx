import React, { useMemo, useState } from 'react';
import { Avatar, Flex, Grid, List } from 'antd';
import { Text } from 'components/typography';
import { SelectItems } from 'components/select/share-select';
import styled from 'styled-components';
import { useCreatePerspectiveUser } from 'api/perspective/shared-users/use-create-perspective-user';
import { UserProjectRole } from 'api/types';
import { useProject } from 'context/project-context';
import { ROLE_OPTIONS } from 'helpers/constants';
import { ReactComponent as Delete } from 'components/icons/delete.svg';
import { DeleteSharedUserModal } from 'components/modal/delete-share-user-modal';

type Props = React.FC<{
  id: string;
  index: number;
  visibleMetaData?: boolean;
  user: { id: string; title: string; value: string; avatar: string | undefined };
}>;

const BUILT_IN_PLACEMENTS = {
  bottomLeft: {
    points: ['tl', 'bl'],
    offset: [0, 0],
    overflow: {
      adjustX: 0,
      adjustY: 1,
    },
  },
  topLeft: {
    points: ['bl', 'tl'],
    offset: [0, -0],
    overflow: {
      adjustX: 0,
      adjustY: 1,
    },
  },
};

const Share = styled.div`
  && {
    .ant-select-selector {
      border-color: white !important;
      background: linear-gradient(91.54deg, rgba(232, 235, 248, 0.7) 5.25%, rgba(232, 235, 248, 0.2) 97.48%);
      align-items: center;
      min-width: 134px;
      height: 40px;
    }
  }
`;
const ListMeta = styled(List.Item.Meta)`
  .ant-list-item-meta-content {
    flex-basis: max-content !important;
  }

  .ant-list-item-meta-description {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    width: 200px;
  }
`;
const { useBreakpoint } = Grid;

export const UserListItem: Props = ({ id, index, user, visibleMetaData = true }) => {
  const [isDeleteMembers, setDeleteMembers] = useState(false);
  const [isDeleteUserId, setDeleteUserId] = useState('');

  const { mutate } = useCreatePerspectiveUser({}, id);
  const { projectInfo } = useProject();

  const value = useMemo(
    () => (user.value === 'owner' ? `Owner` : ROLE_OPTIONS.find((r) => r.value === user.value)?.value),
    [user.value]
  );

  const changeRole = (role: string) => {
    mutate({
      perspective_user_id: user.id,
      role,
    });
  };
  const screenSize = useBreakpoint();

  return (
    <>
      <List.Item
        actions={[
          <Flex key={index} gap={10} align="center">
            <Share>
              <SelectItems
                builtinPlacements={BUILT_IN_PLACEMENTS}
                onChange={changeRole}
                disabled={user.value === 'owner' || projectInfo?.role !== UserProjectRole.Owner}
                popupClassName="role-dropdown"
                value={value}
                options={ROLE_OPTIONS} 
              />
            </Share>
            <Flex
              style={{ cursor: 'pointer' }}
              onClick={() => {
                setDeleteMembers(true);
                setDeleteUserId(user?.id);
              }}
            >
              {user.value !== 'owner' && <Delete />}
            </Flex>
          </Flex>,
        ]}
        style={{ display: !screenSize.xl ? 'block' : 'flex' }}
      >
        {visibleMetaData && (
          <ListMeta avatar={<Avatar src={user.avatar} />} description={<Text title={user.title}>{user.title}</Text>} />
        )}
      </List.Item>
      {isDeleteUserId && (
        <DeleteSharedUserModal
          id={isDeleteUserId}
          setDeleteMembers={setDeleteMembers}
          isDeleteMembers={isDeleteMembers}
        />
      )}
    </>
  );
};
