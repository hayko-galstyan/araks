import { AnyObject } from 'antd/es/_util/type';

/* Board Types */

export type TBoardParam = {
  onHandleScreenShot: () => void;
  onUpdateBoard: (action: boolean) => void;
  isUpdateBoard: boolean;
};

/* Tool Params */

export type SelectOption = {
  label: string | React.ReactNode;
  value: string | boolean | number;
  type?: string[];
};

export type ToolItem = {
  type: 'input' | 'select' | 'color' | 'treeSelect' | 'text-editor';
  name: string;
  label: string;
  required?: boolean;
  message?: string;
  mode?: 'multiple' | 'tags' | undefined;
  options?: SelectOption[];
  color?: string;
  placeholder?: string;
};

export type ToolParamsType = {
  type: string;
  items: ToolItem[];
};

export type TTreeSelectType = {
  title?: React.ReactNode;
  value?: string;
  key?: string;
  id?: string;
  name?: string;
  type?: string;
  label?: string;
  children?: TTreeSelectType[];
  disabled?: boolean;
  project_type_name?: string;
  project_type_id?: string;
  target_edge_type_id?: string;
};

/* Tool Bar */

export type TToolParams = {
  name: string;
  type: string;
};

/* Table */

export type TColumnParam = {
  axis: string;
  project_type_name: string;
  property_type_name: string;
};

/* Header Container */

export type THeaderParams = {
  id: string;
  toolAxis: string | undefined;
  isValid: boolean;
};

/* Dragging Component */

export type TDraggingParams = {
  containerKey: string;
  children: React.ReactNode | null;
};

/* Charts */

export type TChart = {
  id: string;
};

export type TChartParams = {
  width: number;
  height: number;
  params: AnyObject;
};

export type TDataItem = {
  x_axis_name: string;
  y_axis_name: string;
};
