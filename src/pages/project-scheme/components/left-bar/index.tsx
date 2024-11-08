import styled from 'styled-components';
import { Topology } from './components/topology';

const LeftPanelStyle = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  position: fixed;
  left: 0;
  top: 152px;
  width: 300px;
  height: 100%;
  z-index: 2;
  background-color: rgb(247, 247, 247);
  box-shadow: rgba(111, 111, 111, 0.1) -10px 10px 10px inset;

  .ant-tree {
    overflow-x: hidden;
  }
`;

export const LeftBar = () => {
  return (
    <LeftPanelStyle>
      <Topology />
    </LeftPanelStyle>
  );
};
