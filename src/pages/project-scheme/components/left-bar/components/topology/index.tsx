import React from 'react';
import styled from 'styled-components';
import { Skeleton } from 'antd';
import { SecondaryText } from 'components/typography';
import { TreeView } from './tree-view';
import { useTypes } from 'hooks/use-types';

const TopologyPanelStyle = styled.div<{ isTemplate: boolean }>`
  display: flex;
  flex-direction: column;
  gap: 12px;
  position: fixed;
  left: 0;
  top: ${(props) => (props.isTemplate ? 200 : 152)}px;
  width: 300px;
  height: 100%;
  z-index: 2;
  background-color: rgb(247, 247, 247);
  box-shadow: rgba(111, 111, 111, 0.1) -10px 10px 10px inset;

  .ant-tree {
    height: ${(props) => props.isTemplate && 'calc(100vh - 280px)'};
  }
`;

const NodeHeader = styled(SecondaryText)`
  margin-top: 20px;
  margin-left: 32px;
`;

export const Topology: React.FC<{ isTemplate?: boolean }> = ({ isTemplate = false }) => {
  const { nodes, isInitialLoading } = useTypes();

  return (
    <TopologyPanelStyle isTemplate={isTemplate}>
      <NodeHeader>Schema vault</NodeHeader>
      {isInitialLoading ? <Skeleton /> : <TreeView nodes={nodes} />}
    </TopologyPanelStyle>
  );
};
