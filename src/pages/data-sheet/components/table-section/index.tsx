import { useEffect, useRef, useState } from 'react';
import { Spin, Table } from 'antd';
import { TablePaginationConfig, FilterValue, SorterResult } from 'antd/es/table/interface';
import { useColumns } from './use-columns';
import { DataType } from './types';
import { useActions } from './table-actions';
import { getTableHeight } from './constants';
import { VerticalButton } from 'components/button/vertical-button';
import { GetTypeNodes } from 'api/node/use-get-type-nodes';
import { useDataSheetWrapper } from 'components/layouts/components/data-sheet/wrapper';
import { NodePropertiesValues } from 'types/node';
import { getColumnValue, showAvatar } from './node/utils';
import { ViewDatasheetProvider } from 'context/datasheet-view-vontext';
import { NodePagination } from 'components/pagination';
import { DEFAULT_PAGE_NUMBER, DEFAULT_PAGE_SIZE, ORDER } from 'helpers/constants';
import { PageParameters } from 'api/types';
import { NodeViewButton } from './node/node-view-button';
import { ConnectionColumnValue } from './node/connection-column-value';
import { getConnectionFormName } from 'components/form/type/connection-type';
import { ImportDrawer } from 'components/drawer/import-drawer';
import { ImportStepsDrawer } from 'components/drawer/import-steps-drawer';
import { useIsPublicPage } from 'hooks/use-is-public-page';
import { useIsXXlScreen } from 'hooks/use-breakpoint';
import { ProgressBar } from 'components/progress-bar';
import { useImport } from 'context/import-context';
import { ReactComponent as DefaultIconSvg } from 'components/icons/default-image.svg';
import styled from 'styled-components';

const Wrapper = styled.div`
  position: relative;

  .ant-dropdown-trigger {
    background: transparent !important;
  }

  &&& {
    .ant-table {
      overflow: hidden !important;
    }
  }
  tr {
    .node-property-column:first-child {
      width: 73px;
    }
  }
`;

const dataSource = (length: number, pageSize: number): DataType[] =>
  [...Array(pageSize - length)].map((_, i) => ({
    key: i,
    column: 'operation',
  }));

const initPageData: PageParameters = {
  page: DEFAULT_PAGE_NUMBER,
  size: DEFAULT_PAGE_SIZE,
  filters: [],
};

export const TableSection = () => {
  const [pageData, setPageData] = useState(initPageData);
  const [columnWidth, setColumnWidth] = useState(0);
  const [, setTableHead] = useState(0);
  const [rowData, setRowData] = useState<DataType[]>(dataSource(0, DEFAULT_PAGE_SIZE));
  const tableRef = useRef<HTMLDivElement>(null);
  const isPublicPage = useIsPublicPage();
  const isXXl = useIsXXlScreen();
  const {
    state: { progressStart, progressStop },
  } = useImport();

  const { nodeTypeId } = useDataSheetWrapper();
  const {
    rowsData: data,
    count: pageCount,
    isLoading,
  } = GetTypeNodes(pageData, nodeTypeId, {
    enabled: !!nodeTypeId,
    onSuccess: ({ rows: data, count }) => {
      const rows = data.map((row) => ({
        ...row.properties?.reduce(
          (curr: DataType, item: NodePropertiesValues) => {
            return {
              ...curr,
              [item.nodeTypeProperty.name + item.nodeTypeProperty.id]: getColumnValue(item, row),
            };
          },
          {
            key: row.id,
            name: <NodeViewButton text={row.name} rowData={row} />,
            default_image: row.default_image ? (
              showAvatar(`${process.env.REACT_APP_AWS_URL}${row.default_image}`)
            ) : (
              <DefaultIconSvg style={{ marginLeft: '5px' }} />
            ),
          } as DataType
        ),
        ...row.edges?.reduce((curr: DataType, item) => {
          return {
            ...curr,
            [item.edgeTypes.name + item.edgeTypes.id]: (
              <ConnectionColumnValue
                itemName={getConnectionFormName(item.edgeTypes.name, item.edgeTypes.id)}
                row={row}
              />
            ),
          };
        }, {} as DataType),
      }));

      setRowData([
        ...(rows ? rows : []),
        ...dataSource(
          rows?.length || 0,
          count < pageData.size ? (count > DEFAULT_PAGE_SIZE ? count : DEFAULT_PAGE_SIZE) : pageData.size
        ),
      ] as DataType[]);
    },
  });

  const columns = useColumns();
  const actions = useActions();

  useEffect(() => {
    if (columns.length) {
      let summaryWidth = 0;
      const columnsProperty = document.querySelectorAll('.ant-table-thead .node-property-column');

      columnsProperty.forEach((column: Element) => {
        summaryWidth += column.clientWidth;
      });

      setColumnWidth(summaryWidth);
    }
  }, [columns, columns.length]);

  useEffect(() => {
    if (columns.length) {
      let summaryHeight = document.querySelector('#node-table .ant-table-thead')?.clientHeight || 0;
      if (!rowData) {
        setTableHead(summaryHeight);
        return;
      }
      const columnsProperty = document.querySelectorAll('#node-table .ant-table-tbody .ant-table-row');

      const firstFourElements = Array.from(columnsProperty).slice(0, data.length ?? 0);
      firstFourElements.forEach((column: Element) => {
        summaryHeight += column.clientHeight || 0;
      });
      setTableHead(summaryHeight);
    }
  }, [columns, data.length, rowData]);
  useEffect(() => {
    if (columns.length) {
      const summaryWidth = Array.from(document.querySelectorAll('.ant-table-thead .node-property-column')).reduce(
        (acc, column) => acc + (column as HTMLElement).clientWidth,
        0
      );
      setColumnWidth(summaryWidth);
    }
  }, [columns]);
  useEffect(() => {
    setPageData({
      page: 1,
      size: 20,
      filters: [],
    });
  }, [nodeTypeId]);
  const handleTableChange = (
    pagination: TablePaginationConfig,
    filters: Record<string, FilterValue | null>,
    sorter: SorterResult<DataType> | SorterResult<DataType>[]
  ) => {
    const sort = sorter as { column: { propertyId: string } };

    if (sort?.column) {
      const newPageData = {
        ...pageData,
        sortOrder: Array.isArray(sorter)
          ? sorter[0]?.order === 'ascend'
            ? ORDER.ASC
            : ORDER.DESC
          : sorter.order === 'ascend'
          ? ORDER.ASC
          : ORDER.DESC,
        sortFieldId: sort?.column.propertyId,
      };
      setPageData(newPageData);
    }
  };

  return (
    <Wrapper>
      {!isPublicPage && (
        <>
          <ImportDrawer />
          <ImportStepsDrawer />
        </>
      )}
      <div
        style={{
          height:"100%",
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}
      >
        <div
          id="container"
          className="content-datasheet"
          style={{ overflowY: 'auto', width: '100%', height: getTableHeight, position: 'relative' }}
          ref={tableRef}
        >
          <VerticalButton columnWidth={columnWidth} />
          <Spin spinning={isLoading}>
            <ViewDatasheetProvider>
              <Table
                id="node-table"
                size="large"
                bordered
                dataSource={rowData}
                columns={[...columns, ...actions]}
                pagination={false}
                scroll={{
                  x: 'max-content',
                  y: `calc(100vh - ${(isXXl ? 152 : 130) + 220}px)`,
                  scrollToFirstRowOnChange: true,
                }}
                sticky
                onChange={handleTableChange}
              />
            </ViewDatasheetProvider>
          </Spin>
        </div>
        {pageCount && pageData.size > 0 && (
          <NodePagination
            total={pageCount}
            defaultPageSize={initPageData.size}
            pageSize={pageData.size}
            defaultCurrent={initPageData.page}
            current={pageData.page}
            onChange={(page) => {
              setPageData((prev) => ({
                page,
                size: prev.size,
                sortOrder: pageData.sortOrder,
                sortFieldId: pageData.sortFieldId,
                filters: [],
              }));
            }}
            showSizeChanger
            onShowSizeChange={(current, size) => {
              setPageData({ page: current, size: size, sortOrder: ORDER.DESC, filters: [] });
            }}
          />
        )}
      </div>

      <ProgressBar start={!!progressStart} stop={!!progressStop} />
    </Wrapper>
  );
};
