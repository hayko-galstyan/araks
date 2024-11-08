import G6 from '@antv/g6';
import { renderDocumentTooltipModal } from './tooltip';

export enum NodeType {
  Document = 'document',
  Tags = 'tags',
  Node = 'node',
}

export const edgeLabelCfgStyle = {
  style: {
    opacity: 1,
    fontSize: 10,
    fontWeight: 600,
    fill: '#605f5f',
    background: {
      fill: '#F2F2F2',
      padding: [2, 2, 2, 2],
      radius: 2,
    },
  },
};

export const nodeLabelCfgStyle = {
  style: {
    opacity: 1,
    fontSize: 14,
    fill: '#151515',
    fontWeight: 600,
    background: {
      padding: [3, 20, 3, 2],
      radius: 2,
      lineWidth: 3,
    },
  },
};

const defaultEdge = {
  labelCfg: {
    autoRotate: true,
    style: {
      ...edgeLabelCfgStyle.style,
      opacity: 0,
    },
  },
  style: {
    lineWidth: 2,
    stroke: '#C3C3C3',
    endArrow: {
      fill: '#C3C3C3',
      path: G6.Arrow.triangle(10, 15, 5),
      d: 5,
    },
    lineDash: [5, 5], // Add this line for dashed stroke
  },
};

const defaultNode = {
  style: {
    lineWidth: 2,
  },
  clipCfg: {
    show: true,
    type: 'circle',
    r: 20,
    rx: 10,
    ry: 15,
    width: 15,
    height: 15,
  },
  labelCfg: {
    style: {
      ...nodeLabelCfgStyle.style,
      opacity: 0,
    },
    offset: 10,
    position: 'bottom',
  },
  size: 40,
};

const nodeStateStyles = {
  selected: { ...defaultNode.style, fill: '' },
};

const edgeStateStyles = {
  selected: {
    color: '#414141',
    stroke: '#5a5a5a',
    shadowColor: 'none',
  },
};

export const document_graph_options = {
  height: window.innerHeight - 160,
  width: window.innerWidth - 380,
  fitCenter: true,
  fitView: true,
  animate: true,
  modes: {
    default: [
      {
        type: 'create-edge',
        shouldEnd: function (e: unknown) {
          const source = (this as unknown as { source: string }).source;

          if (source === (e as { item: { getID: () => string } }).item.getID()) return false;

          return true;
        },
      },
      'drag-canvas',
      'drag-node',
      'drag-combo',
      'zoom-canvas',
      {
        type: 'tooltip',
        formatText: (model: { [key: string]: unknown }) => {
          return renderDocumentTooltipModal(model);
        },
        offset: 10,
      },
      {
        type: 'brush-select',
        trigger: 'shift',
        includeEdges: false,
        brushStyle: {
          fill: '#000',
          stroke: '#FFF',
          lineWidth: 2,
          fillOpacity: 0.5,
        },
        resetSelected: false,
      },
    ],
  },
  grid: null,
  defaultEdge,
  defaultNode,
  nodeStateStyles,
  edgeStateStyles,
  animateCfg: {
    duration: 1000,
    easing: 'easeCubicInOut',
  },
};
