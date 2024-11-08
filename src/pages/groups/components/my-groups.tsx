import React, { useCallback, useEffect, useState } from 'react';
import { GroupCard } from 'components/card/group-card';
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import { Wrapper } from './styled';
import { CreateNewGroupModal } from 'components/modal/create-new-group-modal';
import { AddGroupCard } from 'components/card/group-card/add-card';
import { useGetAllGroups } from 'api/groups/use-get-all-groups';
import { useCreateNewGroup } from 'api/groups/use-create-new-group';
import { useGetGroupById } from 'api/groups/use-get-group-by-id';
import { useUpdateGroup } from 'api/groups/use-update-group';
import { useDeleteGroupById } from 'api/groups/use-delete-group-by-id';
import { TGroupItem } from 'api/groups/types';

export const MyGroups: React.FC = () => {
  const [openModal, setIsOpenModal] = useState<boolean>(false);
  const [groupId, setIsGroupId] = useState<string | null>(null);

  const { data: allGroups, isLoading } = useGetAllGroups();
  const { data } = useGetGroupById(groupId ?? '');

  const { mutate: createNewGroupFn, isLoading: isCreateLoading } = useCreateNewGroup();
  const { mutate: updateGroupFn } = useUpdateGroup();
  const { mutate: deleteGroupFn } = useDeleteGroupById();

  const handleOpenModal = useCallback(() => setIsOpenModal((prev) => !prev), []);

  const onFinish = (value: { name: string; description: string }) => {
    if (groupId) {
      updateGroupFn(
        { id: groupId, data: value },
        {
          onSuccess: () => {
            setIsOpenModal(false);
          },
        }
      );
    } else {
      if (value.name.length > 2) {
        createNewGroupFn(value, {
          onSuccess: () => {
            setIsOpenModal(false);
          },
        });
      }
    }
  };

  const handleDeleteGroup = (id: string) => {
    deleteGroupFn(id);
  };

  const handelAddNewGroup = () => {
    setIsOpenModal(true);
    setIsGroupId(null);
  };

  useEffect(() => {
    if (!openModal) {
      setIsGroupId(null);
    }
  }, [openModal]);

  return (
    <>
      <Spin indicator={<LoadingOutlined />} spinning={isLoading}>
        <Wrapper>
          <AddGroupCard handleClick={handelAddNewGroup} title="Add Group" />
          {allGroups?.data?.map((item) => (
            <GroupCard
              key={item.id}
              data={{
                admin_id: item?.admin?.id,
                id: item.id,
                title: item.name,
                description: item.description,
                members_count: item.members_count,
                projects_count: item.projects_count,
              }}
              isHasPermission={true}
              onDeleteGroup={handleDeleteGroup}
              onSetGroupId={setIsGroupId}
            />
          ))}
        </Wrapper>
      </Spin>
      <CreateNewGroupModal
        data={data || ({} as TGroupItem)}
        onFinish={onFinish}
        openModal={openModal}
        onSetIsOpenModal={handleOpenModal}
        isLoading={isCreateLoading}
      />
    </>
  );
};
