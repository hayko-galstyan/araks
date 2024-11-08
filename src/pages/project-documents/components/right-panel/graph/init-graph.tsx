import G6, { Graph, IG6GraphEvent, Item } from '@antv/g6';
import { document_graph_options, NodeType } from './constants';
import PluginBase from '@antv/g6-plugin/lib/base';
import { addTooltip, removeTooltip, updateConnector } from 'components/layouts/components/visualisation/helpers/utils';
import { edgeLabelCfgStyle, nodeLabelCfgStyle } from 'components/layouts/components/visualisation/helpers/constants';
import client from 'api/client';
import { formattedDocumentTags, formattedExpandTags } from './formated-data';
import { UploadedFileType } from 'types/node';

type SetShowDocumentDrawerPrams = (uploadedFileType?: UploadedFileType) => void;

export type InitGraph = (container: HTMLDivElement, setShowDocumentDrawer: SetShowDocumentDrawerPrams) => Graph;

export interface IExpandDocument {
  color: string;
  created: string;
  default_image: string;
  document_name: string;
  node_id: string;
  node_name: string;
  project_id: string;
  project_type_id: string;
  property_data_type: string;
  property_id: string;
  property_name: string;
  type_name: string;
  url: string;
  user_id: string;
}

type Keyword = {
  count: number;
  name: string;
  taxonomy: string[];
  score: number;
};

export type DocumentTags = {
  all_length: number;
  keywords: Keyword[];
  status: number;
  url: string;
};

export const getTagsData = async (url: string) => {
  const projectId = location.pathname.substring(location.pathname.lastIndexOf('/') + 1);

  const data: DocumentTags = await client.post(
    `${process.env.REACT_APP_BASE_URL}documents/generate-tags/${projectId}`,
    { url }
  );

  return data;
};

export const getExpandData = async (keyword: string, url: string) => {
  const projectId = location.pathname.substring(location.pathname.lastIndexOf('/') + 1);

  const data: { data: IExpandDocument[] } = await client.post(
    `${process.env.REACT_APP_BASE_URL}documents/expand-tags/${projectId}`,
    {
      url,
      keyword,
    }
  );

  return data.data;
};

export const showTags = async (graph: Graph, item: Item, url: string) => {
  const expandData = await getTagsData(url);

  if (!expandData) return;

  const graphData = formattedDocumentTags(url, expandData);

  const radius = 200;

  graphData.nodes.forEach((n, index) => {
    graph.addItem(NodeType.Node, {
      ...n,
      type: NodeType.Tags,
      labelCfg: nodeLabelCfgStyle,
      x: (item?._cfg?.model?.x ?? 0) + radius * Math.sin((Math.PI * 2 * index) / graphData.nodes.length),
      y: (item?._cfg?.model?.y ?? 0) - radius * Math.cos((Math.PI * 2 * index) / graphData.nodes.length),
    });
  });

  graphData.edges.forEach((e) => {
    graph.addItem('edge', {
      ...e,
      labelCfg: edgeLabelCfgStyle,
    });
  });

  updateConnector(graph);
};

export const expandTags = async (graph: Graph, item: Item, url: string) => {
  const expandData = await getExpandData(url, item?._cfg?.model?.docUrl as string);

  if (!expandData) return;

  const graphData = formattedExpandTags(url, expandData);

  const radius = 200;

  const documentNodes = graph.getNodes().filter((n) => n.getModel().type === NodeType.Document);

  graphData.nodes.forEach((n, index) => {
    const id = n.id.replace(process.env.REACT_APP_AWS_URL ?? '', '');

    if ((n as unknown as { type: string }).type === NodeType.Document) {
      if (!documentNodes?.find((d) => d.getID() === id)) {
        graph.addItem(NodeType.Node, {
          ...n,
          labelCfg: nodeLabelCfgStyle,
          x: (item?._cfg?.model?.x ?? 0) + radius * Math.sin((Math.PI * 2 * index) / graphData.nodes.length),
          y: (item?._cfg?.model?.y ?? 0) - radius * Math.cos((Math.PI * 2 * index) / graphData.nodes.length),
        });
      }
    }
  });

  graphData.edges.forEach((e) => {
    graph.addItem('edge', {
      ...e,
      labelCfg: edgeLabelCfgStyle,
    });
  });

  updateConnector(graph);
};

const getMenuContexts = (id: string) => {
  const documentContext = `<div class='menu'>
      <span class='document'>Show Tags</span>
      <span class="openFile">Open File</span>
    </div>`;

  const tagContext = `<div class='menu'>
      <span class='tags'>Find Similar Documents</span>
    </div>`;

  return { documentContext, tagContext };
};

export const documentContextMenuPlugin: (
  graph: Graph,
  setShowDocumentDrawer: SetShowDocumentDrawerPrams
) => PluginBase = (graph, setShowDocumentDrawer) => {
  const getContent = (evt: IG6GraphEvent | undefined) => {
    const item = evt?.item;
    const id = item?.getID() || '';
    const type = (item?.getModel() as { type: string })?.type;

    const isTags = type === NodeType.Tags;
    const isDocument = type === NodeType.Document;

    removeTooltip(graph);

    const { tagContext, documentContext } = getMenuContexts(id);

    return isTags ? tagContext : isDocument ? documentContext : '';
  };

  return new G6.Menu({
    getContent,
    handleMenuClick: async (target, item) => {
      const type = item?._cfg?.type || '';
      if (type === NodeType.Node) {
        switch (target.className) {
          case NodeType.Document: {
            graph.addItem(NodeType.Node, {
              ...item.getModel(),
              labelCfg: nodeLabelCfgStyle,
            });

            await showTags(graph, item, (item.getModel() as { id: string }).id ?? '');
            graph.fitView(0, { ratioRule: 'min', direction: 'both', onlyOutOfViewPort: false }, true);

            break;
          }
          case NodeType.Tags: {
            graph.addItem(NodeType.Node, {
              ...item.getModel(),
              labelCfg: nodeLabelCfgStyle,
            });

            await expandTags(graph, item, (item.getModel() as { id: string }).id ?? '');
            graph.fitView(0, { ratioRule: 'min', direction: 'both', onlyOutOfViewPort: false }, true);

            break;
          }
          case 'openFile': {
            const node = item.getModel();
            graph.addItem(NodeType.Node, {
              ...node,
              labelCfg: nodeLabelCfgStyle,
            });

            setShowDocumentDrawer({
              name: node?.originalName as string,
              url: (node?.id as string).replace(`${process.env.REACT_APP_AWS_URL}`, ''),
            });

            break;
          }
          default:
        }
      }

      addTooltip(graph);
    },
    offsetX: 16 + 10,
    offsetY: 0,
    itemTypes: ['node', 'edge', 'canvas', 'combo'],
  });
};

export const initDocumentGraph: InitGraph = (container, setShowDocumentDrawer) => {
  const graph = new Graph({
    container,
    ...document_graph_options,
  });

  graph.addPlugin(documentContextMenuPlugin(graph, setShowDocumentDrawer));

  return graph;
};
