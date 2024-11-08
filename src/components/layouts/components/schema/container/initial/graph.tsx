import { antTheme } from 'helpers/ant-theme';
import { Graph } from '@antv/x6';
import { Snapline } from '@antv/x6-plugin-snapline';
import { initSchemaEvents } from './events';
import { isPerspective, isTemplate } from '../../helpers/utils';
import { InitGraph, InitPreviewGraph } from '../../types';
import { UserProjectRole } from 'api/types';
import { connecting, initPreviewSize, mousewheel } from '../../helpers/init-graph-utils';

export const initGraph: InitGraph = (container, _params, projectInfo) => {
  const grid = {
    size: 10,
    visible: true,
    type: 'doubleMesh',
    args: [
      {
        color: antTheme.components.Schema.colorGridThickness,
        thickness: 1,
      },
      {
        color: antTheme.components.Schema.colorGridLine,
        thickness: 2,
        factor: 10,
      },
    ],
  };

  const options = {
    container: container,
    panning: true,
    height: isTemplate() ? window.innerHeight - 152 : window.innerHeight - 152,
    width: isPerspective() ? window.innerWidth - 400 : isTemplate() ? window.innerWidth : window.innerWidth - 300,
    background: { color: antTheme.components.Schema.colorBg },
    grid,
    mousewheel,
    connecting: connecting(_params),
  };

  const graph = new Graph(options);

  if (!isPerspective() && !isTemplate()) initSchemaEvents(graph, _params, projectInfo);

  graph.use(
    new Snapline({
      enabled: true,
      sharp: true,
      tolerance: 20,
    })
  );

  return graph;
};

export const initGraphPreview: InitPreviewGraph = (isTemplateEditPage, container, _params) => {
  const grid = {
    visible: true,
    size: 30,
    type: 'fixedDot',
    args: {
      color: antTheme.components.Schema.colorGridLine,
      thickness: 3,
    },
  };

  const { width, height } = initPreviewSize(isTemplateEditPage);

  const options = {
    container: container,
    panning: true,
    height: height,
    width: width,
    background: { color: antTheme.components.Schema.colorBg },
    grid,
    mousewheel,
    connecting: connecting(_params),
  };

  const graph = new Graph(options);

  if (isTemplateEditPage) initSchemaEvents(graph, _params, { role: UserProjectRole.Owner });

  graph.use(
    new Snapline({
      enabled: true,
      sharp: true,
      tolerance: 20,
    })
  );

  return graph;
};
export const initGraphTemplateListPreview: InitPreviewGraph = (isTemplateEditPage, container, _params) => {
  const grid = {
    visible: true,
    size: 30,
    type: 'fixedDot',
    args: {
      color: antTheme.components.Schema.colorGridLine,
      thickness: 3,
    },
  };

  const { width, height } = initPreviewSize(isTemplateEditPage);

  const options = {
    container: container,
    panning: true,
    height: height,
    width: width,
    background: { color: antTheme.components.Schema.colorBg },
    grid,
    mousewheel,
    connecting: connecting(_params),
  };

  const graph = new Graph(options);

  if (isTemplateEditPage) initSchemaEvents(graph, _params, { role: UserProjectRole.Owner });

  graph.use(
    new Snapline({
      enabled: true,
      sharp: true,
      tolerance: 20,
    })
  );

  return graph;
};
