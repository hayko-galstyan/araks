import styled from 'styled-components';
import { Drawer, Row } from 'antd';

export const TemplateDrawer = styled(Drawer)`
  & {
    margin: 0 0 0 auto;
    position: static;
    min-height: 100vh;
    height: 100%;

    &.ant-drawer-content {
      background: #fdfdfd;
      box-shadow: -10px 0px 10px rgba(111, 111, 111, 0.1);
      border-radius: 4px;
      padding: 0;

      .ant-drawer-header {
        padding: 0 16px 0 72px;
        margin: 0;

        .back-link {
          position: absolute;
          font-size: 40px;
          left: -20px;
          top: 33px;
          cursor: pointer;
        }
      }

      .ant-drawer-body {
        overflow: unset;
        padding: 0;

        .project-content {
          height: calc(100vh - 270px);
        }
      }
    }
  }
`;

export const RowTitleWrapper = styled(Row)`
  display: flex;
  align-items: center;
  height: 104px;
  width: 100%;
  background: transparent;
`;

export const FooterWrapper = styled.div`
  background: linear-gradient(119.84deg, rgba(255, 255, 255, 0.5) 88.78%, rgba(255, 255, 255, 0.49) 165.43%);
  border: 1px solid rgba(255, 255, 255, 0.5);
  height: 105px;
`;

export const ContentWrapper = styled.div`
  display: flex;
`;

export const TemplateList = styled.div<{ isTemplateEdit?: boolean }>`
  min-width: ${(props) => (props.isTemplateEdit ? '300px' : '30vw')};
  max-width: ${(props) => (props.isTemplateEdit ? '300px' : '30vw')};

  display: flex;
  flex-direction: column;
  gap: 0.2rem;

  .title-template {
    border: none;
    border-radius: 0;

    .title-template-content-box {
      overflow: auto;
      gap: 0.1rem;
      display: flex;
      flex-direction: column;
      scrollbar-gutter: stable;
      padding: 4px 0 4px 4px !important;
      min-height: max-content !important;

      .ant-collapse {
        display: flex;
        flex-direction: column;
        gap: 0.1rem;
      }
    }
  }

  .ant-tree {
    height: auto;
    min-height: max-content;
  }

  .title-template-content {
    overflow: auto;
    max-height: calc(100vh - ${(props) => (props.isTemplateEdit ? 18 : 22)}rem);
  }

  .ant-collapse {
    border-radius: 4px;

    .ant-collapse-item {
      border-radius: 4px;
    }
  }

  .ant-collapse-content-box {
    min-height: max-content;
  }
`;
