import _ from 'lodash';
import { DocumentActionType, DocumentState } from './types';
import { GraphState } from '../../visualisation/reducer/types';

export enum ITEM {
  GRAPH = 'graph',
  SELECTED_TYPE = 'selectedType',
  SIMILAR_DOCUMENT = 'similarDocument',
  VISUALIZATION_DOCUMENT = 'documentId',
  SHOW_DOCUMENT_DRAWER = 'showDocumentDrawer',
  SEARCH_DOCUMENT = 'searchDocument',
  SIMILAR_DOCUMENT_LIST = 'similarDocumentList',
}

export enum DocumentAction {
  SELECTED_TYPE = 'SELECTED_TYPE',
  SET_GRAPH = 'SET_GRAPH',
  VISUALIZATION_DOCUMENT = 'VISUALIZATION_DOCUMENT',
  SIMILAR_DOCUMENT = 'SIMILAR_DOCUMENT',
  SIMILAR_DOCUMENT_LIST = 'SIMILAR_DOCUMENT_LIST',
  SHOW_DOCUMENT_DRAWER = 'SHOW_DOCUMENT_DRAWER',
  SEARCH_DOCUMENT = 'SEARCH_DOCUMENT',
}

export const documentInitialState: DocumentState = {};

export const documentReducer: (state: DocumentState, action: DocumentActionType) => DocumentState = (state, action) => {
  const { type, payload } = action;

  const insert = (item: ITEM) => ({
    ...state,
    [item]: _.isEmpty(payload) ? undefined : payload,
  });

  switch (type) {
    case DocumentAction.SET_GRAPH:
      return insert(ITEM.GRAPH) as GraphState;
    case DocumentAction.SELECTED_TYPE:
      return insert(ITEM.SELECTED_TYPE) as DocumentState;
    case DocumentAction.SIMILAR_DOCUMENT:
      return insert(ITEM.SIMILAR_DOCUMENT) as DocumentState;
    case DocumentAction.VISUALIZATION_DOCUMENT:
      return insert(ITEM.VISUALIZATION_DOCUMENT) as DocumentState;
    case DocumentAction.SHOW_DOCUMENT_DRAWER:
      return insert(ITEM.SHOW_DOCUMENT_DRAWER) as DocumentState;
    case DocumentAction.SEARCH_DOCUMENT:
      return insert(ITEM.SEARCH_DOCUMENT) as DocumentState;
    case DocumentAction.SIMILAR_DOCUMENT_LIST:
      return insert(ITEM.SIMILAR_DOCUMENT_LIST) as DocumentState;
    default:
      return state;
  }
};
