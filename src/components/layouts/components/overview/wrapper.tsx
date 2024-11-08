import { Col, Row as RowComponent, Spin } from 'antd';
import { UserProjectRole } from 'api/types';
import { useProject } from 'context/project-context';
import { analyticsPagesPath, PATHS } from 'helpers/constants';
import { useIsPublicPage } from 'hooks/use-is-public-page';
import { CommentLike } from 'pages/project-overview/comment-like';
import { Share } from 'pages/project-overview/share';
import { Outlet, useLocation, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { useMemo } from 'react';

const Row = styled(({ hasProject, ...props }) => <RowComponent {...props} />)`
  &.overview {
    height: calc(100vh - 152px);

    .ant-col.overview__section {
      background: #f7f7f7;
      opacity: ${(props) => (props.hasProject ? 1 : 5)};
      box-shadow: -10px 0px 10px rgba(111, 111, 111, 0.1);

      &:first-child {
        opacity: 1;
        box-shadow: inset -10px 10px 10px rgba(111, 111, 111, 0.1);
      }
      &.project-share {
        opacity: 5;
      }
      &.project-save {
        padding: 32px 32px 40px;
      }
      &.analytics {
        padding: 0px 0px 20px;
      }
    }

    .overview-form-items {
      min-height: calc(100vh - 264px);
    }
  }
`;

export const OverviewWrapper = () => {
  const isPublicPage = useIsPublicPage();
  const params = useParams();
  const location = useLocation();
  const { projectInfo } = useProject();

  const spanNumber = useMemo(() => {
    return (location.pathname === PATHS.PROJECT_CREATE || projectInfo?.role !== UserProjectRole.Viewer) && !isPublicPage
      ? 8
      : 12;
  }, [location.pathname, projectInfo, isPublicPage]);

  const analyticsPage = analyticsPagesPath.test(location.pathname);

  return (
    <Spin spinning={!projectInfo && location.pathname !== PATHS.PROJECT_CREATE}>
      <Row className="overview" hasProject={!!params.id}>
        {params?.id ? (
          <Col
            span={analyticsPage ? 24 : spanNumber}
            className={`overview__section ${analyticsPage ? 'analytics' : 'project-save'}`}
          >
            <Outlet context={{ projectInfo }} />
          </Col>
        ) : (
          <Col
            span={analyticsPage ? 24 : spanNumber}
            className={`overview__section ${analyticsPage ? 'analytics' : 'project-save'}`}
          >
            <Outlet />
          </Col>
        )}

        {((projectInfo && projectInfo.role !== UserProjectRole.Viewer) || location.pathname === PATHS.PROJECT_CREATE) &&
          !isPublicPage && (
            <>
              {!analyticsPage && (
                <Col span={8} className={`overview__section ${analyticsPage ? '' : 'project-share'}`}>
                  <Share />
                </Col>
              )}

              {!analyticsPage && (
                <Col span={spanNumber} className={`overview__section ${analyticsPage ? '' : 'project-comments'}`}>
                  <CommentLike />
                </Col>
              )}
            </>
          )}
      </Row>
    </Spin>
  );
};
