import React from 'react';
import { PieChart as Chart, Pie, Cell, Legend, Tooltip as ChartTooltip, TooltipProps } from 'recharts';
import { AnyObject } from 'antd/es/_util/type';
import { Badge, Flex, Tooltip } from 'antd';
import { Text } from 'components/typography';
import { TChartParams, TDataItem } from '../types';
import { COLORS } from 'helpers/constants';
import { valueFormatter } from '../util';

const CustomLegend = ({ height, payload }: { height: number; payload: AnyObject[] }) => {
  return (
    <ul
      style={{
        listStyleType: 'none',
        maxWidth: 100,
        maxHeight: height - 20,
        overflowY: 'auto',
        overflowX: 'hidden',
        padding: 10,
      }}
    >
      {payload.map((entry: AnyObject, index: number) => (
        <li key={`item-${index}`} style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
          <Badge
            color={entry.color}
            text={
              <Tooltip color={entry.color} title={entry.value}>
                {valueFormatter(entry.value, 5)}
              </Tooltip>
            }
          />
        </li>
      ))}
    </ul>
  );
};

const CustomTooltip: React.FC<TooltipProps<number, string> & { axisData: AnyObject[] }> = ({
  active,
  payload,
  label,
  axisData,
}) => {
  if (active && payload && payload.length) {
    return (
      <Flex vertical gap={12} style={{ padding: 10, borderRadius: 10, background: `${COLORS.PRIMARY.WHITE}` }}>
        <Text
          style={{ fontWeight: 700, fontSize: 14 }}
        >{`${axisData[0]?.property_type_name}(xAxis) : ${payload[0].name}`}</Text>
        <Text
          style={{ fontWeight: 700, fontSize: 14 }}
        >{`${axisData[1]?.property_type_name}(yAxis): ${payload[0].value}`}</Text>
      </Flex>
    );
  }

  return null;
};

export const PieChart: React.FC<TChartParams> = ({ width, height, params }) => {
  const { data, params: axisData, color, legend } = params;

  return (
    <Chart width={width} height={height} key={params.id}>
      <Pie
        data={data}
        color={color}
        dataKey="y"
        nameKey="x"
        label={(entry) => valueFormatter(entry.value, 15)}
        cx="50%"
        cy="50%"
      >
        {data.map((entry: TDataItem, index: number) => (
          <Cell key={`cell-${index}`} fill={params.colors[index]} stroke={params.colors[index]} strokeWidth={2} />
        ))}
      </Pie>
      <ChartTooltip content={<CustomTooltip axisData={axisData} />} />
      {legend && (
        <Legend
          content={<CustomLegend height={height} payload={data} />}
          layout="vertical"
          align="right"
          verticalAlign="top"
        />
      )}
    </Chart>
  );
};
