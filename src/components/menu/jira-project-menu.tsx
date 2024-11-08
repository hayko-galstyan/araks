import { MenuProps } from 'antd';
import { ReactComponent as Delete } from 'components/icons/delete.svg';
import { ReactComponent as Edit } from 'components/icons/edit-pencil.svg';
import { MenuText } from 'components/typography';
import './index.css';
import { PropertyMenu } from './property-menu';
import React from 'react';
import { useJira } from '../drawer/tool-set/components/jira/context';

type MenuItem = Required<MenuProps>['items'][number];

type Props = {
  onClickDelete: VoidFunction;
  onClickEdit: VoidFunction;
};

const menuItems: (isEdit: boolean) => MenuItem[] = (isEdit) => {
  const items = [
    {
      key: 'delete',
      icon: <Delete />,
      label: <MenuText>Detach</MenuText>,
    },
  ];
  if (!isEdit) {
    items.unshift({
      key: 'edit',
      icon: <Edit />,
      label: <MenuText>Edit</MenuText>,
    });
  }

  return items;
};

export const JiraProjectPopoverMenu: React.FC<Props> = ({ onClickDelete, onClickEdit }) => {
  const { openViewJira } = useJira();

  const onClick: MenuProps['onClick'] = (e) => {
    if (e.key === 'edit') {
      onClickEdit();
    } else if (e.key === 'delete') {
      onClickDelete();
    }
  };

  return (
    <>
      <PropertyMenu
        style={{ width: 256 }}
        mode="vertical"
        selectable={false}
        items={menuItems(openViewJira.edit)}
        forceSubMenuRender={false}
        onClick={onClick}
      />
    </>
  );
};
