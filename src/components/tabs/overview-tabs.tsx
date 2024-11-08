import { useCallback, useMemo } from 'react';
import styled from 'styled-components';
import { Tabs as TabsComponent, Typography } from 'antd';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

import { PATHS, screenSize } from 'helpers/constants';
import { stripTrailingSlash } from 'helpers/utils';
import { ProjectBreadcrumb } from 'components/breadcrumb/project-breadcrumb';
import { useOverview } from 'context/overview-context';
import { useGetProject } from 'api/projects/use-get-project';
import { useProject } from 'context/project-context';
import { useOverviewTabItems } from 'hooks/use-tab-items';
import { useIsTemplateEditPage, useIsTemplatePage } from 'hooks/use-is-template-page';
import { useJira } from '../drawer/tool-set/components/jira/context';

const { Paragraph } = Typography;

const Tabs = styled(TabsComponent)<{ hidden: boolean }>`
  user-select: none;

  > .ant-tabs-nav .ant-tabs-nav-list {
    width: 100%;
    justify-content: center;
    gap: 10px;

    .ant-tabs-tab {
      :nth-last-of-type(2) {
        position: fixed;
        right: 2rem;
        @media (max-width: ${screenSize.xll}) {
          position: relative;
          margin-left: auto !important;
        }
      }
    }
  }

  .ant-tabs-nav-wrap {
    justify-content: center;
  }

  .ant-tabs-nav {
    box-shadow: 0px 10px 10px rgba(111, 111, 111, 0.16);
    margin-bottom: 0;
    z-index: 4; // greater than left side menu

    &::before {
      border-color: transparent;
    }

    .ant-tabs-tab {
      @media (min-width: ${screenSize.xxl}) {
        height: 64px;
      }
      height: 40px;

      &:not(.ant-tabs-tab-active) {
        border: none;
        background: transparent;
      }

      &.ant-tabs-tab-active {
        display: ${(props) => (props.hidden ? 'none' : 'flex')};
        background: #f2f2f2;
        box-shadow: inset 3px 3px 9px rgba(111, 111, 111, 0.3);
        border-radius: 4px 4px 0px 0px;
      }
    }
  }
`;

export const OverviewTabs = () => {
  const { updateRole } = useProject();
  const location = useLocation();
  const isTemplatePage = useIsTemplatePage();
  const isTemplateEditPage = useIsTemplateEditPage();

  const params = useParams();
  const navigate = useNavigate();
  const { state, dispatch, setHideLeftSection } = useOverview();
  const { setOpenToolset } = useJira();
  useGetProject(
    { id: params.id },
    {
      enabled: !isTemplateEditPage && !!params.id,
      onSuccess: ({ data }) => {
        dispatch(data.title);
        updateRole(data.role);
      },
    }
  );

  const handleTabClick = useCallback(
    (key: string) => {
      if (key === PATHS.PROJECT_DOCUMENTS) {
        setOpenToolset(true);
      } else {
        navigate(key.replace(':id', params.id || ''));
      }
      setHideLeftSection(false);
    },
    [navigate, params.id, setHideLeftSection, setOpenToolset]
  );

  const items = useOverviewTabItems();

  const activeItem = useMemo(
    () =>
      items.find((item, i) => {
        return (
          item.key.replace(':id', params.id || '').replace(':node_type_id', params.node_type_id || '') ===
          stripTrailingSlash(location.pathname)
        );
      }),
    [items, location.pathname, params.id, params.node_type_id]
  );

  return (
    <Tabs
      id="overview-header-tabs"
      hidden={isTemplatePage || isTemplateEditPage}
      className="tabs"
      destroyInactiveTabPane
      defaultActiveKey={activeItem?.key}
      activeKey={activeItem?.key}
      type="card"
      tabBarGutter={32}
      onTabClick={handleTabClick}
      tabBarExtraContent={{
        left: (
          <ProjectBreadcrumb
            items={[
              { title: 'Home', className: 'home', onClick: () => navigate(PATHS.ROOT) },
              ...(state
                ? [
                    {
                      title: (
                        <Paragraph ellipsis={{ rows: 1 }} style={{ maxWidth: '200px', width: '200px' }}>
                          {state}
                        </Paragraph>
                      ),
                      className: 'project-name',
                    },
                  ]
                : []),
            ]}
          />
        ),
      }}
      items={items}
    />
  );
};
