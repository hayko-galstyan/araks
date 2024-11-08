import { useMemo, useState } from 'react';
import { Spin, Table } from 'antd';
import { list_columns } from './columns';
import { useGetDocuments } from '../../hooks/use-get-documents';
import { initialPageData } from '../../constants';
import { FilterValue, SorterResult, TablePaginationConfig } from 'antd/es/table/interface';
import { ORDER } from 'helpers/constants';
import { IDocumentResponse } from 'api/types';
import { UploadedFileType } from 'types/node';
import './document-table.css';
import { useIsXXlScreen } from 'hooks/use-breakpoint';
import { useDocument } from 'components/layouts/components/document/wrapper';
import { useDocumentSimulation } from '../../hooks/use-get-simulation';
import { LoadingOutlined } from '@ant-design/icons';

export const List = () => {
  const [pageData, setPageData] = useState(initialPageData);
  const { searchDocument } = useDocument();

  const documentsData = useGetDocuments({ search: searchDocument, pageData });
  const isXXl = useIsXXlScreen();
  const { setShowDocumentDrawer } = useDocument();

  const { temp, isLoading } = useDocumentSimulation<IDocumentResponse>({
    data: documentsData?.documents ?? [],
  });

  const handleTableChange = (
    pagination: TablePaginationConfig,
    filters: Record<string, FilterValue | null>,
    sorter: SorterResult<IDocumentResponse> | SorterResult<IDocumentResponse>[]
  ) => {
    const sort = sorter as { column: { propertyId: string } };

    const newPageData = {
      ...pageData,
      page: pagination.current || 1,
      limit: pagination.pageSize || initialPageData.limit,
      sortOrder: Array.isArray(sorter)
        ? sorter[0]?.order === 'ascend'
          ? ORDER.ASC
          : ORDER.DESC
        : sorter.order === 'ascend'
        ? ORDER.ASC
        : ORDER.DESC,
      sortField: sort?.column?.propertyId as string,
    };
    setPageData(newPageData);
  };

  const handleDocumentNameClick = (record: UploadedFileType) => {
    setShowDocumentDrawer(record);
  };

  const docs = list_columns(handleDocumentNameClick);

  const modifiedColumns = useMemo(() => {
    return docs.map((column, colIndex) => {
      return {
        ...column,
        render: (text: string, record: IDocumentResponse, index: number) => {
          const isLastRow = index === temp.length - 1;
          if (isLastRow && isLoading) {
            return colIndex === 0 ? <Spin spinning={isLoading} indicator={<LoadingOutlined spin />} /> : null;
          }
          return column.render ? column.render(text, record) : text;
        },
      };
    });
  }, [docs, isLoading, temp.length]);

  return (
    <>
      <Table
        scroll={{
          x: 'auto',
          scrollToFirstRowOnChange: true,
          y: documentsData?.documents?.length ? `calc(100vh - ${(isXXl ? 152 : 130) + 220}px)` : '155px',
        }}
        sticky
        className="document-table"
        dataSource={temp}
        columns={modifiedColumns}
        tableLayout="auto"
        pagination={{
          current: pageData.page,
          pageSize: pageData.limit,
          total: documentsData?.count,
          responsive: true,
        }}
        onChange={handleTableChange}
      />
    </>
  );
};
