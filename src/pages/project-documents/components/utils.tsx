import { ReactNode } from 'react';
import { FileTypes } from './constants';
import { ReactComponent as ExcelSvg } from './icons/excel.svg';
import { ReactComponent as DocsSvg } from './icons/docs.svg';
import { ReactComponent as PdfSvg } from './icons/pdf.svg';
import { ReactComponent as DefaultSvg } from './icons/default.svg';

export const getFileExtension = (filePath: string): string => {
  const parts = filePath.split('.');
  return parts[parts.length - 1];
};

export const getFileIcon = (filePath: string, height?: number): ReactNode => {
  const extension = getFileExtension(filePath).toLocaleLowerCase();

  switch (extension) {
    case FileTypes.PDF:
      return <PdfSvg style={{ height }} />;
    case FileTypes.DOC:
    case FileTypes.DOCX:
      return <DocsSvg style={{ height }} />;
    case FileTypes.XLS:
    case FileTypes.XLSX:
      return <ExcelSvg style={{ height }} />;
    default:
      return <DefaultSvg style={{ height }} />;
  }
};
