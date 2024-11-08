import { useState } from 'react';
import { Col, Form, Row } from 'antd';
import { LabelName } from '../styles';
import { VerticalSpace } from '../../../space/vertical-space';
import { ShareInputItemAddon } from '../../../form/share-input-item';
import { Button } from '../../../button';
import { PerspectiveSelect } from '../../../select/perspective-select';
import { useCreatePerspectiveUser } from 'api/perspective/shared-users/use-create-perspective-user';
import styled from 'styled-components';

const VerticalSpaceUser = styled(VerticalSpace)`
  .ant-select-selector {
    background: linear-gradient(92deg, rgba(255, 255, 255, 0.64) 6.81%, rgba(255, 255, 255, 0.16) 100%) !important;
    box-shadow: 0px 4px 6px 0px rgba(111, 111, 111, 0.1) !important;
  }

  input {
    border-radius: 4px;
    border: 1px solid #c3c3c3;
    background: #f2f2f2;
  }
`;

export const InviteUsers = ({ id }: { id: string }) => {
  const [form] = Form.useForm();
  const [isCleared, setIsCleared] = useState<boolean>(false);

  const { mutate } = useCreatePerspectiveUser({}, id);

  const onFinish = ({ role, perspective }: { perspective: string; role: string }) => {
    const userId = form.getFieldValue('userId');

    mutate(
      {
        perspective_id: perspective || id,
        perspective_user_id: userId,
        role: role || 'edit',
      },
      {
        onSuccess: () => {
          setIsCleared(true);
        },
      }
    );
  };

  return (
    <Form name="share" form={form} onFinish={onFinish} autoComplete="off" layout="vertical" requiredMark={false}>
      <VerticalSpaceUser>
        <Row align="bottom">
          <Col xs={10}>
            <LabelName>Perspectives</LabelName>
            <PerspectiveSelect />
          </Col>
          <Col offset={1} xs={8}>
            <ShareInputItemAddon isCleared={isCleared} />
          </Col>
          <Col offset={1} xs={4}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
              <Button htmlType="submit" block type="primary" style={{ height: '40px', marginBottom: '25px' }}>
                Send Invite
              </Button>
            </div>
          </Col>
        </Row>
      </VerticalSpaceUser>
    </Form>
  );
};
