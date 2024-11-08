import React, { useCallback, useState } from 'react';
import { DrawerWrapper } from './styled';
import { Button } from 'components/button';
import { COLORS } from 'helpers/constants';
import { TableMembers } from './table';
import { CreateNewMemberGroupModal } from 'components/modal/create-new-member-group-modal';
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import { TMembersData } from 'api/groups/types';

type TDrawerProps = {
  isOpen: boolean;
  isLoading: boolean;
  isHasPermission: boolean;
  onSetIsOpenDrawer: (value: boolean) => void;
  members: TMembersData | undefined;
};

export const Drawer: React.FC<TDrawerProps> = ({ isOpen, onSetIsOpenDrawer, isHasPermission, isLoading, members }) => {
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);

  const handleOpenModal = useCallback(() => setIsOpenModal((prev) => !prev), []);

  return (
    <>
      <Spin indicator={<LoadingOutlined />} spinning={isLoading}>
        <DrawerWrapper
          headerStyle={{ padding: '8px 36px', borderBottom: `1px solid ${COLORS.PRIMARY.GRAY_DARK}` }}
          style={{ padding: '42px 36px' }}
          width={952}
          title="Members"
          open={isOpen}
          onClose={() => onSetIsOpenDrawer(!isOpen)}
        >
          {isHasPermission && (
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '16px' }}>
              <Button type="primary" onClick={handleOpenModal}>
                Add Members
              </Button>
            </div>
          )}
          <TableMembers members={members ?? undefined} />
        </DrawerWrapper>
      </Spin>
      {isOpenModal && <CreateNewMemberGroupModal isOpen={isOpenModal} onHandleOpenModal={handleOpenModal} />}
    </>
  );
};
