import { useNavigate } from 'react-router-dom';
import { Menu as MenuComponent, MenuProps } from 'antd';
import { PATHS } from 'helpers/constants';
import { ReactComponent as Delete } from 'components/icons/delete.svg';
import { ReactComponent as Edit } from 'components/icons/edit-pencil.svg';
import { ReactComponent as Edit2 } from 'components/icons/edit-pencil2.svg';
import styled from 'styled-components';
import { MenuText } from 'components/typography';
type MenuItem = Required<MenuProps>['items'][number];

const menuItems = (isSharedPage = false): MenuItem[] =>
  [
    {
      key: 'editTemplate',
      icon: <Edit2 />,
      label: <MenuText>Edit template </MenuText>,
      popupClassName: 'project-menu-action',
      popupOffset: [-25],
    },
    {
      key: 'edit',
      disabled: isSharedPage,
      icon: <Edit />,
      label: <MenuText>Edit template name</MenuText>,
    },
    {
      key: 'delete',
      icon: <Delete />,
      label: <MenuText>Delete</MenuText>,
    },
  ].filter((item) => !item.disabled);

const menuItem: MenuItem[] = [
  {
    key: 'editTemplate',
    icon: <Edit2 />,
    label: <MenuText>Edit template</MenuText>,
  },
  {
    key: 'edit',
    icon: <Edit />,
    label: <MenuText>Edit template name</MenuText>,
  },
  {
    key: 'delete',
    icon: <Delete />,
    label: <MenuText>Delete</MenuText>,
  },
];

const Menu = styled(MenuComponent)`
  background-color: transparent;

  .ant-menu-submenu .ant-menu-submenu-title,
  .ant-menu-item {
    margin: 4px 0;
    width: 100%;

    &:hover,
    &:active {
      background: linear-gradient(90deg, rgba(35, 47, 106, 0.2) 0%, rgba(35, 47, 106, 0.2) 100%);
      border: 1px solid #ffffff;
      transition: transform 0.15s;
    }
  }
`;

type Props = {
  projectId: string;
  setIsEditModalOpen: () => void; 
  setIsDeleteModalOpen: () => void;
};

export const TemplateActionMenu = ({  setIsDeleteModalOpen, setIsEditModalOpen, projectId}: Props) => {
  const navigate = useNavigate();
  const onClick: MenuProps['onClick'] = (e) => {
    if (e.key === 'editTemplate') {
      navigate(PATHS.PROJECT_TEMPLATE_EDIT.replace(':id', projectId));
      return;
    }
    if (e.key === 'edit') {
      setIsEditModalOpen()
      return;
    }
    if (e.key === 'delete') {
      setIsDeleteModalOpen();
      return;
    }

  };
  return (
    <>
      <Menu
        style={{ width: 256 }}
        selectable={false}  
        mode="vertical"
        items={menuItems()}
        forceSubMenuRender={false}
        onClick={onClick}
      />
    </>
  );
};

type PropsFolder = {
  setIsDeleteModalOpen: () => void;
  setIsEditModalOpen: () => void;
  folderName: string;
  folderId: string;
};

export const FolderActionMenu = ({ setIsDeleteModalOpen, setIsEditModalOpen }: PropsFolder) => {
  const onClick: MenuProps['onClick'] = (e) => {
    if (e.key === 'edit') {
      setIsEditModalOpen();
    } else if (e.key === 'delete') {
      setIsDeleteModalOpen();
    }
  };

  return (
    <Menu style={{ width: 256 }} mode="vertical" items={menuItem} forceSubMenuRender={false} onClick={onClick} />
  );
};
