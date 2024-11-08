import React, { useCallback, useMemo, useReducer } from 'react';
import { Outlet, useOutletContext } from 'react-router-dom';
import { Graph } from '@antv/g6';
import { GraphAction, graphInitialState, graphReducer } from './reducer/graph-manager';
import { VisualisationContextType } from './types';
import { IOpenEdge, IOpenId } from 'types/project-edge';
import { IIdOpen } from './reducer/types';
import { FuzzyMatchResponseData } from 'api/visualisation/use-create-fuzzy-match';

export const VisualisationWrapper: React.FC = () => {
  const [state, dispatch] = useReducer(graphReducer, graphInitialState);

  const handleAction = useCallback((type: GraphAction, payload = {}) => dispatch({ type, payload }), [dispatch]);

  const callbacks = useMemo(
    () => ({
      setGraph: (payload: Graph) => handleAction(GraphAction.SET_GRAPH, payload),
      setGraphInfo: (payload: { nodeCount: number; nodeCountAPI?: number }) =>
        handleAction(GraphAction.SET_GRAPH_INFO, payload),
      startOpenNode: (payload: IOpenId) => handleAction(GraphAction.OPEN_NODE_START, payload),
      startShortestPath: (payload: IOpenId) => handleAction(GraphAction.OPEN_SHORTEST_PATH_START, payload),
      finishOpenNode: () => handleAction(GraphAction.OPEN_NODE_FINISH),
      startDeleteNode: (payload: IOpenId) => handleAction(GraphAction.DELETE_NODE_START, payload),
      finishDeleteNode: () => handleAction(GraphAction.DELETE_NODE_FINISH),
      startOpenNodeCreate: (payload: IIdOpen) => handleAction(GraphAction.OPEN_CREATE_NODE_START, payload),
      finishOpenNodeCreate: () => handleAction(GraphAction.OPEN_CREATE_NODE_FINISH),
      startOpenEdge: (payload: IIdOpen) => handleAction(GraphAction.OPEN_EDGE_START, payload),
      finishOpenEdge: () => handleAction(GraphAction.OPEN_EDGE_FINISH),
      startDeleteEdge: (payload: IOpenId) => handleAction(GraphAction.DELETE_EDGE_START, payload),
      finishDeleteEdge: () => handleAction(GraphAction.DELETE_EDGE_FINISH),
      startOpenEdgeCreate: (payload: IOpenEdge) => handleAction(GraphAction.OPEN_CREATE_EDGE_START, payload),
      finishOpenEdgeCreate: () => handleAction(GraphAction.OPEN_CREATE_EDGE_FINISH),
      finishShortestPath: () => handleAction(GraphAction.SHORTEST_PATH_FINISH),

      startFuzzyModal: (payload: IOpenId) => handleAction(GraphAction.OPEN_FUZZY_START, payload),
      finishFuzzyModal: () => handleAction(GraphAction.OPEN_FUZZY_FINISH),

      startFuzzyPreviewModal: (payload: IOpenId) => handleAction(GraphAction.OPEN_FUZZY_PREVIEW_START, payload),
      finishFuzzyPreviewModal: () => handleAction(GraphAction.OPEN_FUZZY_PREVIEW_FINISH),

      setFuzzyMatchData: (payload: FuzzyMatchResponseData[]) => handleAction(GraphAction.FUZZY_MATCH_DATA, payload),
    }),
    [handleAction]
  );

  const context = useMemo(() => ({ ...callbacks, ...state }), [callbacks, state]);

  return <Outlet context={context} />;
};

export const useGraph: () => VisualisationContextType = () => useOutletContext<VisualisationContextType>();
