import { GraphActionType, GraphState } from './types';

const initState = {
  isOpened: false,
};

export enum ITEM {
  GRAPH = 'graph',
  FUZZY_MATCH = 'fuzzyData',
  GRAPH_INFO = 'graphInfo',
  OPEN_NODE = 'openNode',
  OPEN_EDGE = 'openEdge',
  DELETE_NODE = 'deleteNode',
  DELETE_EDGE = 'deleteEdge',
  OPEN_CREATE_NODE = 'openNodeCreate',
  OPEN_CREATE_EDGE = 'openEdgeCreate',
  OPEN_SHORTEST_PATH = 'openShortestPath',
  OPEN_FUZZY = 'openFuzzy',
  OPEN_FUZZY_PREVIEW = 'openFuzzyPreview',
}

export enum GraphAction {
  SET_GRAPH = 'SET_GRAPH',
  SET_GRAPH_INFO = 'SET_GRAPH_INFO',
  OPEN_NODE_START = 'OPEN_NODE_START',
  OPEN_SHORTEST_PATH_START = 'OPEN_SHORTEST_PATH_START',
  SHORTEST_PATH_FINISH = 'SHORTEST_PATH_FINISH',
  OPEN_NODE_FINISH = 'OPEN_NODE_FINISH',
  OPEN_CREATE_NODE_START = 'OPEN_CREATE_NODE_START',
  OPEN_CREATE_NODE_FINISH = 'OPEN_CREATE_NODE_FINISH',
  DELETE_NODE_START = 'DELETE_NODE_START',
  DELETE_NODE_FINISH = 'DELETE_NODE_FINISH',
  OPEN_EDGE_START = 'OPEN_EDGE_START',
  OPEN_EDGE_FINISH = 'OPEN_EDGE_FINISH',
  DELETE_EDGE_START = 'DELETE_EDGE_START',
  DELETE_EDGE_FINISH = 'DELETE_EDGE_FINISH',
  OPEN_CREATE_EDGE_START = 'OPEN_CREATE_EDGE_START',
  OPEN_CREATE_EDGE_FINISH = 'OPEN_CREATE_EDGE_FINISH',
  OPEN_FUZZY_START = 'OPEN_FUZZY_START',
  OPEN_FUZZY_FINISH = 'OPEN_FUZZY_FINISH',
  OPEN_FUZZY_PREVIEW_START = 'OPEN_FUZZY_PREVIEW_START',
  OPEN_FUZZY_PREVIEW_FINISH = 'OPEN_FUZZY_PREVIEW_FINISH',
  FUZZY_MATCH_DATA = 'FUZZY_MATCH_DATA',
}

export const graphInitialState: GraphState = {
  openNode: {
    ...initState,
    id: '',
  },
};

export const graphReducer: (state: GraphState, action: GraphActionType) => GraphState = (state, action) => {
  const { type, payload } = action;

  const insert = (item: ITEM) => ({
    ...state,
    [item]: payload,
  });

  const start: (item: ITEM) => GraphState = (item: ITEM) => ({
    ...state,
    [item]: {
      ...state[item],
      ...payload,
      isOpened: true,
    },
  });

  const end = (item: ITEM) => ({
    ...state,
    [item]: { ...state[item], isOpened: false },
  });

  const endWithClear = (item: ITEM) => ({
    ...state,
    [item]: {
      ...state[item],
      isOpened: false,
      id: '',
    },
  });

  switch (type) {
    case GraphAction.SET_GRAPH:
      return insert(ITEM.GRAPH) as GraphState;
    case GraphAction.FUZZY_MATCH_DATA:
      return insert(ITEM.FUZZY_MATCH);
    case GraphAction.OPEN_NODE_START:
      return start(ITEM.OPEN_NODE);
    case GraphAction.OPEN_NODE_FINISH: {
      return endWithClear(ITEM.OPEN_NODE);
    }
    case GraphAction.OPEN_CREATE_NODE_START:
      return {
        ...state,
        [ITEM.OPEN_CREATE_NODE]: {
          ...state[ITEM.OPEN_CREATE_NODE],
          ...payload,
        },
      };
    case GraphAction.OPEN_CREATE_NODE_FINISH:
      return end(ITEM.OPEN_CREATE_NODE);
    case GraphAction.DELETE_NODE_START:
      return start(ITEM.DELETE_NODE);
    case GraphAction.DELETE_NODE_FINISH:
      return end(ITEM.DELETE_NODE);
    case GraphAction.OPEN_EDGE_START:
      return start(ITEM.OPEN_EDGE);
    case GraphAction.OPEN_EDGE_FINISH:
      return endWithClear(ITEM.OPEN_EDGE);
    case GraphAction.DELETE_EDGE_START:
      return start(ITEM.DELETE_EDGE);
    case GraphAction.DELETE_EDGE_FINISH:
      return end(ITEM.DELETE_EDGE);
    case GraphAction.OPEN_CREATE_EDGE_START:
      return start(ITEM.OPEN_CREATE_EDGE);
    case GraphAction.OPEN_SHORTEST_PATH_START:
      return start(ITEM.OPEN_SHORTEST_PATH);
    case GraphAction.SHORTEST_PATH_FINISH:
      return end(ITEM.OPEN_SHORTEST_PATH);
    case GraphAction.OPEN_CREATE_EDGE_FINISH:
      return end(ITEM.OPEN_CREATE_EDGE);
    case GraphAction.SET_GRAPH_INFO:
      if (state[ITEM.GRAPH_INFO]) {
        return {
          ...state,
          [ITEM.GRAPH_INFO]: {
            ...state[ITEM.GRAPH_INFO],
            ...payload,
          },
        };
      } else {
        return insert(ITEM.GRAPH_INFO) as GraphState;
      }
    case GraphAction.OPEN_FUZZY_START:
      return start(ITEM.OPEN_FUZZY);
    case GraphAction.OPEN_FUZZY_FINISH:
      return endWithClear(ITEM.OPEN_FUZZY);

    case GraphAction.OPEN_FUZZY_PREVIEW_START:
      return start(ITEM.OPEN_FUZZY_PREVIEW);
    case GraphAction.OPEN_FUZZY_PREVIEW_FINISH:
      return endWithClear(ITEM.OPEN_FUZZY_PREVIEW);
    default:
      return state;
  }
};
