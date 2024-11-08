import { CSSProperties } from 'react';
import styled from 'styled-components';
import { List, Space } from 'antd';

export const getElement = (selector: string) => document.querySelector(selector);

export const contentStyle: CSSProperties = {
  position: 'fixed',
  boxShadow: 'none',
  right: 0,
};

export const drawerStyle: CSSProperties = {
  boxShadow: '-6px 32px 32px 0px #9B9FAD40',
  width: window.innerWidth / 3,
  top: 0,
  right: 0,
  position: 'absolute',
  border: '1px solid #FFFFFF80',
  background:
    'linear-gradient(104.02deg, rgba(249, 249, 250, 0.6) 0%, rgba(249, 249, 250, 0.8) 0.01%, rgba(255, 255, 255, 0.49) 100%)',
  backdropFilter: 'blur(8px)',
};

export const maskStyle: CSSProperties = {
  background: 'transparent',
};

export const bodyStyle: CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  gap: '1rem',
};

export const LabelName = styled.span`
  color: #c5c5c5;
  font-size: 16px;
  font-weight: 600;
  letter-spacing: 1.12px;
`;

export const drawerPosition = () => ({
  width: window.innerWidth - (getElement('.project-save')?.clientWidth as number),
  top:
    (getElement('.ant-layout-header')?.clientHeight as number) + (getElement('.ant-tabs-nav')?.clientHeight as number),
});

export const StyledJiraListItem = styled(({ color, ...props }) => <List.Item {...props} />)`
  && {
    border: none;
    justify-content: flex-start;
    padding: 2px 0;

    &:before {
      content: '•';
      margin-right: 8px;
      color: black;
      font-size: 20px;
    }
  }
`;

export const DropdownContainer = styled(Space)`
  position: absolute;
  justify-content: center;
  align-items: center;
  display: flex;
  width: 100%;
  height: 100%;

  .ant-select-selector {
    padding-top: 0 !important;
    display: flex;
    align-items: center;
  }
`;

export const ToolSetJiraWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 17px;
  gap: 1rem;
`;
