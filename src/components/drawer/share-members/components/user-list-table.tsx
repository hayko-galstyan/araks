/* eslint-disable react-hooks/exhaustive-deps */
import { useGetAllMembers } from 'api/perspective/shared-users/use-get-all-members';
import { Table, TablePaginationConfig } from 'antd';
import dayjs from 'dayjs';
import React, { useEffect, useState } from 'react';
import { UserListItem } from 'pages/project-perspectives/components/section/share/user-list-item';
import './user-list.css';
import styled from 'styled-components';
import { getAvatarPath } from 'helpers/utils';

const UserTable = styled(Table)`
  background: #f2f2f2;

  &&& {
    .ant-table-body {
      overflow: auto;
    }
    tr {
      th {
        box-shadow: 0 5px 6px 0 rgba(111, 111, 111, 0.1);
      }

      td {
        border-bottom: 1px solid #dbdbdb;
      }

      th,
      td {
        color: #414141;
        font-weight: 500;
        letter-spacing: 1.4px;
        background: #f2f2f2;
      }

      &:hover > td {
        background: #f2f2f2;
      }
    }
  }
`;

export const UsersTable: React.FC<{ search: string }> = ({ search }) => {
  const [pagination, setPagination] = useState({ page: 1, size: 10, search });

  const { data, isLoading } = useGetAllMembers(pagination);

  const dataSource =
    data?.rows?.map((d, index) => ({
      key: d.id,
      member_name: `${d.perspective_users.first_name} ${d.perspective_users.last_name}`,
      last_update: dayjs(d.updated_at).format('YYYY-MM-DD HH:mm'),
      perspective: d.perspectives[0].title,
      role: (
        <div className="user-list">
          <UserListItem
            index={index}
            id={d.perspective_id}
            user={{
              id: d.perspective_users.id,
              title: `${d.perspective_users?.first_name} ${d.perspective_users?.last_name}`,
              value: d.role,
              avatar: getAvatarPath(d.perspective_users.avatar),
            }}
            visibleMetaData={false}
          />
        </div>
      ),
    })) || [];

  const columns = [
    {
      title: 'Member name',
      dataIndex: 'member_name',
      maxWidth: 300,
    },
    {
      title: 'Last Update',
      dataIndex: 'last_update',
      maxWidth: 200,
    },
    {
      title: 'Perspective',
      dataIndex: 'perspective',
      maxWidth: 400,
    },
    {
      title: 'Role',
      dataIndex: 'role',
    },
  ];

  const handleTableChange = (pagination: TablePaginationConfig): void => {
    setPagination({
      search: '',
      page: pagination.current ?? 0,
      size: pagination.pageSize ?? 0,
    });
  };

  useEffect(() => {
    setPagination({
      ...pagination,
      page: 1,
      search,
    });
  }, [search]);

  return (
    <UserTable
      loading={isLoading}
      columns={columns}
      dataSource={dataSource}
      pagination={{
        pageSize: pagination.size,
        current: pagination.page,
        total: data?.count || 0,
      }}
      onChange={handleTableChange}
      scroll={{ y: 400 }}
    />
  );
};
