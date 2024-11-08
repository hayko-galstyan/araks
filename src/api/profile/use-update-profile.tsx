import { useMutation, UseQueryOptions } from '@tanstack/react-query';
import { useAuth } from 'context/auth-context';
import { ProfileForm, UserDetails } from 'types/auth';

import client from '../client';
import { message } from 'antd';

const url = 'users/update';

type ResponseType = {
  data: UserDetails;
  message: string;

};

type Options = UseQueryOptions<ProfileForm, unknown, ResponseType>;

export const useUpdateProfile = (options?: Options) => {
  const { addUser, user } = useAuth();
  const mutation = useMutation<ResponseType, unknown, ProfileForm>({
    mutationFn: (values: ProfileForm) => {
      return client.put(url, values);
    },
    onSuccess: (data) => {
      if (data.data && user) {
        const { first_name, last_name, bio } = data.data;
        addUser({
          ...user,
          first_name,
          last_name,
          bio,
        });
      }
      options?.onSuccess?.(data);
      message.success(data.message);

    },
  });
  return mutation;
};
