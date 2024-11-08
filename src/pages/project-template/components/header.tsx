import React from 'react';
import { Row, Col } from 'antd';
import { CloseOutlined } from '@ant-design/icons';
import { StyledSteps } from 'components/drawer/import-steps-drawer';
import { COLORS, PATHS } from 'helpers/constants';
import styled from 'styled-components';
import { SecondaryText } from 'components/typography';
import { useNavigate, useParams } from 'react-router-dom';
interface HeaderProps {
  step?: number;
}

const HeaderWrapper = styled.div`
  height: 5.5rem;
  background: #f7f7f7;
  box-shadow: 0 6px 6px 0 rgba(111, 111, 111, 0.1);

  display: flex;
  justify-content: space-between;

  .ant-row {
    width: 100%;

    .ant-col {
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }

  .ant-steps {
    margin: 1rem;
    width: 40%;

    .ant-steps-item-content {
      margin-top: 0;
    }
  }
`;

const steps = [
  { title: <SecondaryText>Select Types</SecondaryText>, content: 'First-content' },
  { title: <SecondaryText>Set Positions</SecondaryText>, content: 'Second-content' },
  { title: <SecondaryText>Save Template</SecondaryText>, content: 'Last-content' },
];

export const Header: React.FC<HeaderProps> = ({ step }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const redirectToSchema = () => navigate(PATHS.PROJECT_SCHEME.replace(':id', id || ''));

  const items = steps.map((item) => ({ key: item.title, title: item.title }));

  return (
    <HeaderWrapper>
      <Row>
        <Col span={23}>
          <StyledSteps current={step} items={items} labelPlacement="vertical" />
        </Col>
        <Col>
          <CloseOutlined key="delete" onClick={redirectToSchema} style={{ color: COLORS.PRIMARY.BLUE, width: 18 }} />
        </Col>
      </Row>
    </HeaderWrapper>
  );
};
