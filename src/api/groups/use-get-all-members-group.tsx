import { useQuery } from '@tanstack/react-query';
import client from 'api/client';
import { URL_GET_ALL_MEMBERS_GROUP } from './constant';
import { TMembersData } from './types';
import { useNavigate } from 'react-router-dom';
import { PATHS } from 'helpers/constants';

export const useGetAllMembersGroup = (id: string) => {
  const navigate = useNavigate();
  const result = useQuery<TMembersData>({
    queryKey: [URL_GET_ALL_MEMBERS_GROUP],
    queryFn: () => client.get(URL_GET_ALL_MEMBERS_GROUP.replace(':id', id)),
    enabled: !!id,
    onError: () => {
      navigate(PATHS.GROUPS);
    },
    retry: false,
  });

  const { isLoading, isSuccess, data } = result;

  return {
    data,
    isLoading,
    isSuccess,
  };
};
