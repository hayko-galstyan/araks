import React from 'react';
import {
  Bar,
  BarChart as Chart,
  CartesianGrid,
  Legend,
  XAxis,
  YAxis,
  Tooltip as ChartTooltip,
  Cell,
  TooltipProps,
  LabelList,
} from 'recharts';
import { AnyObject } from 'antd/es/_util/type';
import { Badge, Flex, Tooltip } from 'antd';
import { Text } from 'components/typography';
import { ANALYTICS, COLORS } from 'helpers/constants';
import { TChartParams, TDataItem } from '../types';
import { AnalyticToolLegend } from '../styles';
import { valueFormatter } from '../util';

const { AXIS_SIZE } = ANALYTICS;

export const BarChart: React.FC<TChartParams> = ({ width, height, params }) => {
  const { data, params: axisData, legend, colors, id } = params;

  const CustomLegend = ({
    id,
    height,
    legendData,
    colors,
  }: {
    id: string;
    height: number;
    legendData: AnyObject[];
    colors: string[];
  }) => {
    return (
      <AnalyticToolLegend vertical height={height}>
        {legendData.map((entry: AnyObject, index: number) => {
          return (
            <Tooltip key={`${id}-${index}`} color={colors[index]} title={entry.x}>
              <Badge color={colors[index]} text={valueFormatter(entry.x, 5)} />
            </Tooltip>
          );
        })}
      </AnalyticToolLegend>
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
          <Text style={{ fontWeight: 700, fontSize: 14 }}>
            {`${axisData[0]?.property_type_name}(xAxis) : ${label}`}
          </Text>
          <Text style={{ fontWeight: 700, fontSize: 14 }}>
            {`${axisData[1]?.property_type_name}(yAxis): ${payload[0].value}`}
          </Text>
        </Flex>
      );
    }
    return null;
  };

  return (
    <Chart width={width} height={height} data={data} key={params.id}>
      <CartesianGrid strokeDasharray="10 10" />
      <YAxis
        dataKey="y"
        interval={1}
        tick={(e) => {
          const tickValue = e.payload?.value;
          return (
            <text x={e.x - 10} y={e.y} dy={4} textAnchor="end" fill={colors[e.index]} style={{ fontSize: 12 }}>
              {tickValue}
            </text>
          );
        }}
      />
      <XAxis
        dataKey="x"
        interval={0}
        tick={(e) => {
          const tickValue = valueFormatter(e.payload?.value, 5);
          return (
            <text
              transform={`rotate(-45, ${e.x}, ${e.y})`}
              x={e.x}
              y={e.y}
              dy={16}
              textAnchor="middle"
              fill={colors[e.index]}
              style={{ fontSize: 12 }}
            >
              {tickValue}
            </text>
          );
        }}
      />
      <ChartTooltip content={<CustomTooltip axisData={axisData} />} />
      {legend && (
        <Legend
          content={<CustomLegend id={id} height={height} legendData={data} colors={colors} />}
          layout="vertical"
          align="right"
          verticalAlign="top"
        />
      )}
      <Bar dataKey="y" width={AXIS_SIZE}>
        <LabelList
          fontSize={12}
          dataKey="y"
          position="middle"
          offset={30}
          angle={-90}
          formatter={(value: string) => valueFormatter(value, 15)}
          fill={COLORS.PRIMARY.WHITE}
        />
        {data.map((entry: TDataItem, index: number) => (
          <Cell key={`cell-${index}`} width={AXIS_SIZE} fill={colors[index]} style={{ transition: 'all 0.3s ease' }} />
        ))}
      </Bar>
    </Chart>
  );
};
