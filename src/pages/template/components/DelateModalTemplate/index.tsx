import { TEMPLATE_DELETE_URL, useDeleteTemplate } from 'api/project-templates/use-delete-template';
import { Button } from 'components/button';
import { Modal } from 'components/modal';
import { VerticalSpace } from 'components/space/vertical-space';
import { Text } from 'components/typography';
import { useNavigate } from 'react-router-dom';
import { PATHS } from 'helpers/constants';
import { useIsTemplateEditPage } from 'hooks/use-is-template-page';

type Props = {
  isModalOpen: boolean;
  closePreview?: () => void;
  setIsModalOpen: (value: boolean | ((prevVar: boolean) => boolean)) => void;
  projectId: string;
};

export const DelateTemplateModal = ({ isModalOpen, setIsModalOpen, projectId, closePreview }: Props) => {
  const navigate = useNavigate();
  const isTemplateEdit = useIsTemplateEditPage();
  const { mutate } = useDeleteTemplate({
    projectId,
    url: TEMPLATE_DELETE_URL,
  });

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const deleteFolder = () => {
    mutate();
    setIsModalOpen(false);
    if (closePreview) closePreview();
    if (isTemplateEdit) {
      navigate(PATHS.TEMPLATE);
    }
  };

  return (
    <>
      <Modal
        title={<Text style={{ textAlign: 'center' }}>Are you sure you wish to permanently remove this template?</Text>}
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
