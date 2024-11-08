import { ReactComponent as LeftCircle } from 'components/icons/left-button.svg';
import { Button } from 'components/button';
import { MenuText, Text } from 'components/typography';
import { Col, Image, Row, Spin } from 'antd';
import { useSchema } from 'components/layouts/components/schema/wrapper';
import { TemplateTypes } from '../use-template-collapse/template-list-collapse';
import { ContentWrapper, FooterWrapper, RowTitleWrapper, TemplateDrawer, TemplateList } from './style';
import { PreviewSchema } from '../../../../schema/preview';
import { Toolbar } from 'components/tool-bar';
import { COLORS } from 'helpers/constants';
import { useTemplate } from 'api/project-templates/use-template';
import { useParams } from 'react-router-dom';
import { useState } from 'react';
import { SearchWithEnter } from 'components/input-withEnter';

type TitleProps = {
  handleCancel: () => void;
  text?: string;
  icon?: string;
};

const Title = ({ handleCancel, text, icon }: TitleProps) => (
  <>
    <LeftCircle className="back-link" onClick={handleCancel} />
    <RowTitleWrapper>
      <Col span={2}>
        {icon && <Image style={{ width: '100px', height: '100px' }} src={`${process.env.REACT_APP_AWS_URL}${icon}`} />}
      </Col>
      <Col span={14}>
        <Text>{text ?? 'No template yet'}</Text>
      </Col>
    </RowTitleWrapper>
  </>
);

export const TemplateView = () => {
  const [search, setSearch] = useState<string>('');
  const { view_template, finishTemplateView, graph_preview, template_preview_data } = useSchema() ?? {};
  const { id } = useParams();
  const [leftBarLoading, setLeftBarLoading] = useState(false);

  const { mutate, isLoading } = useTemplate({
    onSuccess: () => {
      handleCancel();
    },
  });

  const handleCancel = () => {
    finishTemplateView();
  };

  const handleClick = () => {
    mutate({
      template_id: template_preview_data.id ?? '',
      project_id: id,
    });
  };

  return (
    <TemplateDrawer
      open={view_template?.isOpened}
      title={
        <Title handleCancel={handleCancel} text={template_preview_data?.title} icon={template_preview_data?.icon} />
      }
      footer={
        <FooterWrapper>
          <Row
            justify="start"
            style={{
              alignItems: 'center',
              height: '100%',
            }}
          >
            <Col span={7}>
              <Button block type="primary" onClick={handleClick} disabled={isLoading} loading={isLoading}>
                <MenuText strong style={{ color: '#ffffff' }}>
                  USE TEMPLATE
                </MenuText>
              </Button>
            </Col>
            <Col offset={1} span={16}>
              <Text strong style={{ color: COLORS.PRIMARY.GRAY_DARK }}>
                {template_preview_data?.description}
              </Text>
            </Col>
          </Row>
        </FooterWrapper>
      }
      headerStyle={{ padding: '0 2rem' }}
      footerStyle={{ padding: 0 }}
      closable={false}
      placement="right"
      width="80vw"
      onClose={handleCancel}
    >
      <ContentWrapper>
        <TemplateList>
          <SearchWithEnter setSearch={setSearch} />
          <Spin spinning={isLoading || leftBarLoading}>
            <TemplateTypes search={search} setLeftBarLoading={setLeftBarLoading} />
          </Spin>
        </TemplateList>
        <Spin spinning={isLoading || leftBarLoading}>
          <PreviewSchema />
        </Spin>

        <Toolbar graph_preview={graph_preview} position="right" isTemplatePreview={true} />
      </ContentWrapper>
    </TemplateDrawer>
  );
};
