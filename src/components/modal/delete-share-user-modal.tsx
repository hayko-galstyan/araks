import { Button } from 'components/button';
import { Modal } from 'components/modal';
import { VerticalSpace } from 'components/space/vertical-space';
import { Text } from 'components/typography';
import { useDeleteMember } from 'api/perspective/shared-users/use-delete-user';
import React from 'react';
import { useGetAllMembers } from 'api/perspective/shared-users/use-get-all-members';

type Props = {
  id: string;
  isDeleteMembers?: boolean;
  setDeleteMembers?: React.Dispatch<React.SetStateAction<boolean>>;
};

export const DeleteSharedUserModal = ({ id, setDeleteMembers, isDeleteMembers }: Props) => {
  const pagination = { page: 1, size: 10, search: '' };

  const { data } = useGetAllMembers(pagination);
  const perspectiveId = data?.rows?.find((user) => user?.perspective_user_id === id)?.perspective_id;
  const { mutate: deleteMember } = useDeleteMember(pagination);

  const handleCancel = () => {
    setDeleteMembers && setDeleteMembers(false);
  };

  const handleDelete = async () => {
    try {
      deleteMember({ id: perspectiveId as string, perspective_user_id: id });
      setDeleteMembers && setDeleteMembers(false);
    } catch (error) {}
  };
  return (
    <>
      <Modal
        title={<Text style={{ textAlign: 'center' }}>Are you sure you want to delete this member?</Text>}
        open={isDeleteMembers}
        footer={false}
        closable={false}
        className="project-modal"
      >
        <VerticalSpace>
          <Button block onClick={handleDelete} type="primary">
            Delete
          </Button>
          <Button block type="default" onClick={handleCancel}>
            Cancel
          </Button>
        </VerticalSpace>
      </Modal>
    </>
  );
};
