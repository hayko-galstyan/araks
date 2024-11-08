import { Tree } from 'antd';
import styled from 'styled-components';

export const NodeTree = styled(({ color, isXX, isTableView, ...props }) => <Tree {...props} />)`
  && {
    background-color: transparent;
    overflow: auto;
    height: ${(props) => `${!props.isTableView ? 'auto' : `calc(100vh - ${(props.isXXl ? 152 : 130) + 200}px)`}`};

    .ant-tree-treenode {
      .ant-tree-title {

        .ant-badge {
          display: flex;
          align-items: center;

          .ant-badge-status-text {
          }
        }

        .ant-typography {
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          max-width: 20rem;
        }
      }

      .ant-tree-node-content-wrapper {
        &:hover {
          background-color: transparent;
        }
      }

      .ant-tree-checkbox-inner {
        width: 20px;
        height: 20px;
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
