import { IDocumentsTypeData } from 'types/document-repository';
import { DEFAULT_PAGE_NUMBER } from 'helpers/constants';

export const propsDocumentBlockView = {
  row: {
    gutter: [24, 24],
    justify: 'start',
  },
  col: {
    xl: 6,
    xxl: 4,
  },
  newProject: {},
  project: {},
  projectButton: {},
};

export enum FileTypes {
  PDF = 'pdf',
  DOCX = 'docx',
  DOC = 'doc',
  XLSX = 'xlsx',
  XLS = 'xls',
  JPG = 'jpg',
}

export const initialPageData: IDocumentsTypeData = {
  page: DEFAULT_PAGE_NUMBER,
  limit: 10,
  sortField: 'created_at',
  sortOrder: 'ASC',
  search: undefined,
};
