import { Col, Row, Table } from 'antd';
import { VerticalSpace } from 'components/space/vertical-space';
import { ImportTable } from 'components/table/import-table';
import { useImport } from 'context/import-context';

/**
 * Component to show grid data for CSV
 * @returns
 */
export const ImportCsv = () => {
  const { state } = useImport();

  return (
    <VerticalSpace size="large">
      <Row>
        {(!state.showMapping || state.showMappingResult) && (
          <Col span={24}>
            <Table
              dataSource={state.dataSource}
              columns={state.columns}
              style={{ maxWidth: state?.step === 1 ? '70%' : '100%' }}
              tableLayout="fixed"
              scroll={{ x: 'max-content' }}
              pagination={!!state.showMappingResult ? undefined : false}
            />
          </Col>
        )}
        {state.step === 2 && state.showMapping && !state.showMappingResult && (
          <Col span={24}>
            <ImportTable />
          </Col>
        )}
      </Row>
    </VerticalSpace>
  );
};
