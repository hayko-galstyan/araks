import { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Row, Image, Col, Avatar, Button } from 'antd';
import styled, { css } from 'styled-components';
import { TemplatesItemInfo } from 'api/types';
import { getAvatarPath } from 'helpers/utils';
import { COLORS, screenSize, PATHS } from 'helpers/constants';
import { TemplateActionMenu } from './action-modal/template-action-menu';
import { ReactComponent as DotsVertical } from 'components/icons/dots-vertical.svg';
import { ReactComponent as PublicProject } from 'components/icons/public-project.svg';
import { ProjectActionPopover } from 'components/popover';
import { FullWidth } from 'types/project';
import { DelateTemplateModal } from './DelateModalTemplate';
import { EditTemplateModal } from './EditeModalTemplate';
const TemplateItemBox = styled(Row)`
  position: relative;
  width: 285px;
  height: 270px;
  display: flex;
  min-height: 600;
  border-radius: 4px;
  color: #414141;
  background: #fff;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  margin: 8px;
`;
const FullWidthRow = styled(Row)`
  width: 285px;
  flex-direction: column;
  margin-left: 8px;
  margin-right: 16px;
  align-self: flex-end;
`;

const StyledButton = styled(Button)`
  border: none;
  border-radius: 4;
  background-color: ${COLORS.PRIMARY.BLUE} !important;
  color: ${COLORS.PRIMARY.WHITE};
  transition: transform 0.3s ease, box-shadow 0.3s ease;


  &:hover {
    transform: scale(1.05);  /* Slightly increase the size */
    box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.2);  /* Add shadow */
  
  }
`;
const StyledPreviewButton = styled(Button)`
  border: none;
  border-radius: 4px;
  background-color: ${COLORS.PRIMARY.WHITE};
  color: ${COLORS.PRIMARY.BLUE};
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: scale(1.05);
    box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.2); 
  
  }
`;

const DotsWrapper = styled.div<FullWidth>`
  & {
    position: relative;
    width: 10px;
    text-align: center;

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
      fill: ${COLORS.PRIMARY.BLUE};
      font-size: 20px;
    }
  }
`;

const TypeIcon = styled.div`
  background: rgba(242, 242, 242, 0.7);
  border: 0.5px solid #ffffff;
  box-shadow: 0px 10px 10px rgba(111, 111, 111, 0.2);
  padding: 2px;
  border-radius: 4px;
  position: absolute;
  left: 5px;
  top: 2px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;
const UserName = styled.text`
  color: ${COLORS.PRIMARY.GRAY};
  font-family: 'Rajdhani';
  font-size: 20px;
  font-weight: 600;
`;
const ButtonText = styled.text`
  font-family: 'Rajdhani';
  font-size: 16px;
  font-weight: 700;
  color: ${(props) => props.color || 'black'};
`;

const Titel = styled.text`
  font-family: 'Rajdhani';
  font-size: 18px;
  font-weight: 700;
  color: ${(props) => props.color || 'black'};
`;

type Props = {
  item: TemplatesItemInfo;
  showOptions: boolean;
  setTemplateId: (templateId: TemplatesItemInfo | undefined) => void;
};

export const TemplateItem = ({ item, showOptions, setTemplateId }: Props) => {
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [isClicked, setIsClicked] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const navigate = useNavigate();
  const openModal = useCallback(() => {
    setIsClicked(false);
    setIsDeleteModalOpen(true);
  }, []);
  const openEditModal = useCallback(() => {
    setIsClicked(false);
    setIsEditModalOpen(true);
  }, []);
  const handleMouseEnter = () => {
    setIsHovered(true);
  };
  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <TemplateItemBox onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      <Row style={{ width: '100%', marginTop: 8, marginLeft: 8 }}>
        <Col span={23} style={{ display: 'flex', justifyContent: 'center' }}>
          {item.screenshot !== null && item.screenshot !== '' && (
            <Image
              preview={false}
              style={{
                width: 260,
                height: 200,
                background: '#F2F2F2',
                alignItems: 'center',
              }}
              src={`${process.env.REACT_APP_AWS_URL}${item.screenshot}`}
            />
          )}
        </Col>

        {showOptions && (
          <Col style={{ display: 'flex', alignItems: 'start', justifyContent: 'center' }}>
            <ProjectActionPopover
              align={{ offset: [-20, -5] }}
              open={isClicked}
              onOpenChange={(open: boolean) => {
                !open && setIsClicked(false);
                return open;
              }}
              content={
                <TemplateActionMenu
                  projectId={item.id}
                  setIsDeleteModalOpen={openModal}
                  setIsEditModalOpen={openEditModal}
                />
              }
            >
              <DotsWrapper
                fullWidth={true}
                onClick={() => setIsClicked((prev) => !prev)}
                style={{
                  alignItems: 'center',
                  display: 'flex',
                  justifyContent: 'center',
                  height: '20px',
                  width: '9px',
                  borderRadius: '8px',
                }}
              >
                <DotsVertical className="more-dots" />
              </DotsWrapper>
            </ProjectActionPopover>
          </Col>
        )}
      </Row>

      {isHovered ? (
        <Row
          style={{
            width: 285,
            alignItems: 'center',
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-around',
            background: '#F2F2F2',
            height: '50px',
            alignSelf: 'self-end',
            paddingBottom: 4,
            paddingTop: 4,
          }}
        >
          <Col>
            <StyledButton onClick={() => navigate(PATHS.PROJECT_TEMPLATE_EDIT.replace(':id', item.id))}>
              <ButtonText color={COLORS.PRIMARY.WHITE}>OPEN TEMPLATE</ButtonText>
            </StyledButton>
          </Col>
          <Col>
            <StyledPreviewButton
              onClick={() => setTemplateId(item)}
            >
              <ButtonText color={COLORS.PRIMARY.BLUE}>PREVIEW</ButtonText>
            </StyledPreviewButton>
          </Col>
        </Row>
      ) : (
        <FullWidthRow>
          <Row gutter={12}>
            <Col>{item.created_by.avatar !== null && <Avatar src={getAvatarPath(item.created_by.avatar)} />}</Col>

            <Col>
              <UserName>{item.created_by.first_name}</UserName>
            </Col>
            <Col>
              <UserName>{item.created_by.last_name}</UserName>
            </Col>
          </Row>
          <FullWidthRow>
            <Col style={{ whiteSpace: 'nowrap', maxWidth: 240, overflow: 'hidden', textOverflow: 'ellipsis' }}>
              <Titel color={COLORS.PRIMARY.GRAY_DARK}>{item.name}</Titel>
            </Col>
          </FullWidthRow>
        </FullWidthRow>
      )}
      <EditTemplateModal isModalOpen={isEditModalOpen} setIsModalOpen={setIsEditModalOpen} item={item} />
      <DelateTemplateModal isModalOpen={isDeleteModalOpen} setIsModalOpen={setIsDeleteModalOpen} projectId={item.id} />
      {item.privacy === 'public' && (
        <TypeIcon>
          {item.privacy === 'public' ? <PublicProject style={{ width: 16, height: 16 }} /> : undefined}
        </TypeIcon>
      )}
    </TemplateItemBox>
  );
};
