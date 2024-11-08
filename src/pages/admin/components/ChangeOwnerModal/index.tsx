import React, { useState } from 'react';
import { Text } from 'components/typography';
import { Modal, Space, Image } from 'antd';
import { Button } from 'components/button';
import { ReactComponent as InfoIcon } from 'components/icons/info.svg';
import { SelectUserWithSearch } from './SelectUserWithSearch';
import styled from 'styled-components';
import { getAvatarPath } from 'helpers/utils';
import { useChangeProjectOwner } from 'api/admin/use-put-project-owner-change';
import { LoadingOutlined } from '@ant-design/icons';
import { useChangeGroupOwner } from 'api/admin/use-put-group-owner-change';

type TChangeOwnerModalProps = {
  isOpen: boolean;
  onHandleOpenModal: () => void;
  role: 'Projects' | 'Groups';
  currentUserID: string;
  selectedIds: string[];
  setSelectedIds: (selectedIds: string[]) => void;
};
const StyledImage = styled(Image)`
  width: 20px;
  height: 20px;
  border-radius: 10px;
  object-fit: cover;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 50%;

  &:hover {
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
    transform: scale(1.05);
    transition: all 0.3s ease-in-out;
  }
`;

export const ChangeOwnerModal: React.FC<TChangeOwnerModalProps> = ({
  isOpen,
  onHandleOpenModal,
  currentUserID,
  selectedIds,
  setSelectedIds,
  role,
}) => {
  const [selectedUser, setSelectedUser] = useState<{ name: string; id: string; avatar?: string } | null>(null);
  const { mutate: ChangeProjectOwnerFn, isLoading } = useChangeProjectOwner();
  const { mutate: ChangeGroupOwnerFn, isLoading: isGroupLoading } = useChangeGroupOwner();

  const handleChange = () => {
    selectedUser && role === 'Projects'
      ? ChangeProjectOwnerFn(
          { user_id: selectedUser?.id, old_user_id: currentUserID, ids: selectedIds },
          {
            onSuccess: () => {
              onHandleOpenModal();
              setSelectedIds([]);
            },
          }
        )
      : selectedUser &&
        ChangeGroupOwnerFn(
          { user_id: selectedUser?.id, old_user_id: currentUserID, ids: selectedIds },
          {
            onSuccess: () => {
              onHandleOpenModal();
              setSelectedIds([]);
            },
          }
        );
  };

  return (
    <>
      <Modal
        open={isOpen}
        onCancel={onHandleOpenModal}
        closeIcon={false}
        footer={false}
        title={
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            {role === 'Projects' ? (
              <Text style={{ fontSize: '20px' }}>Would you like to update the Project(s) Owner?</Text>
            ) : (
              <Text style={{ fontSize: '20px' }}>Would you like to update the Group(s) Owner?</Text>
            )}

            <InfoIcon />
          </div>
        }
      >
        <div style={{ position: 'relative', marginBottom: '24px' }}>
          <SelectUserWithSearch setSelectedUser={setSelectedUser} currentUserID={currentUserID} />
        </div>
        <Space>
          {selectedUser?.avatar && (
            <StyledImage width={30} height={30} src={getAvatarPath(selectedUser?.avatar)} alt="User Image" />
          )}
          <p>{selectedUser?.name}</p>
        </Space>

        <Space style={{ justifyContent: 'space-around', width: '100%' }}>
          <Button block type="default" onClick={onHandleOpenModal}>
            Cancel
          </Button>
          <Button onClick={handleChange} disabled={!selectedUser || isLoading || isGroupLoading}>
            Change
            {isLoading || isGroupLoading && <LoadingOutlined />}
          </Button>
        </Space>
      </Modal>
    </>
  );
};
export { Modal };
