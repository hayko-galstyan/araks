import React from 'react';
import { CloseOutlined } from '@ant-design/icons';
import { COLORS } from 'helpers/constants';
import { UsefulInformationTooltip } from 'components/tool-tip/useful-information-tooltip';
import { Text } from 'components/typography';
import styled from 'styled-components';

export const Title = styled.div`
  display: flex;
  gap: 0.5rem;
`;

export const Header = styled.div`
  height: 3%;
  padding: 2rem;
  display: flex;
  justify-content: space-between;
  background: #f2f2f2;
  box-shadow: 0 10px 10px 0 rgba(111, 111, 111, 0.1);
  z-index: 1;
`;

export const FuzzyMatchHeader: React.FC<{ onCancel: VoidFunction }> = ({ onCancel }) => {
  return (
    <Header className="header-section">
      <Title>
        <Text style={{ color: COLORS.PRIMARY.GRAY_DARK, fontSize: '20px' }}>Fuzzy match</Text>
        <UsefulInformationTooltip infoText="FuzzyWazzy: Matching Data with Precision" />
      </Title>
      <CloseOutlined style={{ color: COLORS.PRIMARY.BLUE }} onClick={onCancel} />
    </Header>
  );
};
