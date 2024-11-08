import styled from 'styled-components';

import { COLORS } from 'helpers/constants';

export const ChatContainer = styled.div<{ open: boolean }>`
  & {
    max-width: 480px;
    max-height: 80%;
    height: 100%;
    width: 100%;
    position: fixed;
    bottom: 0;
    right: 0;
    z-index: 1000;
    background-color: ${COLORS.PRIMARY.WHITE};
    opacity: ${(props) => (props.open ? 1 : 0)};
    visibility: ${(props) => (props.open ? 'visible' : 'hidden')};
    transition: opacity 0.2s ease-in-out, visibility 0.2s ease-in-out;
  }
`;

export const ChatHeader = styled.div`
  & {
    display: flex;
    flex-wrap: nowrap;
    justify-content: space-between;
    width: 100%;
    background-color: ${COLORS.PRIMARY.BLUE};
    color: ${COLORS.PRIMARY.WHITE};
    padding: 20px;
    box-shadow: 10px 10px 9px ${COLORS.MAIN_GRAY};
    & svg {
      cursor: pointer;
    }
  }
`;

export const ChatBody = styled.div`
  max-height: calc(100% - 190px);
  height: 100%;
  overflow: auto;
  padding: 20px;
  display: flex;
  flex-direction: column;

  .message {
    display: flex;
    align-items: center;
    gap: 10px;
    max-width: 300px;
    width: fit-content;
    position: relative;
    margin-bottom: 16px;
    padding: 10px;
    border-radius: 16px;
    color: ${COLORS.PRIMARY.WHITE};
  }

  .receiver {
    background-color: #86ac58;
    margin-right: auto;
  }

  .sender {
    background-color: #03a9f4;
    margin-left: auto;
    flex-direction: row-reverse;
  }
`;

export const ChatFooter = styled.div<{ disabled: boolean }>`
  & {
    position: absolute;
    width: 90%;
    height: 92px;
    display: flex;
    flex-wrap: nowrap;
    justify-content: space-between;
    gap: 10px;
    bottom: 4px;
    margin: 24px;
    border-radius: 12px;
    padding: 10px;
    border: 0.5px solid ${COLORS.PRIMARY.GRAY_LIGHT};
  }

  & .ant-input {
    border: none;
  }

  & svg {
    cursor: pointer;
    opacity: ${(props) => (props.disabled ? 0.5 : 1)};
    pointer-events: ${(props) => (props.disabled ? 'none' : 'auto')};
  }
`;

export const MessageContent = styled.div`
  & {
    display: flex;
    flex-wrap: nowrap;
  }
`;

export const Msg = styled.div<{ type: string }>`
  display: flex;
  flex-wrap: nowrap;
  gap: 10px;
  animation: message 1.5s ease-out 0s forwards;
  flex-direction: ${(props) => (props.type === 'sender' ? 'row-reverse' : '')};

  @keyframes message {
    0% {
      margin-top: -100px;
      opacity: 0;
    }
    50% {
      margin-top: 10px;
      opacity: 0.5;
    }
    100% {
      margin-top: 0;
      opacity: 1;
    }
  }
`;
