import { Graph } from '@antv/g6';
import { UploadedFileType } from 'types/node';
import { IUseGetDocuments } from 'types/document-repository';

export type DocumentReducerState = {
  setSelectedType: (id?: string) => void;
  setDocumentId: (id?: string) => void;
  setSimilarDocument: (params?: { document_name: string; url: string }) => void;
  setGraph: (graph?: Graph) => void;
  setShowDocumentDrawer: (uploadedFileType?: UploadedFileType) => void;
  setSearchDocument: (searchDocument?: string) => void;
  setSimilarDocumentList: (showDocumentDrawer?: IUseGetDocuments) => void;
};

export interface ISimilarDocument {
  document_name: string;
  url: string;
}

export type DocumentReducerSetState = {
  graph: Graph;
  selectedType: string;
  documentId: string;
  searchDocument?: string;
  similarDocument: ISimilarDocument;
  similarDocumentList: IUseGetDocuments;
  showDocumentDrawer: UploadedFileType;
};
export interface DocumentContextType extends DocumentReducerSetState, DocumentReducerState {}
