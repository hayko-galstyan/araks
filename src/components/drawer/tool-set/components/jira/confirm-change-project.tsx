import React from 'react';
import { Button, Modal } from 'antd';
import { ReactComponent as Warning } from 'components/icons/warning.svg';
import { Text } from 'components/typography';
import { VerticalSpace } from 'components/space/vertical-space';
import { TWarningProps } from 'types/jira-integration';

export const ConfirmChangeProject: React.FC<TWarningProps> = ({ isOpen, onClose, title, text, onSubmit }) => {
  return (
    <Modal open={isOpen} width={'496px'} onCancel={onClose} closeIcon={false} footer={null}>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <Warning />
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', margin: '27px', gap: '16px' }}>
        <Text style={{ fontSize: '20px', fontWeight: '600' }}>{title}</Text>
        <Text style={{ fontSize: '16px', fontWeight: '400', textAlign: 'center' }}>{text}</Text>
      </div>
      <VerticalSpace>
        <Button block type="primary" onClick={onSubmit}>
          Yes
        </Button>
        <Button block type="default" onClick={onClose}>
          No
        </Button>
      </VerticalSpace>
    </Modal>
  );
};
