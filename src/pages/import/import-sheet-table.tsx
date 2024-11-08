import { Table } from 'antd';
import { useImport } from 'context/import-context';

type Props = {
  activeTab: string;
};

export const ImportSheetTable = ({ activeTab }: Props) => {
  const { state } = useImport();
  return (
    <Table
      dataSource={state.dataSource}
      columns={state.columns}
      tableLayout="fixed"
      style={{ maxWidth: state.step === 1 ? '70%' : '100%' }}
      scroll={{ x: 'max-content' }}
      pagination={!!state.showMappingResult ? undefined : false}
    />
  );
};
