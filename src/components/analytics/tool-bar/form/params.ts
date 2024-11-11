import { AnalyticToolForm, COLORS } from 'helpers/constants';
import { ToolParamsType } from 'components/analytics/types';
import { OPERATOR_SELECT_OPTIONS } from './operators';

const { TREESELECT, SELECT, COLOR, INPUT, TEXT_EDITOR } = AnalyticToolForm;

export const enum DINAMIC_FORM_NAME {
  OPERATOR = 'operator',
  Y_AXIS = 'yAxis',
  X_AXIS = 'xAxis',
  TITLE = 'title',
  LEGEND = 'legend',
  COLUMNS = 'columns',
  COLOR = 'color',
  EDITOR = 'editor',
}

export const ParamsTools: ToolParamsType[] = [
  {
    type: 'chart',
    items: [
      {
        type: INPUT,
        name: DINAMIC_FORM_NAME.TITLE,
        label: 'Title',
        required: false,
        placeholder: 'Title',
        message: 'Title is required',
      },
      {
        type: TREESELECT,
        name: DINAMIC_FORM_NAME.X_AXIS,
        label: 'X(Axis)',
        required: true,
        message: 'xAxis is required',
        placeholder: 'Select xAxis',
        options: [],
      },
      {
        type: TREESELECT,
        name: DINAMIC_FORM_NAME.Y_AXIS,
        label: 'Y(axis)',
        required: true,
        message: 'yAxis is required',
        placeholder: 'Select yAxis',
        options: [],
      },
      {
        type: SELECT,
        name: DINAMIC_FORM_NAME.OPERATOR,
        label: 'Operator',
        required: false,
        message: 'Operator is required',
        placeholder: 'Select Operator',
        options: OPERATOR_SELECT_OPTIONS,
      },
      {
        type: SELECT,
        name: DINAMIC_FORM_NAME.LEGEND,
        label: 'Legend',
        required: false,
        mode: undefined,
        message: 'Legend is required',
        placeholder: 'Select legend',
        options: [
          { label: 'no', value: false },
          { label: 'yes', value: true },
        ],
      },
      {
        type: COLOR,
        name: DINAMIC_FORM_NAME.COLOR,
        label: 'Color',
        required: false,
        color: COLORS.PRIMARY.BLUE,
      },
    ],
  },
  {
    type: 'table',
    items: [
      {
        type: INPUT,
        name: DINAMIC_FORM_NAME.TITLE,
        label: 'Title',
        required: false,
        placeholder: 'Title',
        message: 'Title is required',
      },
      {
        type: TREESELECT,
        name: DINAMIC_FORM_NAME.COLUMNS,
        label: 'Columns',
        placeholder: 'Columns',
        required: true,
        mode: 'multiple',
        options: [],
        message: 'Columns are required!',
      },
      {
        type: COLOR,
        name: DINAMIC_FORM_NAME.COLOR,
        label: 'Color',
        placeholder: 'Title Color',
        required: false,
        color: COLORS.PRIMARY.BLUE,
      },
    ],
  },
  {
    type: 'text',
    items: [
      {
        type: INPUT,
        name: DINAMIC_FORM_NAME.TITLE,
        label: 'Title',
        required: false,
        placeholder: 'Title',
        message: 'Title is required',
      },
      {
        type: TEXT_EDITOR,
        name: DINAMIC_FORM_NAME.EDITOR,
        label: 'Editor',
        required: false,
        placeholder: 'Type...',
        message: 'Editor',
      },
    ],
  },
  {
    type: 'card',
    items: [
      {
        type: INPUT,
        name: DINAMIC_FORM_NAME.TITLE,
        label: 'Title',
        required: false,
        placeholder: 'Title',
        message: 'Title is required',
      },
      {
        type: TREESELECT,
        name: DINAMIC_FORM_NAME.Y_AXIS,
        label: 'Properties',
        required: true,
        placeholder: 'Select property',
        message: 'Title is required',
      },
      {
        type: SELECT,
        name: DINAMIC_FORM_NAME.OPERATOR,
        label: 'Operator',
        required: false,
        message: 'Operator is required',
        placeholder: 'Select Operator',
        options: OPERATOR_SELECT_OPTIONS,
      },
      {
        type: COLOR,
        name: DINAMIC_FORM_NAME.COLOR,
        label: 'Color',
        placeholder: 'Title Color',
        required: false,
        color: COLORS.PRIMARY.BLUE,
      },
    ],
  },
];
