import { RequestTypes } from 'api/types';
import { useMutation, UseQueryOptions } from '@tanstack/react-query';

import client from '../client';
import { errorMessage } from 'helpers/utils';
import { useParams } from 'react-router-dom';
import { AUTH_KEYS } from '../../helpers/constants';
import { Export } from '@antv/x6-plugin-export';
import { useSchema } from '../../components/layouts/components/schema/wrapper';

export type ProjectCreateTemplate = {
  project_id: string;
  name: string;
  description: string;
  privacy: string;
  nodes_ids: {
    id: string;
    fx: number;
    fy: number;
  }[];
  edges_ids: string[];
};

const URL_SAVE_AS_TEMPLATE = '/templates';
const URL_SCREENSHOT_TEMPLATE = 'templates/upload-screenshot/:id';

type ReturnData = {
  data: { id: string };
};

type QueryResponse = {
  data: ReturnData;
};

type Options = UseQueryOptions<QueryResponse, Error, ReturnData>;

export const useSaveAsTemplate = (options?: Options) => {
  const { id } = useParams();
  const { graph } = useSchema();

  const sendScreenshot = (data: ReturnData) => {
    graph.use(new Export());

    const toSvgCallback = async (svg: string) => {
      const baseUrl = `${process.env.REACT_APP_BASE_URL}`;

      const url = `${baseUrl}${URL_SCREENSHOT_TEMPLATE.replace(':id', data.data.id || '')}`;

      const token = localStorage.getItem(AUTH_KEYS.TOKEN) ?? '';

      const headers: { [key: string]: string } = {
        Authorization: token,
        ContentType: 'multipart/form-data',
      };

      const formData = new FormData();

      formData.append('file', new Blob([svg], { type: 'image/svg+xml' }), 'screenshot.svg');

      await fetch(url, {
        method: 'POST',
        headers,
        body: formData,
      });
    };
    graph.zoomToFit({ padding: 10, maxScale: 1 });

    const centeringOptions = {
      viewBox: {
        x: graph.getContentBBox().x,
        y: graph.getContentBBox().y,
        width: graph.getContentBBox().width,
        height: graph.getContentBBox().height,
      },
    };

    graph.toSVG(toSvgCallback, centeringOptions);
  };

  const mutation = useMutation<ReturnData, unknown, ProjectCreateTemplate>({
    mutationFn: (values) => {
      return client[RequestTypes.Post](URL_SAVE_AS_TEMPLATE, { ...values, project_id: id });
    },
    onSuccess: (data) => {
      options?.onSuccess?.(data);
      sendScreenshot(data);
    },
    onError: (er) => {
      errorMessage(er);
      options?.onError?.(er as Error);
    },
  });
  return mutation;
};
