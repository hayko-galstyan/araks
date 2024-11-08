import { useGetAdminUsersManagementData } from 'api/admin/use-get-users-list';
import { SearchWithButton } from 'pages/admin/components/SearchWithButton';
import { Table, Avatar, Spin } from 'antd';
import { AdminUsersManagmentResponse } from 'api/types';
import { useState } from 'react';
import { AdminPagination } from 'pages/admin/components/pagination';
import styled from 'styled-components';
import { COLORS } from 'helpers/constants';
import { StatusColumns } from 'pages/admin/components/StatusColumns';
import { UsersDataAdmin } from '../user-data';
import { DateColumns } from 'pages/admin/components/DateColumns';
import { TextColumns } from 'pages/admin/components/TextColumns';
import { getAvatarPath } from 'helpers/utils';
const Limit = 8;
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

export const UsersManagementAdmin = () => {
  const [selectedItem, setSelectedItem] = useState<{ id: string; name: string } | null>(null);
  const [search, setSearch] = useState<string>(' ');
  const [page, setPage] = useState<number>(1);
  const { data, isSuccess } = useGetAdminUsersManagementData(
    {
      page: page,
      size: Limit,
      search: search.length > 2 ? search : undefined,
    },
    {
      enabled: !!page,
    }
  );

  const userData: AdminUsersManagmentResponse[] = data?.data ?? [];

  const columns = [
    {
      title: '',
      dataIndex: 'avatar',
      key: 'avatar',
      render: (avatar: string | null) => <Avatar src={avatar ? getAvatarPath(avatar) : undefined} alt="User Avatar" />,
    },
    {
      title: 'User',
      dataIndex: 'first_name',
      key: 'first_name',
      render: (text: string, record: AdminUsersManagmentResponse) => (
        <TextColumns value={`${record.first_name} ${record.last_name}`} />
      ),
    },
    {
      title: 'Created date',
      dataIndex: 'created_at',
      key: 'created_at',
      render: (text: string) => <DateColumns value={text} />,
    },
    {
      title: 'Project count',
      dataIndex: 'projects',
      key: 'projects',
      render: (text: string) => <TextColumns value={text} />,
    },
    {
      title: 'Last Activity',
      dataIndex: 'login_at',
      key: 'login_at',
      render: (text: string) => <DateColumns value={text} />,
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (text: 'active' | 'in_active') => <StatusColumns value={text} />,
    },
  ];

  return selectedItem === null ? (
    <Container>
      <SearchWithButton search={search} setSearch={setSearch} setPage={setPage} />
      <Box>
        {isSuccess ? (
          <Table
            style={{ cursor: 'pointer' }}
            columns={columns}
            dataSource={userData}
            rowKey="id"
            pagination={false}
            onRow={(record) => ({
              onClick: () => setSelectedItem({ id: record.id, name: `${record.first_name} ${record.last_name}` }),
            })}
          />
        ) : (
          <>
            <Spin style={{ alignSelf: 'center' }} />
          </>
        )}
      </Box>
      <AdminPagination page={page} setPage={setPage} size={Limit} count={data?.count || 0} />
    </Container>
  ) : (
    <UsersDataAdmin item={selectedItem} setItem={setSelectedItem} />
  );
};
