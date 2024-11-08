import { Modal } from 'components/modal';
import { SecondaryText, Text } from 'components/typography';
import { VerticalSpace } from 'components/space/vertical-space';
import { Button } from 'components/button';
import { Dispatch, FC, SetStateAction } from 'react';
import { Space } from 'antd';
import { COLORS } from 'helpers/constants';
import { ReactComponent as SaveIcon } from '../icons/save.svg';
import { maskStyle } from 'components/drawer/perspective-drawer';

type Props = FC<{ open: boolean; onClose: Dispatch<SetStateAction<boolean>> }>;

export const SaveTemplateSuccessModal: Props = ({ open, onClose }) => {
  return (
    <Modal maskStyle={maskStyle} centered={true} footer={false} closable={false} open={open}>
      <VerticalSpace>
        <Space
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column',
            marginTop: '2rem',
          }}
        >
          <Space>
            <SaveIcon />
          </Space>
          <Space>
            <Text style={{ color: COLORS.PRIMARY.GRAY_DARK, fontWeight: 'bold' }}>Save Template </Text>
          </Space>
        </Space>
        <SecondaryText style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          {`The template successfully saved, let's move on to the schema.`}
        </SecondaryText>
        <Button style={{ margin: '2rem 0' }} block type="primary" onClick={() => onClose(false)}>
          OK
        </Button>
      </VerticalSpace>
    </Modal>
  );
};
