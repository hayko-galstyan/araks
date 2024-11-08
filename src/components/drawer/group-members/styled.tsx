import { Drawer } from 'antd';
import styled from 'styled-components';

export const DrawerWrapper = styled(Drawer)`
  & .ant-drawer-header-title {
    flex-direction: row-reverse;
  }
`;
