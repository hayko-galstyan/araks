import { PickSchemaContextType } from '../types';
import { PATH } from './constants';
import { Options } from '@antv/x6/lib/graph/options';

import Connecting = Options.Connecting;
/* eslint-disable */
export const connecting: (params: PickSchemaContextType) => Partial<Connecting> = (_params) => ({
  connector: 'smooth',
  router: {
    name: 'er',
    args: {
      offset: 'center',
      direction: 'H',
    },
  },
  createEdge(item) {
    return this.createEdge({
      shape: 'er-edge',
      router: {
        name: 'normal',
      },
      attrs: {
        line: {
          creator: true,
          sourceMarker: {
            name: 'path',
            d: '',
          },
          strokeDasharray: '5 5',
          stroke: item.sourceCell.attr(PATH.NODE_COLOR),
        },
      },
      zIndex: -1,
    });
  },
  validateEdge: ({ edge: { source, target } }) => {
    if ('cell' in source && 'cell' in target) {
      _params.startEdgeType({
        isUpdate: false,
        isConnector: true,
        source: source.cell as string,
        target: target.cell as string,
      });
    }
    return false;
  },
});

export const mousewheel = {
  enabled: true,
  zoomAtMousePosition: true,
  minScale: 0.2,
  maxScale: 3,
};

export const initPreviewSize = (isTemplateEditPage: boolean) => {
  const editTemplateWidth = window.innerWidth - 320;

  const drawerWidth = (window.innerWidth / 100) * 80;

  const useTemplateWidth = drawerWidth - (drawerWidth / 100) * 38;

  const width = isTemplateEditPage ? editTemplateWidth : useTemplateWidth;

  const height = isTemplateEditPage ? window.innerHeight - 120 : window.innerHeight - 105 * 2;

  return { width, height };
};
