import { GraphData, Node, Edge } from 'components/layouts/components/visualisation/types';
import { DocumentNodes } from 'api/document-repositories/use-get-document-graph';
import { DocumentTags, IExpandDocument } from './init-graph';
import { COLORS } from 'helpers/constants';
import { NodeType } from './constants';

type FormattedData = (nodesList: DocumentNodes) => GraphData;
type FormattedTags = (id: string, nodesList: DocumentTags) => GraphData;
type FormattedExpand = (id: string, nodesList: IExpandDocument[]) => GraphData;

export const formattedDocumentData: FormattedData = (nodesList) => {
  const nodes: Node[] = [];
  const edges: Edge[] = [];

  nodesList.forEach((node) => {
    const params = {
      id: node.id,
      color: node.color,
      originalName: node.name,
      label: node.name.length > 15 ? `${node.name.slice(0, 15)}...` : node.name,
      type: NodeType.Node,
      style: {
        fill: node.color,
        stroke: node.color ?? '',
        r: 30,
        lineWidth: 10,
      },
      x: 0,
      y: 0,
    };

    node.documents.forEach((doc) => {
      const doc_node = {
        id: doc.url,
        color: node.color,
        originalName: doc.name,
        label: doc.name.length > 15 ? `${doc.name.slice(0, 15)}...` : doc.name,
        type: NodeType.Document,
        style: {
          lineWidth: 20,
          r: 10,
          fill: node.color,
          stroke: node.color,
        },
        x: 0,
        y: 0,
      };
      edges.push({
        id: `${doc.url}${node.id}`,
        source: node.id,
        target: doc.url,
        label: '',
      });

      nodes.push(doc_node);
    });

    nodes.push(params);
  });

  return { nodes, edges } as GraphData;
};

export const formattedDocumentTags: FormattedTags = (id, nodesList) => {
  const nodes: Node[] = [];
  const edges: Edge[] = [];

  nodesList.keywords.forEach((keyword) => {
    const params = {
      id: keyword.name,
      color: keyword.taxonomy.length ? COLORS.SECONDARY.GREEN : '#232F6A',
      originalName: keyword.name,
      docUrl: nodesList.url,
      label: keyword.name.length > 15 ? `${keyword.name.slice(0, 15)}...` : keyword.name,
      style: {
        stroke: '#232F6A',
        r: keyword.score,
        lineWidth: 10,
      },
      x: 0,
      y: 0,
    };

    edges.push({
      id: `${id}${keyword.name}`,
      source: id,
      target: keyword.name,
      label: '',
    });

    nodes.push(params);
  });

  return { nodes, edges } as GraphData;
};

export const formattedExpandTags: FormattedExpand = (id, nodesList) => {
  const nodes: Node[] = [];
  const edges: Edge[] = [];

  nodesList.forEach((node) => {
    const params = {
      id: node.url,
      color: node.color,
      type: NodeType.Document,
      style: {
        lineWidth: 20,
        r: 10,
        fill: node.color,
        stroke: node.color,
      },
      originalName: node.document_name,
      label: node.document_name.length > 15 ? `${node.document_name.slice(0, 15)}...` : node.document_name,
      x: 0,
      y: 0,
    };

    edges.push({
      id: `${id}${node.document_name}`,
      source: id,
      target: node.url.replace(process.env.REACT_APP_AWS_URL ?? '', ''),
      label: '',
    });

    nodes.push(params);
  });

  return { nodes, edges } as GraphData;
};
