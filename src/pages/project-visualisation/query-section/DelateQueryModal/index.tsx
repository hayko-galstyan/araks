
import { useDeleteQueryHistoey } from 'api/query-history/use-delete-query';
import { Button } from 'components/button';
import { Modal } from 'components/modal';
import { VerticalSpace } from 'components/space/vertical-space';
import { Text } from 'components/typography';

type Props = {
  isModalOpen: boolean;
  closePreview?: () => void;
  setIsModalOpen: (value: string|null | ((prevVar: string|null) => string|null)) => void;
  projectId: string;
  queryId:string;
};

export const DeleteQueryeModal = ({ isModalOpen, setIsModalOpen, projectId, queryId, closePreview }: Props) => {
  const { mutate } = useDeleteQueryHistoey({
    projectId,
    queryId
  });

  const handleCancel = () => {
    setIsModalOpen(null);
  };

  const deleteFolder = () => {
    mutate();
    setIsModalOpen(null);
    if (closePreview) closePreview();
  };

  return (
    <>
      <Modal
        title={<Text style={{ textAlign: 'center' }}>Are you sure you wish to permanently remove this query?</Text>}
        open={isModalOpen}
        footer={false}
        closable={false}
        className="project-modal"
      >
        <VerticalSpace>
          <Button block onClick={deleteFolder} type="primary">
            Delete
          </Button>
          <Button block type="default" onClick={handleCancel}>
            Cancel
          </Button>
        </VerticalSpace>
      </Modal>
    </>
  );
};
