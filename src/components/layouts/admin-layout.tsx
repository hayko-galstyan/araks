import styled from 'styled-components';
import { Layout as LayoutComponent, Menu as MenuComponent, MenuProps, Space } from 'antd';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';

import { MenuText } from '../typography';
import { ReactComponent as Home } from '../icons/home.svg';
import { ReactComponent as Public } from '../icons/public.svg';

import { PATHS } from 'helpers/constants';
import { Logo } from 'components/logo';
import { HeaderProfile } from 'components/header-profile';

const Layout = styled(LayoutComponent)`
  background: #f2f2f2;
  height: 100%;
  min-height: 100vh;
`;

const Menu = styled(MenuComponent)`
  background: transparent;

  .ant-menu-item {
    margin: 0;
    width: 100%;
    height: 56px;

    &.ant-menu-item-selected {
      background: #414141;

      .ant-typography {
        color: #ffffff;
      }

      svg {
        fill: #ffffff;
      }
    }
  }
`;

const LayoutInner = styled(LayoutComponent)`
  background: #f2f2f2;
  box-shadow: -10px 0px 10px rgba(111, 111, 111, 0.1);
  border-radius: 4px;
`;

const { Header: HeaderComponent, Content: ContentComponent, Sider: SiderComponent } = LayoutComponent;

const Header = styled(HeaderComponent)`
  && {
    background: transparent;
    padding: 20px 50px;
    height: 90px;
    box-shadow: 10px 6px 10px rgba(111, 111, 111, 0.1);
  }
`;

const Content = styled(ContentComponent)``;

const Sider = styled(SiderComponent)`
  && {
    background: transparent;
  }
`;

const menu: MenuProps['items'] = [
  {
    icon: <Home />,
    label: <MenuText>Dashboard</MenuText>,
    key: PATHS.ADMIN,
  },
  {
    icon: <Public />,
    label: <MenuText>User Management</MenuText>,
    key: PATHS.ADMIN_MANAGEMENT,
  },
];

export const AdminLayout = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const onClick: MenuProps['onClick'] = (e) => {
    navigate(e.key);
  };

  const defaultSelected = location.pathname === PATHS.ADMIN ? PATHS.ADMIN : PATHS.ADMIN_MANAGEMENT;

  return (
    <Layout>
      <Sider width={300} breakpoint="lg">
        <Logo margin="31px 63px" />
        <Menu mode="inline" inlineIndent={63} selectedKeys={[defaultSelected]} onClick={onClick} items={menu} />
      </Sider>
      <LayoutInner>
        <Header>
          <Space style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <HeaderProfile />
            <text>Admin</text>
          </Space>
        </Header>

        <Content>
          <Outlet />
        </Content>
      </LayoutInner>
    </Layout>
  );
};
