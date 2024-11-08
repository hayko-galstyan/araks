import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { GET_USERS_ME } from './constants';
import client from 'api/client';
import { UserDetails } from 'types/auth';

export const useGetUsersMe = (options?: UseQueryOptions<UserDetails, Error, UserDetails>, token?: string) => {
  return useQuery<UserDetails, Error, UserDetails>(
    [GET_USERS_ME],
    async () => {
      if(token){
        const response = await client.get(GET_USERS_ME, {
          headers: token ? { Authorization: `Bearer ${token}` } : {}
        });
        return response.data;

      } else {
        const response = await client.get(GET_USERS_ME);
        return response.data;

      }

    },
    options
  );
};
