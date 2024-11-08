import { Row } from 'antd';
import { COLORS, ProjectPrivacy, screenSize } from 'helpers/constants';
import { FullWidth } from 'types/project';
import styled, { css } from 'styled-components';
import { useCallback, useState } from 'react';
import { ReactComponent as DotsVertical } from 'components/icons/dots-vertical.svg';
import { ProjectActionPopover } from 'components/popover';
import { TemplateEditActionMenu } from './TemplateEditActionMenu';
import { EditTemplateModal } from 'pages/template/components/EditeModalTemplate';
import { DelateTemplateModal } from 'pages/template/components/DelateModalTemplate';
import { TemplatesItemInfo } from 'api/types';

interface Props {
  titel: string;
  id: string;
  item: TemplatesItemInfo & { originalPrivacy: ProjectPrivacy };
}
const TemplateTitelBox = styled(Row)`
  width: '100%';
  display: flex;
  justify-content: space-between;
  min-height: 600;
  border-radius: 4px;
  color: #414141;
  background: #414141;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  padding: 8px;
  margin-top: 8px;
`;
const TitelName = styled.text`
  color: ${COLORS.PRIMARY.WHITE};
  font-size: 20px;
  font-weight: 600;
`;
const DotsWrapper = styled.div<FullWidth>`
  & {
    position: relative;

    ${(props) =>
      props.fullWidth
        ? css``
        : css`
            height: 30px;
            width: 15px;
            padding: 5px;
            border-radius: 8px;
            left: 90px;
            bottom: 145px;
            @media (max-width: ${screenSize.xxl}) {
              left: 88px;
              bottom: 138px;
            }
          `}

    &:hover, &:active {
      border-color: transparent;
      background-color: rgba(35, 47, 106, 0.1);
    }

    circle {
      fill: ${COLORS.PRIMARY.WHITE};
      font-size: 20px;
    }
  }
`;
export const TemplateTitle = ({ titel, id, item }: Props) => {
  const [isClicked, setIsClicked] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const openModal = useCallback(() => {
    setIsClicked(false);
    setIsDeleteModalOpen(true);
  }, []);
  const openEditModal = useCallback(() => {
    setIsClicked(false);
    setIsEditModalOpen(true);
  }, []);

  return (
    <TemplateTitelBox>
      <TitelName>{titel}</TitelName>
      {item.originalPrivacy === ProjectPrivacy.PRIVATE && (
        <>
          <ProjectActionPopover
            align={{ offset: [-20, -5] }}
            open={isClicked}
            onOpenChange={(open: boolean) => {
              !open && setIsClicked(false);
              return open;
            }}
            content={
              <TemplateEditActionMenu  setIsDeleteModalOpen={openModal} setIsEditModalOpen={openEditModal} />
            }
          >
            <DotsWrapper
              id="private"
              fullWidth={true}
              onClick={() => setIsClicked((prev) => !prev)}
              style={{ alignItems: 'center', display: 'flex', justifyContent: 'center', cursor: 'pointer' }}
            >
              <DotsVertical className="more-dots" />
            </DotsWrapper>
          </ProjectActionPopover>
          <EditTemplateModal isModalOpen={isEditModalOpen} setIsModalOpen={setIsEditModalOpen} item={item} />
          <DelateTemplateModal isModalOpen={isDeleteModalOpen} setIsModalOpen={setIsDeleteModalOpen} projectId={id} />
        </>
      )}
    </TemplateTitelBox>
  );
};
