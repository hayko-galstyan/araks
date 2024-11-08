import { Outlet, useLocation, useParams } from 'react-router-dom';

import { PATHS } from 'helpers/constants';
import { OverviewWrapper } from 'components/layouts/components/overview/wrapper';
import { DataSheetWrapper } from 'components/layouts/components/data-sheet/wrapper';
import { SchemaWrapper } from 'components/layouts/components/schema/wrapper';
import { useIsPublicPage } from 'hooks/use-is-public-page';
import { VisualisationWrapper } from '../components/layouts/components/visualisation/wrapper';
import { useIsTemplateEditPage, useIsTemplatePage } from './use-is-template-page';
import { useMemo } from 'react';
import { UserProjectRole } from '../api/types';
import { useProject } from '../context/project-context';
import { Toolset } from '../components/tool-set';
import { DocumentWrapper } from '../components/layouts/components/document/wrapper';

export const useOverviewTabItems = () => {
  const { projectInfo } = useProject();
  const isPublicPage = useIsPublicPage();
  const isTemplatePage = useIsTemplatePage();
  const isTemplateEditPage = useIsTemplateEditPage();
  const params = useParams();
  const location = useLocation();


  const tabs = useMemo(() => {
    const tabs = [
      {
        key: `${isPublicPage ? PATHS.PUBLIC_PREFIX : ''}${PATHS.PROJECT_OVERVIEW}`,
        label: 'Overview',
      },
      {
        key: `${isPublicPage ? PATHS.PUBLIC_PREFIX : ''}${PATHS.PROJECT_SCHEME}`,
        label: 'Schema',
      },
      {
        key: params.node_type_id
          ? PATHS.NODE_OVERVIEW
          : `${isPublicPage ? PATHS.PUBLIC_PREFIX : ''}${PATHS.DATA_SHEET}`,
        label: 'Data sheet',
      },
      {
        key: `${isPublicPage ? PATHS.PUBLIC_PREFIX : ''}${PATHS.PROJECT_VISUALISATION}`,
        label: 'Visualization',
      },
      {
        key: `${isPublicPage ? PATHS.PUBLIC_PREFIX : ''}${PATHS.PROJECT_DOCUMENTS}`,
        label: (!isPublicPage && location?.search !== '?shared') ? <Toolset /> : null,
      },
    ];

    if (projectInfo?.role === UserProjectRole.Owner) {
      tabs.splice(tabs.length - 1, 0, {
        key: PATHS.PROJECT_PERSPECTIVES,
        label: 'Perspectives',
      });
    }

    if (isTemplatePage) {
      return [
        {
          key: PATHS.PROJECT_TEMPLATE,
          label: PATHS.PROJECT_TEMPLATE,
          children: <Outlet />,
        },
      ];
    }

    if (isTemplateEditPage) {
      return [
        {
          key: PATHS.PROJECT_TEMPLATE_EDIT,
          label: PATHS.PROJECT_TEMPLATE_EDIT,
          children: <Outlet />,
        },
      ];
    }

    return tabs;
  }, [isPublicPage, isTemplateEditPage, isTemplatePage, location?.search, params.node_type_id, projectInfo?.role]);

  return tabs.map((item) => ({
    ...item,
    disabled: !params.id,
    children: (
      <div className="site-layout-content">
        {item.key === `${isPublicPage ? PATHS.PUBLIC_PREFIX : ''}${PATHS.PROJECT_OVERVIEW}` && <OverviewWrapper />}
        {item.key ===
          (params.node_type_id
            ? PATHS.NODE_OVERVIEW
            : `${isPublicPage ? PATHS.PUBLIC_PREFIX : ''}${PATHS.DATA_SHEET}`) && <DataSheetWrapper />}
        {item.key === `${isPublicPage ? PATHS.PUBLIC_PREFIX : ''}${PATHS.PROJECT_SCHEME}` && <SchemaWrapper />}
        {item.key === PATHS.PROJECT_PERSPECTIVES && <SchemaWrapper />}
        {item.key === PATHS.PROJECT_TEMPLATE && <SchemaWrapper />}
        {item.key === PATHS.PROJECT_TEMPLATE_EDIT && <SchemaWrapper />}
        {item.key === PATHS.PROJECT_DOCUMENTS && <DocumentWrapper />}
        {item.key === `${isPublicPage ? PATHS.PUBLIC_PREFIX : ''}${PATHS.PROJECT_VISUALISATION}` && (
          <VisualisationWrapper />
        )}
      </div>
    ),
  }));
};
