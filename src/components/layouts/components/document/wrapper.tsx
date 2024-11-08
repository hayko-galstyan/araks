import React, { useCallback, useMemo, useReducer } from 'react';
import { Outlet, useOutletContext } from 'react-router-dom';
import { DocumentAction, documentInitialState, documentReducer } from './reducer/document-manager';
import { DocumentContextType, ISimilarDocument } from './types';
import { Graph } from '@antv/g6';
import { UploadedFileType } from 'types/node';
import { IUseGetDocuments } from 'types/document-repository';

export const DocumentWrapper: React.FC = () => {
  const [state, dispatch] = useReducer(documentReducer, documentInitialState);

  const handleAction = useCallback((type: DocumentAction, payload = {}) => dispatch({ type, payload }), [dispatch]);

  const callbacks = useMemo(
    () => ({
      setGraph: (payload: Graph) => handleAction(DocumentAction.SET_GRAPH, payload),
      setSelectedType: (payload: { selectedType: string }) => handleAction(DocumentAction.SELECTED_TYPE, payload),
      setDocumentId: (payload: { documentId: string }) => handleAction(DocumentAction.VISUALIZATION_DOCUMENT, payload),
      setSimilarDocument: (payload: { similarDocument: ISimilarDocument }) =>
        handleAction(DocumentAction.SIMILAR_DOCUMENT, payload),
      setShowDocumentDrawer: (payload: UploadedFileType) => handleAction(DocumentAction.SHOW_DOCUMENT_DRAWER, payload),
      setSearchDocument: (payload: { searchDocument?: string }) =>
        handleAction(DocumentAction.SEARCH_DOCUMENT, payload),
      setSimilarDocumentList: (payload: { similarDocumentList?: IUseGetDocuments }) =>
        handleAction(DocumentAction.SIMILAR_DOCUMENT_LIST, payload),
    }),
    [handleAction]
  );

  const context = useMemo(() => ({ ...callbacks, ...state }), [callbacks, state]);

  return <Outlet context={context} />;
};

export const useDocument: () => DocumentContextType = () => useOutletContext<DocumentContextType>();
