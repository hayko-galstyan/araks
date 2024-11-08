import { Col, Row } from 'antd';
import React from 'react';
import styled from 'styled-components';
import { PropertiesSection } from './left-section';
import { ConnectionSection } from './right-section';

export const Main = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  position: relative;
  z-index: 0;
  .row {
    height: 100%;
  }

  .ant-select-selector {
    align-items: center;
    padding-top: 0 !important;
  }

  .ant-form-item {
    margin-bottom: 0;
  }

  .left-section {
    margin: 1rem 0;
    overflow: auto;
  }

  .right-section {
    background: #f2f2f2;
    box-shadow: -10px 0 10px 0 rgba(111, 111, 111, 0.1);
  }

  .disabled {
    opacity: 0.2;
  }
`;

export const FuzzyMatchMain: React.FC = () => {
  return (
    <Main className="main-section">
      <Row className="row">
        <Col span={18} className="left-section">
          <PropertiesSection />
        </Col>
        <Col span={6} className="right-section">
          <ConnectionSection />
        </Col>
      </Row>
    </Main>
  );
};
