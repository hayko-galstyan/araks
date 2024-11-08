import { TabsProps } from 'antd';
import { MyGroups } from './components/my-groups';
import { MemberGroups } from './components/member-groups';

export const itemsGroups: TabsProps['items'] = [
  {
    key: '1',
    label: 'Groups Created by Me',
    children: <MyGroups />,
  },
  {
    key: '2',
    label: "Groups I'm a Member Of",
    children: <MemberGroups />,
  },
];
