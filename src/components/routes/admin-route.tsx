import { Navigate, Outlet } from 'react-router-dom';

import { PATHS } from 'helpers/constants';
import { useAuth } from 'context/auth-context';
import { ProjectProvider } from 'context/project-context';

export const AdminRoute = () => {
  const { user } = useAuth();

  if (!user || user.role !== 'admin') {
    return <Navigate to={PATHS.PROFILE} />;
  }

  return (
    <ProjectProvider>
      <Outlet />
    </ProjectProvider>
  );
};
