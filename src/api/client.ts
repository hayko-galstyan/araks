import { AUTH_KEYS, PATHS } from 'helpers/constants';
import axios, { AxiosError } from 'axios';

interface RefreshTokenResponse {
  data: {
    accessToken: string;
    refreshToken: string;
  };
}

const client = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
});

client.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem(AUTH_KEYS.TOKEN) || '';
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// Add a response interceptor
client.interceptors.response.use(
  async function (response) {
    return response.data;
  },
  async function (error) {
    if (error.response.status === 401) {
      localStorage.removeItem(AUTH_KEYS.USER);
      localStorage.removeItem(AUTH_KEYS.REFRESH_TOKEN);
      localStorage.removeItem(AUTH_KEYS.TOKEN);
      window.location.href = PATHS.SIGN_IN;
    } else if (error.response.status === 500) {
      window.location.href = PATHS.ERROR_SERVER;
    } else if (error?.response?.status === 403) {
      const access_token = localStorage.getItem(AUTH_KEYS.REFRESH_TOKEN);
      const originalRequest = error.config;

      try {
        const req = await axios.post<RefreshTokenResponse>(process.env.REACT_APP_BASE_URL + 'auth/access-token', {
          token: access_token,
        });

        localStorage.setItem(AUTH_KEYS.TOKEN, req?.data?.data?.accessToken);
        localStorage.setItem(AUTH_KEYS.REFRESH_TOKEN, req?.data?.data?.refreshToken);

        originalRequest.headers.Authorization = `Bearer ${req?.data?.data?.accessToken}`;
        return axios(originalRequest);
      } catch (postError) {
        if ((postError as AxiosError)?.response?.status === 401) {
          localStorage.removeItem(AUTH_KEYS.USER);
          localStorage.removeItem(AUTH_KEYS.TOKEN);
          localStorage.removeItem(AUTH_KEYS.REFRESH_TOKEN);
          window.location.href = PATHS.SIGN_IN;
          await axios.post(process.env.REACT_APP_BASE_URL + 'auth/logout');
        }
      }
    }

    return Promise.reject(error);
  }
);

// eslint-disable-next-line import/no-default-export
export default client;
