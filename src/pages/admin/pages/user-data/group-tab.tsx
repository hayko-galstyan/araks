import { SearchWithButton } from 'pages/admin/components/SearchWithButton';
import { Button, Space, Spin, Table } from 'antd';
import { useCallback, useState } from 'react';
import { AdminPagination } from 'pages/admin/components/pagination';
import styled from 'styled-components';
import { COLORS } from 'helpers/constants';
import { AdminUsersGroupDataResponse } from 'api/types';
import { useGetAdminUsersGroupsData } from 'api/admin/use-get-user-groups-by-id';
import { ChangeOwnerModal } from 'pages/admin/components/ChangeOwnerModal';
import { DateColumns } from 'pages/admin/components/DateColumns';
import { TextColumns } from 'pages/admin/components/TextColumns';
const Limit = 10;
const Container = styled.div`
  width: 100%;
  min-height: 800px;
  flex-direction: column;
  background-color: ${COLORS.PRIMARY.WHITE};
  gap: 40px;
  border-radius: 8px;
  padding: 20px;
  outline: none;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;
const Box = styled.div`
  width: 100%;
  min-height: 600px;
  border-radius: 8px;
  padding: 20px;
  align-items: center;
  justify-content: center;
  align-self: center;
`;
const StyledTable = styled(Table)`
  .ant-table-row {
    transition: background-color 0.3s ease;
  }

  .ant-table-row-selected {
    background-color: ${COLORS.PRIMARY.GRAY_LIGHT} !important; 
    color: white !important; 
  }

  .ant-table-row-selected td {
    background-color: ${COLORS.PRIMARY.GRAY_LIGHT} !important;
    color: white !important; 
  }
`;
interface Props {
  id: string;
}

export const AdminGroupTab = ({ id }: Props) => {
  const [search, setSearch] = useState<string>(' ');
  const [page, setPage] = useState<number>(1);
  const [selectedRowKeys, setSelectedRowKeys] = useState<string[]>([]);
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const { data, isSuccess } = useGetAdminUsersGroupsData(
    {
      id: id,
      params: {
        page: page,
        size: Limit,
        search: search.length > 2 ? search : undefined,
      },
    },
    {
      enabled: !!id,
    }
  );
  const handleOpenModal = useCallback(() => setIsOpenModal((prev) => !prev), []);

  const GroupsData: AdminUsersGroupDataResponse[] = data?.data ?? [];
  const rowSelection = {
    selectedRowKeys,
    onChange: (selectedKeys: React.Key[]) => {
      setSelectedRowKeys(selectedKeys as string[]);
    },
  };

  const columns = [
    {
      title: 'Group Name',
      dataIndex: 'name',
      key: 'name',
      render: (text: string) => <TextColumns value={text} />,
    },
    {
      title: 'Project Counts',
      dataIndex: 'projects',
      key: 'projects',
      render: (text: string) => <TextColumns value={text} />,
    },
    {
      title: 'Users counts',
      dataIndex: 'members',
      key: 'members',
      render: (text: string) => <TextColumns value={text} />,
    },
    {
      title: 'Create Date',
      dataIndex: 'created_at',
      key: 'created_at',
      render: (text: string) => <DateColumns value={text} />,
    },
  ];

  return (
    <Container>
      <Space style={{ justifyContent: 'space-between', width: '100%' }}>
        <SearchWithButton search={search} setSearch={setSearch} setPage={setPage} />
        <Button
          style={{ border: 'none' }}
          type="primary"
          disabled={selectedRowKeys.length === 0}
          onClick={() => setIsOpenModal(true)}
        >
          <text>Change Owner</text>
        </Button>
      </Space>
      <Box>
        {isSuccess ? (
          <StyledTable columns={columns} dataSource={GroupsData} rowKey="id" pagination={false} rowSelection={rowSelection} />
        ) : (
          <>
            <Spin style={{ alignSelf: 'center' }} />
          </>
        )}
      </Box>
      <AdminPagination page={page} setPage={setPage} size={Limit} count={data?.count || 0} />
      <ChangeOwnerModal
        role="Groups"
        isOpen={isOpenModal}
        onHandleOpenModal={handleOpenModal}
        currentUserID={id}
        selectedIds={selectedRowKeys}
        setSelectedIds={setSelectedRowKeys}
      />
    </Container>
  );
};
