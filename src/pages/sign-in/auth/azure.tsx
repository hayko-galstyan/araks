import { useLocation, useNavigate } from 'react-router-dom';
import { useGetUsersMe } from 'api/user/use-get-users-me';
import { AUTH_KEYS, PATHS } from 'helpers/constants';

export const OAuthAzure: React.FC = () => {
  const navigate = useNavigate();

  const { search } = useLocation();
  const params = new URLSearchParams(search);
  const accessToken = params.get('access_token') as string;
  const refreshToken = params.get('refresh_token') as string;

  const {} = useGetUsersMe(
    {
      enabled: !!accessToken,
      onSuccess: (data) => {
        localStorage.setItem(AUTH_KEYS.USER, JSON.stringify(data));
        localStorage.setItem(AUTH_KEYS.TOKEN, accessToken);
        localStorage.setItem(AUTH_KEYS.REFRESH_TOKEN, refreshToken);
        navigate(PATHS.ROOT);
        navigate(0);
      },
    },
    accessToken
  );

  return null;
};
