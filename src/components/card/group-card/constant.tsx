import { MenuText } from 'components/typography';
import { ReactComponent as Delete } from 'components/icons/delete.svg';
import { ReactComponent as Edit } from 'components/icons/edit-pencil.svg';
import { MenuProps } from 'antd';

type MenuItem = Required<MenuProps>['items'][number];

export const menuItemsFolder: MenuItem[] = [
  {
    key: 'edit',
    icon: <Edit />,
    label: <MenuText>Edit</MenuText>,
  },
  {
    key: 'delete',
    icon: <Delete />,
    label: <MenuText>Delete</MenuText>,
  },
];
