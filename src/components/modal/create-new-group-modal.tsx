import { Button, Form, Popover } from 'antd';
import { Input, TextArea } from 'components/input';
import { VerticalSpace } from 'components/space/vertical-space';
import { Modal } from './index';
import { Text } from 'components/typography';
import { ReactComponent as InfoIcon } from '../icons/info.svg';
import { TGroupItem } from 'api/groups/types';
import { useEffect } from 'react';
import { LoadingOutlined } from '@ant-design/icons';

type TCreateNewGroupModalProps = {
  openModal: boolean;
  onSetIsOpenModal: () => void;
  onFinish: (value: { name: string; description: string }) => void;
  data: TGroupItem;
  isLoading: boolean;
};

const content = (
  <div style={{ width: '300px' }}>
    <p>Select this option if you want to add a Group from your existing Group list.</p>
  </div>
);

export const CreateNewGroupModal: React.FC<TCreateNewGroupModalProps> = ({
  openModal,
  onSetIsOpenModal,
  onFinish,
  data,
  isLoading,
}) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (data?.name) {
      form.setFieldsValue({
        name: data?.name,
        description: data?.description,
      });
      onSetIsOpenModal();
    } else {
      form.resetFields();
    }
  }, [data, form, onSetIsOpenModal]);

  return (
    <Modal
      footer={false}
      title={
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <Text style={{ fontSize: '20px' }}>Add Grnnnoup</Text>
          <Popover title="Add Group Info" placement="right" content={content}>
            <InfoIcon style={{ cursor: 'pointer' }} />
          </Popover>
        </div>
      }
      open={openModal}
      onCancel={onSetIsOpenModal}
    >
      <Form form={form} onFinish={onFinish} layout="vertical">
        <Form.Item
          name="name"
          rules={[
            {
              required: true,
              message: 'Group name is required',
            },
            {
              min: 3,
              message: 'Group name must be at least 3 characters',
            },
          ]}
          label="Group Name"
        >
          <Input />
        </Form.Item>
        <Form.Item
          rules={[{ max: 200, message: 'Description max character 200' }]}
          name="description"
          label="Description"
        >
          <TextArea />
        </Form.Item>
        <VerticalSpace>
          <Button disabled={isLoading} htmlType="submit" block type="primary">
            Save {isLoading && <LoadingOutlined />}
          </Button>
          <Button block type="default" onClick={onSetIsOpenModal}>
            Cancel
          </Button>
        </VerticalSpace>
      </Form>
    </Modal>
  );
};
