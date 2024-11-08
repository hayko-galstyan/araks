import React, { useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Modal, Button, Form, Popover, Space } from 'antd';
import { AddGroupCard } from 'components/card/group-card/add-card';
import { Text } from 'components/typography';
import { ReactComponent as InfoIcon } from 'components/icons/info.svg';
import { Search } from 'components/search';
import { VerticalSpace } from 'components/space/vertical-space';
import { COLORS, PATHS } from 'helpers/constants';

type TCreateNewProjectProps = {
  isOpen: boolean;
  projectId?: string;
  projectListId?: string | undefined;
  onSetIsOpenModal: () => void;
  onSetIsProjectId: (value: string | undefined) => void;
  setIsProjectListId: (value: string | undefined) => void;
  onFinish: () => void;
};

const content = (
  <div style={{ maxWidth: '300px' }}>
    <p>Select this option if you want to add a project from your existing projects list.</p>
  </div>
);

export const CreateNewProjectModal: React.FC<TCreateNewProjectProps> = ({
  isOpen,
  projectId,
  onSetIsOpenModal,
  onSetIsProjectId,
  onFinish,
  setIsProjectListId,
  projectListId,
}) => {
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const disabledAddButton = useMemo(() => !projectListId, [projectListId]);

  useEffect(() => {
    form.resetFields();
  }, [isOpen, form]);

  return (
    <Modal width="70vw" title="Add Project" open={isOpen} onCancel={onSetIsOpenModal} footer={null}>
      <div style={{ display: 'flex', flexWrap: 'nowrap', justifyContent: 'center', gap: '80px', padding: '0 93px' }}>
        <AddGroupCard
          handleClick={() => navigate(PATHS.PROJECT_CREATE)}
          title="Add New Project"
          style={{ width: '300px', height: '300px' }}
        />
        <div>
          <Space>
            <Text style={{ fontSize: '20px' }}>From my existing project</Text>
            <Popover placement="right" content={content} title="Add Project Info" trigger="hover">
              <InfoIcon style={{ cursor: 'pointer' }} />
            </Popover>
          </Space>
          <Form form={form} layout="vertical" onFinish={onFinish}>
            <Form.Item
              name="project"
              label={
                <Text color={COLORS.SECONDARY.LIGHT_SILVER} style={{ fontSize: '16px' }}>
                  Project name
                </Text>
              }
            >
              <Search
                typeSearch="projects"
                onSetIsProjectId={onSetIsProjectId}
                setIsProjectListId={setIsProjectListId}
                placeholder="Search Projects"
              />
            </Form.Item>
            <VerticalSpace>
              <Button disabled={disabledAddButton} htmlType="submit" type="primary" block>
                Add Project
              </Button>
              <Button block type="default" onClick={onSetIsOpenModal}>
                Cancel
              </Button>
            </VerticalSpace>
          </Form>
        </div>
      </div>
    </Modal>
  );
};
