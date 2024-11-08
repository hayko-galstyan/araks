import React from 'react';
import { Modal } from 'components/modal';
import styled from 'styled-components';
import { maskStyle } from 'components/drawer/perspective-drawer';
import { IIdOpen } from 'components/layouts/components/visualisation/reducer/types';

type Props = React.FC<{ open: IIdOpen; onCancel: VoidFunction; children: React.ReactNode }>;

export const WrapperModal = styled(Modal)`
  &.ant-modal {
    top: 2vh;
    width: 90vw !important;

    .ant-modal-content {
      box-shadow: 0 4px 4px rgba(111, 111, 111, 0.3);
      backdrop-filter: blur(5px);
      border-radius: 4px;
      padding: 0;
    }

    .ant-modal-body {
      height: 96vh;
    }
  }
`;

export const FuzzyMatchModal: Props = ({ open, onCancel, children }) => {
  const props = {
    open: open?.isOpened,
    destroyOnClose: true,
    forceRender: true,
    closable: false,
    footer: false,
    mask: true,
    maskStyle,
    maskClosable: false,
    onCancel,
  };

  return <WrapperModal {...props}>{children}</WrapperModal>;
};
