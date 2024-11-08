import styled from 'styled-components';
import { SecondaryText, Text } from '../../../typography';
import { FC, ReactNode } from 'react';

type ToolSetPanelProps = FC<{ title: string; description: string; icon: ReactNode; handleClick?: VoidFunction }>;

const Panel = styled.div`
  display: flex;
  flex-direction: row;
  border: 1px solid #232f6a1a;
  padding: 17px;
  gap: 8px;
  cursor: pointer;

  &:hover {
    background: #b3b4b45a;
  }
`;

export const ToolSetPanel: ToolSetPanelProps = ({ title, description, icon, handleClick }) => {
  return (
    <Panel onClick={handleClick}>
      <div>{icon}</div>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <Text style={{ color: '#414141', fontSize: '20px', fontWeight: 500 }}>{title}</Text>
        <SecondaryText style={{ color: '#808080', fontSize: '16px', fontWeight: 500 }}>{description}</SecondaryText>
      </div>
    </Panel>
  );
};
