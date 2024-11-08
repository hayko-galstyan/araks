import { Popover as PopoverComponent } from 'antd';
import { FC, useState } from 'react';
import { ActionDots } from 'components/actions/dots';
import { JiraProjectPopoverMenu } from 'components/menu/jira-project-menu';
import { IJiraProjectActionPopoverProps } from 'types/jira-integration';
import { useJira } from './context';

export const JiraProjectActionPopover: FC<IJiraProjectActionPopoverProps> = ({ onClickDelete }) => {
  const { setOpenViewJira } = useJira();
  const [isManageOpened, setManageOpened] = useState(false);

  return (
    <PopoverComponent
      placement="bottom"
      trigger="click"
      overlayClassName="project-popover-jira-project"
      open={isManageOpened}
      onOpenChange={(open: boolean) => setManageOpened(open)}
      content={
        <JiraProjectPopoverMenu
          onClickDelete={onClickDelete}
          onClickEdit={() => {
            setOpenViewJira('connect');
            setManageOpened(false);
          }}
        />
      }
    >
      <ActionDots style={{ position: 'relative', cursor: 'pointer' }} onClick={() => setManageOpened(true)} />
    </PopoverComponent>
  );
};
