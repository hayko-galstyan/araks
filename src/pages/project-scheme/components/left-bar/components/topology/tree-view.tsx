import React from 'react';
import styled from 'styled-components';
import { useSchema } from 'components/layouts/components/schema/wrapper';
import { createNodesTree } from 'components/layouts/components/data-sheet/utils';
import { selectNodeWithZoom } from 'components/layouts/components/schema/helpers/selection';
import { Tree } from 'antd';
import { EventDataNode } from 'antd/es/tree';
import { TreeNodeType } from 'pages/data-sheet/types';
import { IProjectType } from 'api/types';
import { PATH } from 'components/layouts/components/schema/helpers/constants';
import { useIsXXlScreen } from 'hooks/use-breakpoint';
import { useIsTemplateEditPage } from 'hooks/use-is-template-page';

type Props = React.FC<{ nodes: IProjectType[] }>;

type OnSelect = (selectedKeys: string[], e: { selected: boolean; node: EventDataNode<TreeNodeType> }) => void;

const StyledTree = styled(({ color, isXXl, ...props }) => <Tree {...props} />)`
  && {
    background-color: transparent;
    overflow: auto;
    height: calc(100vh - ${(props) => (props.isXXl ? 152 : 130) + 65}px);

    .ant-tree-treenode {
      padding: 0 6px;

      .ant-badge {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        gap: 0.2rem;
        width: 100%;

        .ant-badge-status-text {
          display: flex;
        }

        .ant-typography {
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          max-width: 12rem;
        }
      }

      .ant-tree-node-content-wrapper {
        &:hover {
          background-color: transparent;
        }
      }
    }

    .ant-tree-treenode-selected {
      background-color: ${(props) => `${props.color}20`};

      .ant-tree-node-selected {
        background-color: transparent;
        .ant-badge-status-text {
          font-weight: 700;
        }
      }
    }
  }
`;

export const TreeView: Props = ({ nodes }) => {
  const { graph, view_template, graph_preview, selected, setSelected } = useSchema() ?? {};
  const isXXl = useIsXXlScreen();
  const isTemplateEditPage = useIsTemplateEditPage();
  const onSelect: OnSelect = (selectedKeys, e) =>
    selectNodeWithZoom(
      e.node.id,
      isTemplateEditPage || view_template?.isOpened ? graph_preview : graph,
      selected,
      setSelected
    );

  return (
    <StyledTree
      isXXl={isXXl}
      onSelect={onSelect}
      selectedKeys={[selected?.node?.id ?? '']}
      treeData={createNodesTree(nodes, false, undefined, isXXl ? 21 : 26)}
      autoExpandParent
      blockNode
      defaultExpandAll
      color={selected?.node?.attr(PATH.NODE_COLOR)}
    />
  );
};
