import styled from 'styled-components';

export const TextEditorContainer = styled.div<{ width: number; height: number }>`
  width: ${(props) => props.width}px;
  height: ${(props) => props.height}px;
  padding: 16;
  overflow-y: auto;
`;
