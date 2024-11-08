import React from 'react';
import { Wrapper } from './styled';
import { useGetMyMemberships } from 'api/groups/use-get-my-memberships';
import { GroupCard } from 'components/card/group-card';
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

export const MemberGroups: React.FC = () => {
  const { data, isLoading } = useGetMyMemberships();

  return (
    <Spin indicator={<LoadingOutlined />} spinning={isLoading}>
      <Wrapper>
        {data?.data?.map(({ id, admin, name, description, members_count, projects_count }) => (
          <GroupCard
            key={id}
            data={{
              admin_id: admin?.id,
              id,
              title: name,
              description: description,
              members_count: members_count,
              projects_count: projects_count,
            }}
            isHasPermission={false}
          />
        ))}
      </Wrapper>
    </Spin>
  );
};
