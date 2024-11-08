import { SearchWithButton } from 'pages/admin/components/SearchWithButton';
import { Button, Space, Spin, Table } from 'antd';
import { useCallback, useState } from 'react';
import { AdminPagination } from 'pages/admin/components/pagination';
import styled from 'styled-components';
import { COLORS } from 'helpers/constants';
import { useGetAdminUsersData } from 'api/admin/use-get-user-data-by-id';
import { AdminUsersDataResponse } from 'api/types';
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

export const AdminProjectTab = ({ id }: Props) => {
  const [search, setSearch] = useState<string>(' ');
  const [page, setPage] = useState<number>(1);
  const [selectedRowKeys, setSelectedRowKeys] = useState<string[]>([]);
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const handleOpenModal = useCallback(() => setIsOpenModal((prev) => !prev), []);

  const { data, isSuccess } = useGetAdminUsersData(
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
  const ProjectData: AdminUsersDataResponse[] = data?.data ?? [];
  const rowSelection = {
    selectedRowKeys,
    onChange: (selectedKeys: React.Key[]) => {
      setSelectedRowKeys(selectedKeys as string[]);
    },
  };

  const columns = [
    {
      title: 'Project Name ',
      dataIndex: 'title',
      key: 'title',
      render: (text: string) => <TextColumns value={text} />,
    },
    {
      title: 'Node Types',
      dataIndex: 'node_types',
      key: 'node_types',
      render: (text: string) => <TextColumns value={text} />,
    },
    {
      title: 'Connection Types',
      dataIndex: 'edge_types',
      key: 'edge_types',
      render: (text: string) => <TextColumns value={text} />,
    },
    {
      title: 'Nodes',
      dataIndex: 'nodes',
      key: 'nodes',
      render: (text: string) => <TextColumns value={text} />,
    },
    {
      title: 'Connections',
      dataIndex: 'edges',
      key: 'edges',
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
          <StyledTable
            columns={columns}
            dataSource={ProjectData}
            rowKey="id"
            rowSelection={rowSelection}
            pagination={false}
          />
        ) : (
          <>
            <Spin style={{ alignSelf: 'center' }} />
          </>
        )}
      </Box>
      <AdminPagination page={page} setPage={setPage} size={Limit} count={data?.count || 0} />
      <ChangeOwnerModal
        role="Projects"
        isOpen={isOpenModal}
        onHandleOpenModal={handleOpenModal}
        currentUserID={id}
        selectedIds={selectedRowKeys}
        setSelectedIds={setSelectedRowKeys}
      />
    </Container>
  );
};
