import { Radio as RadioComponent, Row, Space } from 'antd';
import { useUpdateTemplate } from 'api/project-templates/use-update-template';
import { Button } from 'components/button';
import { Modal } from 'components/modal';
import { VerticalSpace } from 'components/space/vertical-space';
import { Text } from 'components/typography';
import { Input } from 'components/input';
import { TemplatesItemInfo } from 'api/types';
import { ReactComponent as Users } from 'components/icons/users.svg';
import { ReactComponent as Globe } from 'components/icons/globe.svg';
import TextArea from 'antd/es/input/TextArea';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
const RadioGroup = styled(RadioComponent.Group)`
  &.ant-radio-group {
    display: flex;
    flex-direction: row;
    justify-content: center;
    gap: 17px;
  }
`;
const RadioButton = styled(RadioComponent.Button)`
  &&.ant-radio-button-wrapper {
    height: 52px;
    min-width: 200px;
    box-shadow: 0px 4px 6px rgba(111, 111, 111, 0.1);
    border: 1px solid #dddddd;
    border-radius: 4px;
    padding: 13px 18px;

    .ant-typography {
      color: #808080;
    }

    .icon path {
      fill: #808080;
    }

    &.ant-radio-button-wrapper-checked {
      border: 1px solid rgba(200, 203, 218, 0.5);
      background: #d5d7df;
      .ant-radio-button-checked {
      }

      .icon path {
        fill: #414141;
      }

      .ant-typography {
        color: #414141;
      }
    }

    &::before {
      background-color: transparent;
    }
  }
`;
const ErrorMessage = styled.text`
  & {
    color: red;
    font-size: 18px;
  }
`;
const Label = styled.text`
  & {
    color: #c5c5c5;
    font-size: 16px;
    font-weight: 600;
    font-family: 'Rajdhani';
  }
`;

type Props = {
  isModalOpen: boolean;
  closePreview?: () => void;
  setIsModalOpen: (value: boolean | ((prevVar: boolean) => boolean)) => void;
  item: TemplatesItemInfo;
};

export const EditTemplateModal = ({ isModalOpen, setIsModalOpen, item, closePreview }: Props) => {
  const [data, setData] = useState<TemplatesItemInfo>(item);
  const [error, setError] = useState<{
    title: string | null;
    description: string | null;
  }>({ title: null, description: null });
  const mutation = useUpdateTemplate(item.id); 

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const SaveTemplate = () => {
    mutation.mutate({
      name:data.name,
      description:data.description,
      privacy:data.privacy,
      project_id: data.id
    });
    setIsModalOpen(false);
    if (closePreview) closePreview();
  };
  useEffect(() => {
    if (data.name.length === 0) {
      setError({ ...error, title: 'Title is required' });
    } else if (data.name.length > 0 && data.name.length < 3) {
      setError({ ...error, title: 'The minimum length for this field is 3 characters' });
    } else if (data.name.length > 30) {
      setError({ ...error, title: 'The maximum length for this field is 30 characters' });
    } else error.title !== null && setError({ ...error, title: null });
    if (data.description !== undefined && data.description?.length > 256) {
      setError({ ...error, description: 'The maximum length for this field is 256 characters' });
    } else error.description !== null && setError({ ...error, description: null });
  }, [data.name, data.description, error]);

  return (
    <>
      <Modal open={isModalOpen} footer={false} closable={false} className="project-modal">
        <VerticalSpace>
          <Text>Edit template</Text>

          <Row>
            <Label>Template name</Label>
            <Input defaultValue={data.name} onChange={(e) => setData({ ...data, name: e.target.value })} />
            {error.title !== null && <ErrorMessage>{error.title}</ErrorMessage>}
          </Row>
          <Row>
            <Label>Description</Label>
            <TextArea rows={4} maxLength={257} defaultValue={item.description} onChange={(e) => setData({ ...data, description: e.target.value })} />
            {error.description !== null && <ErrorMessage>{error.description}</ErrorMessage>}
          </Row>

          <RadioGroup buttonStyle="solid" defaultValue={item.privacy}>
            <RadioButton value="public" checked={true} onClick={() => setData({ ...data, privacy: 'public' })}>
              <Space size={30}>
                <Globe className="icon" />
                <Text>Public</Text>
              </Space>
            </RadioButton>
            <RadioButton value="private" onClick={() => setData({ ...data, privacy: 'private' })}>
              <Space size={30}>
                <Users className="icon" />
                <Text>Private</Text>
              </Space>
            </RadioButton>
          </RadioGroup>

          <Button block onClick={SaveTemplate} type="primary">
            Save
          </Button>
          <Button block type="default" onClick={handleCancel}>
            Cancel
          </Button>
        </VerticalSpace>
      </Modal>
    </>
  );
};
