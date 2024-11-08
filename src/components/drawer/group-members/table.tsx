import React, { useRef } from 'react';
import { SearchOutlined } from '@ant-design/icons';
import type { InputRef, TableColumnsType, TableColumnType } from 'antd';
import { Button, Image, Input, Space, Table } from 'antd';
import type { FilterDropdownProps } from 'antd/es/table/interface';
import { ReactComponent as RemoveIcon } from 'components/icons/delete.svg';
import { Select } from 'components/select';
import { ReactComponent as UsersIcon } from 'components/icons/teams.svg';
import { ROLE_OPTIONS } from 'helpers/constants';
import { TMembersData } from 'api/groups/types';
import { useDeleteMemberGroup } from 'api/groups/use-delete-member-group';
import { useUpdateGroupMember } from 'api/groups/use-update-group-member';
import { getAvatarPath } from 'helpers/utils';
import { useAuth } from 'context/auth-context';

interface DataType {
  avatar: React.ReactNode;
  key: string;
  name: string;
  role: React.ReactNode;
  action: React.ReactNode;
}

export const TableMembers: React.FC<{ members: TMembersData | undefined }> = ({ members }) => {
  const user = useAuth();
  const searchInput = useRef<InputRef>(null);

  const { mutate: deleteMemberFn } = useDeleteMemberGroup();
  const { mutate: updateMemberFn } = useUpdateGroupMember();

  const handleSearch = (selectedKeys: string[] | React.ReactNode, confirm: FilterDropdownProps['confirm']) => {
    confirm();
  };

  const deleteMemberGroups = (user_id: string): void => {
    deleteMemberFn(user_id);
  };

  const updateMemberRole = (data: { user_id: string; role: string }): void => {
    updateMemberFn(data);
  };

  const isOwner = (): boolean => {
    const owner = members?.data?.find((el) => el?.role === 'owner');
    return owner?.member?.id === user?.user?.id;
  };

  const canDeleteMember = (user_id: string): boolean => {
    return isOwner() || (user_id === user?.user?.id && !isOwner());
  };

  const memberDelete = (user_id: string): React.ReactNode => {
    if (canDeleteMember(user_id)) {
      return <RemoveIcon onClick={() => deleteMemberGroups(user_id)} style={{ cursor: 'pointer' }} />;
    }
    return null;
  };

  const getColumnSearchProps = (dataIndex: 'name'): TableColumnType<DataType> => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
      <div style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation()}>
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => handleSearch(selectedKeys as string[], confirm)}
          style={{ marginBottom: 8, display: 'block' }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys as string[], confirm)}
            icon={<SearchOutlined />}
            style={{ width: 120 }}
          >
            Search
          </Button>
          <Button
            onClick={() => {
              setSelectedKeys([]);
              confirm({ closeDropdown: true });
            }}
          >
            Reset
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered: boolean) => <SearchOutlined style={{ color: filtered ? '#1677ff' : undefined }} />,
    onFilter: (value, record) => {
      return record[dataIndex]
        .toString()
        .toLowerCase()
        .includes((value as string).toLowerCase());
    },
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) => text,
  });

  const columns: TableColumnsType<DataType> = [
    {
      dataIndex: 'avatar',
      key: 'avatar',
      render: (text, record) => record?.avatar,
    },
    {
      title: 'Member Name',
      dataIndex: 'name',
      key: 'name',
      width: '30%',
      render: (text, record) => record?.name,
      ...getColumnSearchProps('name'),
    },
    {
      title: 'Role',
      dataIndex: 'role',
      key: 'role',
      render: (text, record) => record?.role,
    },
    {
      title: (
        <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
          <UsersIcon /> {members?.count}
        </div>
      ),
      dataIndex: 'action',
      key: 'action',
      render: (text, record) => record?.action,
    },
  ];

  const dataSource: DataType[] | undefined = members?.data?.map((item) => {
    const name = item?.member ? `${item.member.first_name ?? ''} ${item.member.last_name ?? ''}` : '';

    return {
      key: item.id,
      avatar: <Image src={getAvatarPath(item?.member?.avatar)} width={60} height={60} preview={false} />,
      name: name.trim(),
      role: (
        <Select
          onChange={(value) => updateMemberRole({ user_id: item?.member?.id, role: value as string })}
          defaultValue={item.role}
          options={ROLE_OPTIONS}
          disabled={!isOwner() || item?.role === 'owner'}
        />
      ),
      action: (
        <Space
          style={{
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          {item.role !== 'owner' && memberDelete(item?.member?.id)}
        </Space>
      ),
    };
  });

  return <Table columns={columns} dataSource={dataSource} />;
};
