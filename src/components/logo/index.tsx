import { PATHS } from 'helpers/constants';
import { useLocation, useNavigate } from 'react-router-dom';
import { ReactComponent as Araks } from '../icons/araks.svg';

type Props = {
  margin?: string;
};

export const Logo = ({ margin }: Props) => {
  const navigate = useNavigate();
  const location = useLocation();
  const isAdminPath = location.pathname.includes('admin');

  return (
    <Araks
      style={{ cursor: 'pointer', ...(margin ? { margin } : {}) }}
      onClick={() => (isAdminPath ? navigate(PATHS.ADMIN) : navigate(PATHS.PROJECTS))}
    />
  );
};
