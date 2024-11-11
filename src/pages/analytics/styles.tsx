import styled from 'styled-components';
import { COLORS } from 'helpers/constants';

export const AnalyticToolsDashBoard = styled.div<{ width: number; height: number }>`
  width: ${(props) => props.width}px;
  height: ${(props) => props.height}px;
  border: 2px dashed ${COLORS.MAIN_GRAY_SILVER};
  background: ${COLORS.PRIMARY.WHITE};
  position: relative;
  left: 5px;
  top: 5px;
  border-radius: 4px;

  & .react-resizable-handle {
    position: absolute;
    width: 16px;
    height: 16px;
    background-repeat: no-repeat;
    background-origin: content-box;
    background-size: contain;
    box-sizing: border-box;
    background-image: none;
    background-position: bottom right;
    padding: 0 3px 3px 0;
  }

  & .react-resizable {
    position: absolute;
    border: 0.5px dashed ${COLORS.MAIN_GRAY_SILVER};
    width: max-content !important;
    height: max-content !important;
  }

  & .react-resizable-handle-nw {
    top: -4px;
    left: -4px;
    cursor: nw-resize;
    width: 8px;
    height: 8px;
    background: ${COLORS.MAIN_GRAY_SILVER};
    border-radius: 100%;
  }

  & .react-resizable-handle-ne {
    top: -4px;
    right: -4px;
    cursor: ne-resize;
    width: 8px;
    height: 8px;
    background: ${COLORS.MAIN_GRAY_SILVER};
    border-radius: 100%;
  }

  & .react-resizable-handle-sw {
    bottom: -4px;
    left: -4px;
    cursor: sw-resize;
    width: 8px;
    height: 8px;
    background: ${COLORS.MAIN_GRAY_SILVER};
    border-radius: 100%;
  }

  & .react-resizable-handle-se {
    bottom: -4px;
    right: -4px;
    cursor: se-resize;
    width: 8px;
    height: 8px;
    background: ${COLORS.MAIN_GRAY_SILVER};
    border-radius: 100%;
  }
`;
