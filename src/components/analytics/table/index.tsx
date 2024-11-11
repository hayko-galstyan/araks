import { useAnalytics } from 'context/analytics';
import React, { useCallback } from 'react';
import { TToolData } from 'context/analytics/types';
import { ColumnType } from 'antd/es/table';
import { Tooltip } from 'antd';
import { DraggingContainer } from '../dragging';
import { AnalyticDynamicTable } from './styles';
import { COLORS } from 'helpers/constants';
import { TColumnParam } from '../types';
import { useGetTableExternalData } from 'api/analytics/use-get-table-external-data';
import { ACTIONS } from 'context/analytics/reducer';

const getTableColumns = (data: TToolData[], params: TColumnParam[]): ColumnType<unknown>[] => {
  if (!data || !data.length) return [];

  const columns: ColumnType<unknown>[] = [];
  for (let i = 0; i < data.length; i++) {
    for (const prop in data[i]) {
      const data = params.find((item: TColumnParam) => item.axis === prop);
      if (data) {
        const title = `${data.project_type_name}.${data.property_type_name}`;
        columns.push({
          key: prop,
          title: (
            <Tooltip
              title={title}
              color={COLORS.PRIMARY.BLUE}
            >{`${data.project_type_name}.${data.property_type_name}`}</Tooltip>
          ),
          dataIndex: prop,
          ellipsis: true,
          width: 80,
        });
      }
    }
    return columns;
  }
  return columns;
};

const getTableData = (data: TToolData[]) => {
  if (!data || !data.length) return [];

  return data.map((item) => ({
    ...item,
  }));
};

export const AnalyticsTable: React.FC<{ id: string }> = ({ id }) => {
  const { tools, activeBoard, handleAction } = useAnalytics();

  const selectedTool = tools[activeBoard][id];
  const columns = getTableColumns(selectedTool?.data, selectedTool.params as TColumnParam[]);

  const { data, isFetching, hasNextPage, fetchNextPage } = useGetTableExternalData(id, 1, {
    enabled: !!selectedTool?.id,
    onSuccess: (data) => {
      const allData = data.pages.flatMap((page) => page.data);
      handleAction({
        type: ACTIONS.ADD_TABLE_DATA,
        payload: {
          id: selectedTool?.id,
          data: allData,
        },
      });
    },
  });

  const tableData = getTableData(selectedTool?.data || data);

  const handleScroll = useCallback(
    async (e: React.UIEvent<HTMLElement>) => {
      const bottom = e.currentTarget.scrollHeight - e.currentTarget.scrollTop === e.currentTarget.clientHeight;

      if (bottom && hasNextPage && !isFetching) {
        await fetchNextPage();
      }
    },
    [fetchNextPage, hasNextPage, isFetching]
  );

  return (
    <DraggingContainer containerKey={id}>
      <AnalyticDynamicTable
        key={`table-analytic-${id}`}
        style={{ width: selectedTool.width, height: selectedTool?.height }}
        columns={columns}
        dataSource={tableData}
        scroll={{
          x: selectedTool.width,
          y: selectedTool.height,
        }}
        loading={isFetching}
        onScroll={handleScroll}
        pagination={false}
        sticky
      />
    </DraggingContainer>
  );
};
