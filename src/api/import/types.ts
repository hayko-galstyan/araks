import { UseQueryOptions } from '@tanstack/react-query';
import { DataResultItem, SetImportRule } from 'context/import-context';

export type ImportNodesRequest = {
  rule: SetImportRule;
  datas: DataResultItem[];
};

type SuccessType = {
  id: string;
  project_id: string;
  project_type_id: string;
  user_id: string;
  name: string;
  updated_at: string;
  created_at: string;
  default_image: null;
};

export type ImportedTableDataSummary = {
  key: string;
  existingColumns: string;
  existingRows: number;
  importedColumns: string;
  importedRows: number;
  mergedRows: number;
};

export type ImportNodesResponse = {
  success: SuccessType[];
  warnings: string[];
  tableData: ImportedTableDataSummary[];
};

export type TUseGetPropertyCount = (
  id: string,
  options?: UseQueryOptions<{ count: number }, Error>
) => {
  data: {
    count: number;
  };
};
