import { Overview } from 'components/layouts/overview';
import { PrivateRoute } from 'components/routes/private-route';
import { DataSheet } from 'pages/data-sheet';
import { Folder } from 'pages/folder';
import { ProjectOverview } from 'pages/project-overview';
import { ProjectCreate } from 'pages/project-overview/create';
import { ProjectUpdate } from 'pages/project-overview/update';
import { ProjectScheme } from 'pages/project-scheme';
import { Public } from 'pages/public';
import { Outlet, createBrowserRouter } from 'react-router-dom';
import { ProjectHome } from './components/layouts/project-home';
import { PublicRoutes } from './components/routes/public-route';
import { PATHS } from './helpers/constants';
import { Projects } from './pages/projects';
import { SignIn } from './pages/sign-in';
import { Profile } from './pages/profile';
import { ProjectPerspectives } from './pages/project-perspectives';
import { ProjectVisualisation } from './pages/project-visualisation';
import { Shared } from 'pages/shared';
import { Template } from 'pages/template';
import { Groups } from 'pages/groups';
import { GroupProjects } from 'pages/groups/group-projects';
import { ForgotPassword } from './pages/forgot-password';
import { ResetPassword } from './pages/reset-password';
import { ErrorServer } from 'pages/error/errorServer';
import { ErrorNotFound } from 'pages/error/errorNotFound';
import { ProjectTemplate } from './pages/project-template';
import { ProjectTemplateEdit } from './pages/project-template-edit';
import { ProjectDocuments } from './pages/project-documents';
import { AdminRoute } from 'components/routes/admin-route';
import { AdminLayout } from 'components/layouts/admin-layout';
import { DashboardAdmin } from 'pages/admin/pages/Dashboard';
import { UsersManagementAdmin } from 'pages/admin/pages/users-managment';
import { OAuthAzure } from 'pages/sign-in/auth/azure';
import { Analytics } from 'pages/analytics';

export const router = createBrowserRouter([
  {
    element: <Outlet />,
    children: [
      {
        path: '*',
        element: <ErrorNotFound />,
      },
      {
        path: PATHS.ERROR_NOT_FOUND,
        element: <ErrorNotFound />,
      },
      {
        path: PATHS.ERROR_SERVER,
        element: <ErrorServer />,
      },
    ],
  },
  {
    element: <PublicRoutes />,
    children: [
      {
        path: PATHS.ROOT,
        element: <SignIn />,
      },
      {
        path: PATHS.ROOT_AZURE,
        element: <OAuthAzure />,
      },
      {
        path: PATHS.SIGN_IN,
        element: <SignIn />,
      },
      {
        path: PATHS.FORGOT_PASSWORD,
        element: <ForgotPassword />,
      },
      {
        path: PATHS.RESET_PASSWORD,
        element: <ResetPassword />,
      },
    ],
  },
  {
    element: <PrivateRoute />,
    children: [
      {
        element: <ProjectHome />,
        children: [
          {
            path: PATHS.PROJECTS,
            element: <Projects />,
          },
          {
            path: PATHS.FOLDER,
            element: <Folder />,
          },
          {
            path: PATHS.PUBLIC,
            element: <Public />,
          },
          {
            path: PATHS.SHARED,
            element: <Shared />,
          },
          {
            path: PATHS.TEMPLATE,
            element: <Template />,
          },
          {
            path: PATHS.GROUPS,
            element: <Groups />,
          },
          {
            path: PATHS.GROUPS_PROJECTS,
            element: <GroupProjects />,
          },
          {
            path: PATHS.PROFILE,
            element: <Profile />,
          },
        ],
      },
      {
        element: <Overview />,
        children: [
          {
            path: PATHS.PROJECT_OVERVIEW,
            element: <ProjectOverview />,
          },
          {
            path: `${PATHS.PUBLIC_PREFIX}${PATHS.PROJECT_OVERVIEW}`,
            element: <ProjectOverview />,
          },
          {
            path: PATHS.PROJECT_UPDATE,
            element: <ProjectUpdate />,
          },
          {
            path: PATHS.PROJECT_CREATE,
            element: <ProjectCreate />,
          },
          {
            path: PATHS.PROJECT_SCHEME,
            element: <ProjectScheme />,
          },
          {
            path: PATHS.PROJECT_TEMPLATE,
            element: <ProjectTemplate />,
          },
          {
            path: PATHS.PROJECT_TEMPLATE_EDIT,
            element: <ProjectTemplateEdit />,
          },
          {
            path: `${PATHS.PUBLIC_PREFIX}${PATHS.PROJECT_SCHEME}`,
            element: <ProjectScheme />,
          },
          {
            path: PATHS.PROJECT_PERSPECTIVES,
            element: <ProjectPerspectives />,
          },
          {
            path: PATHS.PROJECT_VISUALISATION,
            element: <ProjectVisualisation />,
          },
          {
            path: PATHS.PROJECT_DOCUMENTS,
            element: <ProjectDocuments />,
          },
          {
            path: `${PATHS.PUBLIC_PREFIX}${PATHS.PROJECT_VISUALISATION}`,
            element: <ProjectVisualisation />,
          },
          {
            path: PATHS.DATA_SHEET,
            element: <DataSheet />,
          },
          {
            path: `${PATHS.PUBLIC_PREFIX}${PATHS.DATA_SHEET}`,
            element: <DataSheet />,
          },
          {
            path: PATHS.NODE_OVERVIEW,
            element: <DataSheet />,
          },
          {
            path: PATHS.PROJECT_ANALYTICS,
            element: <Analytics />,
          },
        ],
      },
    ],
  },
  {
    element: <AdminRoute />,
    children: [
      {
        element: <AdminLayout />,
        children: [
          {
            path: PATHS.ADMIN,
            element: <DashboardAdmin />,
          },
          {
            path: PATHS.ADMIN_MANAGEMENT,
            element: <UsersManagementAdmin />,
          },
        ],
      },
    ],
  },
]);
