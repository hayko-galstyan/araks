import React from 'react';
import { Button, Flex, Modal } from 'antd';
import { SecondaryText, Text } from 'components/typography';
import { VerticalSpace } from 'components/space/vertical-space';

type TWarningProps = {
  isOpen: boolean;
  handleBackClick: VoidFunction;
  handleDelete: VoidFunction;
  title: string;
  text: string;
};

export const DeleteJiraProjectModal: React.FC<TWarningProps> = ({
  isOpen,
  title,
  text,
  handleBackClick,
  handleDelete,
}) => {
  return (
    <Modal
      title={
        <Flex justify="center">
          <Text>{title}</Text>
        </Flex>
      }
      open={isOpen}
      footer={false}
      closable={false}
      className="project-modal"
    >
      <VerticalSpace>
        <Flex justify="center">
          <SecondaryText>{text}</SecondaryText>
        </Flex>
        <Button block onClick={handleDelete} type="primary">
          Detach
        </Button>
        <Button block type="default" onClick={handleBackClick}>
          Cancel
        </Button>
      </VerticalSpace>
    </Modal>
  );
};
