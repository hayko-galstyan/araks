import { AnyObject } from 'antd/es/_util/type';
import { TAnalyticsActions, TAnalyticsState, TToolItem } from './types';
import { ANALYTICS, AnalyticActionTypes } from 'helpers/constants';

const { TOOLBAR, BARTYPES } = ANALYTICS;

const { CREATE, UPDATE } = AnalyticActionTypes;

export const ACTIONS = {
  SELECT_TOOL: 'SELECT_TOOL' as const,
  CHANGE_BOARD: 'CHANGE_BOARD' as const,
  ADD_BOARD_ITEMS: 'ADD_BOARD_ITEMS' as const,
  ADD_TOOL_DASHBOARD: 'ADD_TOOL_DASHBOARD' as const,
  UPDATE_TOOL_PARAMS: 'UPDATE_TOOL_PARAMS' as const,
  BAR_SIZE_CHANGE: 'BAR_SIZE_CHANGE' as const,
  SELECT_NODE_TYPE_ID: 'SELECT_NODE_TYPE_ID' as const,
  SET_BOARDS: 'SET_BOARDS' as const,
  ADD_BOARD: 'ADD_BOARD' as const,
  ADD_TABLE_DATA: 'ADD_TABLE_DATA' as const,
  RENAME_BOARD_NAME: 'RENAME_BOARD_NAME' as const,
  REMOVE_BOARD: 'REMOVE_BOARD' as const,
  REMOVE_TOOL_DASHBOARD: 'REMOVE_TOOL_DASHBOARD' as const,
  CLEAR_BOARD_ITEMS: 'CLEAR_BOARD_ITEMS' as const,
};

export const reducer = (state: TAnalyticsState, action: TAnalyticsActions): TAnalyticsState => {
  const { type, payload } = action;

  switch (type) {
    /* 
     set all boards
     @params [data boardItem]
    */

    case ACTIONS.SET_BOARDS: {
      return {
        ...state,
        boards: payload,
        activeBoard: payload.at(0)?.id || '',
      };
    }

    /* 
     add board
     @params [data boardItem]
    */

    case ACTIONS.ADD_BOARD: {
      return {
        ...state,
        boards: payload,
        activeBoard: payload.at(-1)?.id || '',
      };
    }

    /* 
     rename board name by id
     @params [id, name]
    */

    case ACTIONS.RENAME_BOARD_NAME: {
      return {
        ...state,
        boards: state.boards.map((board) => (board.id === payload.id ? { ...board, name: payload.name } : board)),
      };
    }

    /* 
      delete board by id
      @params [id]
    */

    case ACTIONS.REMOVE_BOARD: {
      const tools = { ...state.tools };

      delete tools[payload]; // delete board tools

      const boards = state.boards.filter((board) => board.id !== payload);

      return {
        ...state,
        boards: boards,
        activeBoard: state.activeBoard === payload ? boards[0].id : state.activeBoard,
        tools: tools,
      };
    }

    /*
      select node type in bar tools
      @params [id]
    */

    case ACTIONS.SELECT_NODE_TYPE_ID: {
      return {
        ...state,
        nodeTypeId: payload?.update ? payload.id : payload.id === state?.nodeTypeId ? null : payload.id,
      };
    }

    /*
      select tool bar tool
      @params none
    */

    case ACTIONS.SELECT_TOOL:
      let uniqueKey = crypto.randomUUID();
      let type = CREATE;
      if (payload.id) {
        uniqueKey = payload.id;
        type = UPDATE;
      }
      return {
        ...state,
        toolBarWidth: TOOLBAR.WIDTH,
        canvasWidth: state.toolBarWidth < TOOLBAR.WIDTH ? state.canvasWidth - TOOLBAR.WIDTH + 80 : state.canvasWidth,
        selectedTool: { id: uniqueKey, name: payload.name, type: payload.type, action_type: type },
      };

    /*
      change activeBoard on click board 
      @params [index]
    */

    case ACTIONS.CHANGE_BOARD: {
      return {
        ...state,
        activeBoard: payload,
      };
    }

    /* 
      set my board tools when open board
      @params [data]
    */

    case ACTIONS.ADD_BOARD_ITEMS: {
      return {
        ...state,
        tools: {
          ...state.tools,
          [state.activeBoard]: {
            ...payload.reduce((acc, item) => {
              if (item && item.id) {
                acc[item.id] = {
                  id: item.id,
                  fx: item.fx,
                  fy: item.fy,
                  width: item.width,
                  height: item.height,
                  name: item.name,
                  type: item.type,
                  source_type_id: item.source_type_id,
                  color: item.color || undefined,
                  title: item.title || undefined,
                  params: item.params,
                  data: item.data,
                  legend: item.legend || undefined,
                  colors: item.colors,
                  operator: item.operator,
                  valid: item.params.map((item: AnyObject) => item.property_type_id).includes(null),
                };
              }
              return acc;
            }, {} as Record<string, TToolItem>),
          },
        },
      };
    }

    /* 
      add dashboard tool
      @params [data: AnyObject]
    */

    case ACTIONS.ADD_TOOL_DASHBOARD: {
      if (!state.selectedTool?.id || !state.selectedTool?.type || !state.selectedTool?.name) {
        return state;
      }

      return {
        ...state,
        tools: {
          ...state.tools,
          [state.activeBoard]: {
            ...(state.tools[state.activeBoard] || {}),
            [payload.id]: {
              id: payload.id,
              fx: payload.fx,
              fy: payload.fy,
              width: payload.width,
              height: payload.height,
              name: payload.name,
              type: payload.type,
              color: payload.color || undefined,
              title: payload.title || undefined,
              params: payload.params,
              data: payload.data,
              legend: payload.legend || undefined,
              colors: payload.colors,
              operator: payload.operator,
              source_type_id: state.nodeTypeId,
              valid: payload.valid,
            },
          },
        },
        selectedTool: null,
      };
    }

    /* 
      ADD TABLE DATA PAGINATION
      params [id, data]
    */

    case ACTIONS.ADD_TABLE_DATA: {
      const { tools, activeBoard } = state;
      const boardTools = tools[activeBoard];

      boardTools[payload.id].data = [...payload.data];

      return {
        ...state,
        tools: {
          ...state.tools,
          [payload.id]: {
            ...boardTools,
          },
        },
      };
    }

    /* 
      remove tool of the board
      @params 
    */

    case ACTIONS.REMOVE_TOOL_DASHBOARD: {
      const { tools, activeBoard } = state;

      const updatedBoardTools = { ...tools[activeBoard] };

      delete updatedBoardTools[payload];

      return {
        ...state,
        tools: {
          ...tools,
          [activeBoard]: updatedBoardTools,
        },
        selectedTool: null,
      };
    }

    /* 
      clear board 
      @params [payload] board id
    */

    case ACTIONS.CLEAR_BOARD_ITEMS: {
      const { tools } = state;

      return {
        ...state,
        tools: {
          ...tools,
          [payload as string]: {}, // Clear the tools for the active board
        },
      };
    }

    /* 
      change bar width
      @params [id,updateParams]
    */

    case ACTIONS.UPDATE_TOOL_PARAMS: {
      return {
        ...state,
        tools: {
          ...state.tools,
          [state.activeBoard]: {
            ...(state.tools[state.activeBoard] || {}),
            [payload.id]: {
              ...state.tools[state.activeBoard][payload.id],
              ...payload.updatedParams,
            },
          },
        },
      };
    }

    /* 
      change bar width
      @params [name]
    */

    case ACTIONS.BAR_SIZE_CHANGE: {
      const updatedState = { ...state };

      switch (payload.name) {
        case 'typeBar':
          updatedState.barTypeWidth = state.barTypeWidth === BARTYPES.WIDTH ? 80 : BARTYPES.WIDTH;
          break;
        case 'toolBar':
          updatedState.toolBarWidth = state.toolBarWidth === TOOLBAR.WIDTH ? 80 : TOOLBAR.WIDTH;
          break;
        default:
          break;
      }
      updatedState.canvasWidth = window.innerWidth - updatedState.barTypeWidth - updatedState.toolBarWidth - 20;
      return updatedState;
    }

    default:
      return state;
  }
};
