import { AnyObject } from 'antd/es/_util/type';
import { TAnalyticsBoard, TAnalyticsBoardItem } from 'api/types';

export type SelectedTool = {
  id: string;
  name: string;
  type: string;
  action_type: string;
} | null;

export type TToolData = {
  [key: string]: string | number;
};

export type TToolItem = {
  id: string;
  fx: number;
  fy: number;
  width: number;
  height: number;
  name: string;
  type: string;
  title?: string;
  color?: string;
  params: AnyObject;
  data: TToolData[];
  legend: boolean | undefined;
  colors: string[];
  source_type_id: string;
  valid: boolean;
  operator: string;
};

export type TAnalyticsContext = {
  selectedTool: SelectedTool;
  activeBoard: string;
  boards: TAnalyticsBoardItem[];
  tools: {
    [key: string]: {
      [key: string]: TToolItem;
    };
  };
  handleAction: ({ type, payload }: TAnalyticsActions) => void;
  nodeTypeId: string;
  toolBarWidth: number;
  barTypeWidth: number;
  canvasWidth: number;
};

export type TAnalyticsState = {
  selectedTool: SelectedTool;
  activeBoard: string;
  boards: TAnalyticsBoardItem[];
  tools: {
    [key: string]: {
      [key: string]: TToolItem;
    };
  };
  nodeTypeId: string;
  toolBarWidth: number;
  barTypeWidth: number;
  canvasWidth: number;
};

export type TAnalyticsActions =
  | { type: 'SELECT_TOOL'; payload: AnyObject }
  | { type: 'CHANGE_BOARD'; payload: string }
  | { type: 'ADD_TOOL_DASHBOARD'; payload: AnyObject }
  | { type: 'UPDATE_TOOL_PARAMS'; payload: AnyObject }
  | { type: 'BAR_SIZE_CHANGE'; payload: AnyObject }
  | { type: 'SELECT_NODE_TYPE_ID'; payload: AnyObject }
  | { type: 'SET_BOARDS'; payload: TAnalyticsBoardItem[] }
  | { type: 'ADD_BOARD'; payload: TAnalyticsBoardItem[] }
  | { type: 'RENAME_BOARD_NAME'; payload: { id: string; name: string } }
  | { type: 'REMOVE_BOARD'; payload: string }
  | { type: 'ADD_BOARD_ITEMS'; payload: TAnalyticsBoard[] }
  | { type: 'REMOVE_TOOL_DASHBOARD'; payload: string }
  | { type: 'CLEAR_BOARD_ITEMS'; payload: string }
  | { type: 'ADD_TABLE_DATA'; payload: AnyObject };
