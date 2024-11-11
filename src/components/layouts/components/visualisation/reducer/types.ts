import { Edge, Graph } from '@antv/g6';
import { GraphAction } from './graph-manager';
import { IProjectType } from 'api/types';
import { ProjectEdgeResponse } from 'types/project-edge';
import { FuzzyMatchResponseData } from 'api/visualisation/use-create-fuzzy-match';

export interface IIdOpen {
  isOpened?: boolean;
  autoCommentsIsOpen?:boolean;
}

export interface IOpenIdState extends IIdOpen {
  id?: string;
  ids?: string[];
}

export interface IOpenEdgeState extends IIdOpen {
  edge: Edge;
}

export interface IOpenNodeCreate extends IIdOpen {
  x?: number;
  y?: number;
}

export type GraphState = {
  graph?: Graph;
  fuzzyData?: FuzzyMatchResponseData[];
  graphInfo?: { nodeCount: number; nodeCountAPI?: number };
  nodes?: IProjectType;
  edges?: ProjectEdgeResponse[];
  openNode?: IOpenIdState;
  openEdge?: IOpenEdgeState;
  openNodeCreate?: IIdOpen;
  openShortestPath?: IOpenIdState;
  openEdgeCreate?: IIdOpen;
  deleteNode?: IIdOpen;
  deleteEdge?: IIdOpen;
  openFuzzy?: IIdOpen;
  openFuzzyPreview?: IIdOpen;
};

export interface GraphActionType {
  type: GraphAction;
  payload: GraphState;
}
