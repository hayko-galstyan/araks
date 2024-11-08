import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Col, Menu, MenuProps, Typography } from 'antd';
import { Card, StyledRowCard } from './styled';
import { ReactComponent as TeamsIcon } from '../../icons/teams.svg';
import { ReactComponent as DotsIcon } from '../../icons/dots-vertical.svg';
import { ReactComponent as GroupsCard } from '../../icons/groupsCard.svg';
import { COLORS, PATHS } from 'helpers/constants';
import { ProjectActionPopover } from 'components/popover';
import { menuItemsFolder } from './constant';

const { PRIMARY } = COLORS;
const { Paragraph } = Typography;

type TGroupCardProps = {
  data: {
    projects_count: string;
    admin_id: string;
    id: string;
    title: string;
    description: string;
    members_count: string;
  };
  isHasPermission: boolean;
  onDeleteGroup?: (id: string) => void;
  onSetGroupId?: (value: string | null) => void;
};

export const GroupCard: React.FC<TGroupCardProps> = ({ data, onSetGroupId, onDeleteGroup, isHasPermission }) => {
  const [open, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const onClick: MenuProps['onClick'] = (e) => {
    e.domEvent.stopPropagation();
    if (e.key === 'edit' && onSetGroupId) {
      onSetGroupId(data.id);
    } else if (e.key === 'delete' && onDeleteGroup) {
      onDeleteGroup(data.id);
    }
    setIsOpen(false);
  };

  const navigateProject = (project_id: string, title: string) => {
    navigate(PATHS.GROUPS_PROJECTS.replace(':id', project_id), {
      state: { group_name: title, admin_id: data?.admin_id },
    });
  };

  return (
    <Card onDoubleClick={() => navigateProject(data?.id, data?.title)} title={data?.title} bordered={false}>
      {isHasPermission && (
        <ProjectActionPopover
          fullWidth={false}
          content={
            <Menu
              style={{ width: 256 }}
              mode="vertical"
              items={menuItemsFolder}
              forceSubMenuRender={false}
              onClick={onClick}
            />
          }
          trigger="click"
          open={open}
          onOpenChange={(value) => setIsOpen(value)}
        >
          <DotsIcon
            onClick={(e) => {
              e.stopPropagation();
              setIsOpen(!open);
            }}
            style={{ position: 'absolute', right: '0', top: '10px', width: '30px', height: '24px' }}
          />
        </ProjectActionPopover>
      )}
      <div style={{ textAlign: 'center' }}>
        <GroupsCard />
      </div>
      <Paragraph
        style={{ fontSize: '13px' }}
        color={PRIMARY.GRAY}
        ellipsis={{
          rows: 2,
        }}
      >
        {data?.description}
      </Paragraph>
      <StyledRowCard>
        <Col>
          <TeamsIcon />
        </Col>
        <Col> {data?.members_count}</Col>
      </StyledRowCard>
    </Card>
  );
};
