import React, { useState } from 'react';
import { Modal } from './index';
import { ShareInputItemAddon } from 'components/form/share-input-item';
import { Text } from 'components/typography';
import { Form } from 'antd';
import { Button } from 'components/button';
import { VerticalSpace } from 'components/space/vertical-space';
import { useCreateNewGroupMember } from 'api/groups/use-create-group-new-member';
import { useParams } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';
import { URL_GET_ALL_MEMBERS_GROUP } from 'api/groups/constant';
import { WarningModal } from './warning-modal';
import { ErrorResponse } from './types';
import { LoadingOutlined } from '@ant-design/icons';
import { ReactComponent as InfoIcon } from 'components/icons/info.svg';

type TCreateNewMemberGroupProps = {
  isOpen: boolean;
  onHandleOpenModal: () => void;
};

export const CreateNewMemberGroupModal: React.FC<TCreateNewMemberGroupProps> = ({ isOpen, onHandleOpenModal }) => {
  const [warningModalProps, setWarningModalProps] = useState({
    isOpen: false,
    title: '',
    text: '',
    id: '',
  });
  const [form] = Form.useForm();
  const { id } = useParams();
  const queryClient = useQueryClient();

  const { mutate: createGroupMemberFn, isLoading } = useCreateNewGroupMember();

  const onFinish = (data: { userId: string; role: string }) => {
    createGroupMemberFn(
      { user_id: data?.userId, group_id: id ?? '', role: data.role ?? 'edit' },
      {
        onSuccess: () => {
          queryClient.invalidateQueries([URL_GET_ALL_MEMBERS_GROUP]);
          onHandleOpenModal();
        },
        onError: (error: unknown) => {
          const errorMessage =
            (error as ErrorResponse).response?.data?.errors?.message ||
            (error as ErrorResponse).message ||
            'An unknown error occurred';
          const group_id = (error as ErrorResponse).response?.data?.errors?.id;
          setWarningModalProps({
            isOpen: true,
            title: 'User Permission Conflict',
            text: errorMessage,
            id: group_id,
          });
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
            <Text style={{ fontSize: '20px' }}>New Member</Text>
            <InfoIcon />
          </div>
        }
      >
        <Form form={form} onFinish={(values) => onFinish(values)} autoComplete="off" layout="vertical">
          <div style={{ position: 'relative', marginBottom: '24px' }}>
            <ShareInputItemAddon />
          </div>
          <VerticalSpace>
            <Button disabled={isLoading} htmlType="submit" block type="primary">
              Save {isLoading && <LoadingOutlined />}
            </Button>
            <Button block type="default" onClick={onHandleOpenModal}>
              Cancel
            </Button>
          </VerticalSpace>
        </Form>
      </Modal>
      <WarningModal
        isOpen={warningModalProps.isOpen}
        onClose={() => setWarningModalProps({ ...warningModalProps, isOpen: false })}
        title={warningModalProps.title}
        text={warningModalProps.text}
      />
    </>
  );
};
