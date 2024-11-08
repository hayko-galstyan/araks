import { FC, useCallback, useState } from 'react';
import { Flex, Popover } from 'antd';
import { ReactComponent as BackSvg } from 'components/icons/back.svg';
import { Text } from 'components/typography';
import { useJira } from '../../context';
import { COLORS } from 'helpers/constants';
import { ActionDots } from 'components/actions/dots';
import { JiraProjectPopoverMenu } from 'components/menu/jira-project-menu';
import { useDeleteIssueById } from 'api/jira/use-delete-issue-by-id';
import { DeleteJiraProjectModal } from 'components/modal/delete-jira-project-modal';

interface ITaskViewHeader {
  title: string;
  node_id: string;
  type: string;
  url: string;
  isDeleted?: boolean;
}

export const TaskViewHeader: FC<ITaskViewHeader> = ({ title, node_id, type, url, isDeleted }) => {
  const [open, setIsOpen] = useState(false);
  const [openIsModal, setIsOpenModal] = useState(false);

  const { setOpenViewJira, navigateIssueJira } = useJira();

  const { mutate: deleteIssueFn } = useDeleteIssueById();

  const handleBackTaskLists = useCallback(() => setOpenViewJira(type), [setOpenViewJira, type]);

  const actionPopover = useCallback(() => setIsOpen(!open), [setIsOpen, open]);

  const handleModalOpen = useCallback(() => setIsOpenModal(!openIsModal), [setIsOpenModal, openIsModal]);

  const deleteIssue = useCallback(() => {
    deleteIssueFn(node_id, {
      onSuccess: () => {
        handleModalOpen();
        setOpenViewJira('list');
      },
    });
  }, [deleteIssueFn, handleModalOpen, node_id, setOpenViewJira]);

  const popoverContent = (
    <JiraProjectPopoverMenu
      onClickDelete={() => handleModalOpen()}
      onClickEdit={() => {
        setOpenViewJira('edit');
      }}
    />
  );

  return (
    <>
      <Flex justify="space-between" style={{ width: '100%' }}>
        <Flex gap={16} style={{ cursor: 'pointer' }}>
          <BackSvg style={{ width: '14px' }} onClick={handleBackTaskLists} />
          <Text
            color={COLORS.PRIMARY.BLUE}
            onClick={() => navigateIssueJira(url, title)}
            style={{ textDecoration: 'underline', fontSize: '20px' }}
          >
            {title}
          </Text>
        </Flex>
        {isDeleted && (
          <Flex>
            <Popover
              placement="bottom"
              content={popoverContent}
              trigger="click"
              open={open}
              onOpenChange={actionPopover}
            >
              <ActionDots style={{ position: 'relative', cursor: 'pointer' }} onClick={actionPopover} />
            </Popover>
          </Flex>
        )}
      </Flex>
      <DeleteJiraProjectModal
        handleBackClick={handleModalOpen}
        isOpen={!!openIsModal}
        handleDelete={deleteIssue}
        title="Are you sure you want to delete tha task."
        text="info"
      />
    </>
  );
};
