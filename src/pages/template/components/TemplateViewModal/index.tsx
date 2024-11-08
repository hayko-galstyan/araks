import { ReactComponent as LeftCircle } from '../../../../components/icons/left-button.svg';
import { PreviewSchema } from '../PreviewSchema';
import { Button } from 'components/button';
import { MenuText, Text } from 'components/typography';
import styled from 'styled-components';
import { Col, Drawer, Row, Skeleton, Image, Space } from 'antd';
import { COLORS, PATHS } from 'helpers/constants';
import { useNavigate } from 'react-router-dom';
import { TemplatesItemInfo } from 'api/types';

type Props = {
  isModalOpen: boolean;
  setIsModalOpen: (value: undefined | TemplatesItemInfo) => void;
  templateId?: string;
  item: TemplatesItemInfo | undefined;
  isPublic?: boolean;
};
type TitleProps = {
  handleCancel: () => void;
  item: TemplatesItemInfo;
};

const ProjectWrapModal = styled(Drawer)`
  & {
    margin: 0;
    margin-left: auto;
    position: static;
    min-height: 100vh;
    height: 100%;

    &.ant-drawer-content {
      background: #fdfdfd;
      box-shadow: -10px 0px 10px rgba(111, 111, 111, 0.1);
      border-radius: 4px;
      padding: 0;

      .ant-drawer-header {
        padding: 0 16px 0 72px;
        margin: 0;

        .back-link {
          position: absolute;
          font-size: 40px;
          left: -20px;
          top: 33px;
          cursor: pointer;
        }
      }

      .ant-drawer-body {
        overflow: unset;
        padding: 0;

        .project-content {
          height: calc(100vh - 270px);
        }
      }
    }
  }
`;

const TitleWrapper = styled(Space)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 104px;
  background: transparent;
`;
const Description = styled.text`
  font-family: 'Rajdhani';
  font-weight: 600;
  font-size: 16px;
  max-width: '10%';
  overflow: hidden;
`;
const FooterWrapper = styled.div`
  background: linear-gradient(119.84deg, rgba(255, 255, 255, 0.5) 88.78%, rgba(255, 255, 255, 0.49) 165.43%);
  border: 1px solid rgba(255, 255, 255, 0.5);
  padding: 42px 0;
`;

const Title = ({ item, handleCancel }: TitleProps) => (
  <>
    <LeftCircle className="back-link" onClick={handleCancel} />
    <TitleWrapper>
      <Space>
        <Col>
          <Image
            preview={false}
            style={{
              width: 56,
              height: 56,
              background: '#F2F2F2',
              alignItems: 'center',
              borderRadius: 8,
            }}
            src={`${process.env.REACT_APP_AWS_URL}${item.screenshot}`}
          />
        </Col>
        <Col style={{ display: 'grid', gridTemplateColumns: 'auto' }}>
          <Text>{item.name}</Text>
          <Text>
            By {item.created_by.first_name} {item.created_by.last_name}
          </Text>
        </Col>
      </Space>
    </TitleWrapper>
  </>
);

export const TemplateViewModal = ({ isModalOpen, setIsModalOpen, templateId, isPublic, item }: Props) => {
  const navigate = useNavigate();
  const handleCancel = () => {
    setIsModalOpen(undefined);
  };
  return (
    <>
      <ProjectWrapModal
        open={isModalOpen}
        title={item ? <Title handleCancel={handleCancel} item={item} /> : <Skeleton.Input active block />}
        footer={
          <FooterWrapper>
            <Row
              justify="center"
              style={{ position: 'absolute', bottom: '6rem', backdropFilter: 'blur(8px)', width: '100%' }}
            >
              <Col
                style={{
                  width: '100%',
                  padding: '0 2rem',
                  alignItems: 'center',
                  display: 'flex',
                  justifyContent: 'center',
                }}
              >
                {item && <Description>{item.description}</Description>}
              </Col>
            </Row>
            <Row
              justify="center"
              style={{
                position: 'absolute',
                bottom: '0',
                backdropFilter: 'blur(8px)',
                width: '100%',
                height: '5rem',
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <Col span={12} style={{ backgroundColor: 'red', position: 'absolute', zIndex: 5 }}>
                <Button
                  block
                  type="primary"
                  onClick={() => templateId && navigate(PATHS.PROJECT_TEMPLATE_EDIT.replace(':id', templateId))}
                >
                  <MenuText strong style={{ color: COLORS.PRIMARY.WHITE }}>
                    OPEN TEMPLATE
                  </MenuText>
                </Button>
              </Col>
            </Row>
          </FooterWrapper>
        }
        footerStyle={{ padding: 0 }}
        closable={false}
        placement="right"
        width="50vw"
        onClose={handleCancel}
      >
        {item && (
          <>
            <PreviewSchema id={item.id} />
          </>
        )}
      </ProjectWrapModal>
    </>
  );
};
