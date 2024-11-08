import styled from 'styled-components';
import { Layout as LayoutComponent, Menu as MenuComponent, MenuProps, Space } from 'antd';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';

import { MenuText } from '../typography';
import { ReactComponent as Home } from '../icons/home.svg';
import { ReactComponent as Public } from '../icons/public.svg';
import { ReactComponent as Shared } from '../icons/shared.svg';
import { ReactComponent as TemplateIcon } from '../icons/template.svg';
import { ReactComponent as GroupsIcon } from '../icons/groups.svg';

import { PATHS, pathMap } from 'helpers/constants';
import { HeaderSearch } from './components/header-search';
import { Logo } from 'components/logo';

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
    align-items: center;
    display: flex;

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
    padding: 32px 50px;
    height: 104px;
    box-shadow: 10px 6px 10px rgba(111, 111, 111, 0.1);
  }
`;

const Content = styled(ContentComponent)`
  padding: 34px 40px;
`;

const Sider = styled(SiderComponent)`
  && {
    background: transparent;
  }
`;

const menu: MenuProps['items'] = [
  {
    icon: <Home />,
    label: <MenuText>Home</MenuText>,
    key: PATHS.PROJECTS,
  },
  {
    icon: <Public />,
    label: <MenuText>Public</MenuText>,
    key: PATHS.PUBLIC,
  },
  {
    icon: <Shared />,
    label: <MenuText>Shared</MenuText>,
    key: PATHS.SHARED,
  },
  {
    icon: <TemplateIcon />,
    label: <MenuText>Template</MenuText>,
    key: PATHS.TEMPLATE,
  },
  {
    icon: <GroupsIcon />,
    label: <MenuText>Groups</MenuText>,
    key: PATHS.GROUPS,
  },
];

export const ProjectHome = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const onClick: MenuProps['onClick'] = (e) => {
    navigate(e.key);
  };

  const defaultSelected = pathMap[location.pathname] || PATHS.PROFILE;

  return (
    <Layout>
      <Sider width={240} breakpoint="lg">
        <Logo margin="31px 63px" />
        <Menu mode="inline" inlineIndent={63} selectedKeys={[defaultSelected]} onClick={onClick} items={menu} />
      </Sider>
      <LayoutInner>
        <Header>
          <Space style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <HeaderSearch />
          </Space>
        </Header>
        {location.pathname === PATHS.PROFILE ? (
          <Outlet />
        ) : (
          <Content>
            <Outlet />
          </Content>
        )}
      </LayoutInner>
    </Layout>
  );
};
