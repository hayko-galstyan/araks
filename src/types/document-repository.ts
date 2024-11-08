import React from 'react';
import { IDocumentResponse, IResponseDocumentTypeData } from '../api/types';

export type LeftPanelProps = React.FC<{
  list: IResponseDocumentTypeData[] | undefined;
}>;

export interface IDocumentsTypeData {
  page: number;
  limit: number;
  sortField: string;
  sortOrder: string;
  search?: string;
}

export interface IUseGetDocuments {
  documents: IDocumentResponse[] | undefined;
  count: number;
}

export interface IUseGetDocumentsParams {
  search?: string;
  pageData?: IDocumentsTypeData;
}
