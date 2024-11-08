import { useMutation, useQueryClient } from '@tanstack/react-query';
import { GET_TEMPLATES_MY } from './use-get-templates-my';
import { PasswordResponseData } from 'types/auth';
import { TemplateUpdateResponseDataError } from 'api/types';

import client from '../client';
import { message } from 'antd';
import { GET_TEMPLATE } from './use-get-template-by-id';
type Props = {
  name: string;
  description: string | undefined;
  privacy: 'public' | 'private' | 'default';
  project_id: string;
};

const url = 'templates/:id';

export const useUpdateTemplate = (templateId: string) => {
  const queryClient = useQueryClient();
  const mutation = useMutation<PasswordResponseData, TemplateUpdateResponseDataError, Props>({
    mutationFn: (values: Props) => {
      return client.put(url.replace(':id', templateId), values);
    },
    onSuccess: () => {
      queryClient.invalidateQueries([GET_TEMPLATES_MY]);
      queryClient.invalidateQueries([GET_TEMPLATE.replace(':id', templateId)]);

      message.success('Template successfully changed');
    },

    onError: (data) => message.error(data.message),
  });
  return mutation;
};
