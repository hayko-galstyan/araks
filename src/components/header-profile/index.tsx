import { useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';
import { Button, Dropdown } from 'antd';
import { useAuth } from 'context/auth-context';
import { ReactComponent as UserProfileSvg } from './icon/user-profile.svg';
import { ReactComponent as SignOutSvg } from './icon/sign-out.svg';
import { ReactComponent as AdminProfileSvg } from './icon/admin-profile.svg';
import { Link, useLocation } from 'react-router-dom';
import './profile.css';
import { PATHS } from 'helpers/constants';
import { MenuProps } from 'antd';

const Wrapper = styled.div`
  display: flex;

  button {
    padding: 0;
    border: none;

    img {
      width: 40px;
      border-radius: 4px;
    }
  }
`;

export const HeaderProfile = () => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const isAdminPath = location.pathname.includes('admin');

  const [avatar, setAvatar] = useState(user?.avatar);
  const items: MenuProps['items'] = useMemo(
    () =>
      [
        !isAdminPath && {
          key: '0',
          label: <Link to={PATHS.PROFILE}>View profile</Link>,
          icon: <UserProfileSvg />,
        },
        user?.role === 'admin' && {
          key: '2',
          label: <Link to={isAdminPath ? PATHS.PROJECTS : PATHS.ADMIN}>{isAdminPath? 'My Account':'Admin Page'}</Link>,
          icon: <AdminProfileSvg />,
        },
        {
          type: 'divider',
        },
        {
          key: '1',
          onClick: () => {
            logout();
          },
          label: <div>Log Out</div>,
          icon: <SignOutSvg />,
        },
      ].filter(Boolean) as MenuProps['items'],
    [logout, user?.role, isAdminPath]
  );

  useEffect(() => {
    setAvatar(user?.avatar);
  }, [user?.avatar]);

  return (
    <Wrapper>
      <Dropdown overlayClassName="profile-settings" menu={{ items }} trigger={['click']}>
        <Button icon={<img src={avatar} alt={user?.first_name} />} />
      </Dropdown>
    </Wrapper>
  );
};
