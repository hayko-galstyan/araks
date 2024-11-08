import { DocumentAction } from './document-manager';
import { Graph } from '@antv/g6';
import { UploadedFileType } from 'types/node';
import { IUseGetDocuments } from 'types/document-repository';

export type DocumentState = {
  graph?: Graph;
  selectedType?: string;
  documentId?: string;
  searchDocument?: string;
  showDocumentDrawer?: UploadedFileType;
  similarDocumentList?: IUseGetDocuments;
};

export interface DocumentActionType {
  type: DocumentAction;
  payload: DocumentState;
}
