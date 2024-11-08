import React from 'react';
import { Button, Modal } from 'antd';
import { ReactComponent as Warning } from 'components/icons/warning.svg';
import { Text } from 'components/typography';
import { VerticalSpace } from 'components/space/vertical-space';

type TWarningProps = {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  text: string;
};

export const WarningModal: React.FC<TWarningProps> = ({ isOpen, onClose, title, text }) => {
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
        <Button block type="default" onClick={onClose}>
          Ok
        </Button>
      </VerticalSpace>
    </Modal>
  );
};
