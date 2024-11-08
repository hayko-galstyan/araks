import React from 'react';
import {
  LineChart as Chart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as ChartTooltip,
  Legend,
  LabelList,
  TooltipProps,
} from 'recharts';
import { AnyObject } from 'antd/es/_util/type';
import { Badge, Flex, Tooltip } from 'antd';
import { Text } from 'components/typography';
import { TChartParams } from '../types';
import { ANALYTICS, COLORS } from 'helpers/constants';
import { AnalyticToolLegend } from '../styles';
import { valueFormatter } from '../util';

const { AXIS_SIZE } = ANALYTICS;

const CustomLabel = (props: AnyObject) => {
  const { x, y, value, color } = props;
  const labelValue = valueFormatter(value, 15);
  return (
    <text x={x} y={y} dy={-20} fill={color} fontSize={16} fontWeight={700} textAnchor="middle">
      {labelValue}
    </text>
  );
};

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
      <Flex vertical gap={12} style={{ padding: 10, borderRadius: 5, background: COLORS.PRIMARY.WHITE }}>
        <Text style={{ fontWeight: 300, fontSize: 14 }}>{`${axisData[0]?.property_type_name}(xAxis) : ${label}`}</Text>
        <Text
          style={{ fontWeight: 300, fontSize: 14 }}
        >{`${axisData[1]?.property_type_name}(yAxis): ${payload[0].value}`}</Text>
      </Flex>
    );
  }

  return null;
};

export const LineChart: React.FC<TChartParams> = ({ width, height, params }) => {
  const { data, params: axisData, color, colors, legend, id } = params;

  return (
    <Chart
      width={width}
      height={height}
      data={data}
      margin={{
        top: 5,
        bottom: 40,
        right: 30,
      }}
      key={params.id}
    >
      <CartesianGrid strokeDasharray={`${data.length} ${data.length}`} />
      <XAxis
        dataKey="x"
        padding={{ left: 30 }}
        interval={0}
        tick={(e) => {
          const tickValue = valueFormatter(e.payload?.value, 5);
          return (
            <text
              x={e.x}
              y={e.y}
              dy={16}
              transform={`rotate(-45, ${e.x}, ${e.y})`}
              textAnchor="end"
              fill={colors[e.index]}
              style={{ fontSize: 12 }}
            >
              {tickValue}
            </text>
          );
        }}
      />
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

      <ChartTooltip content={<CustomTooltip axisData={axisData} />} />
      {legend && (
        <Legend
          content={<CustomLegend height={height} legendData={data} colors={colors} id={id} />}
          layout="vertical"
          align="right"
          verticalAlign="top"
        />
      )}
      <Line
        strokeWidth={2}
        type="monotone"
        dataKey="y"
        width={AXIS_SIZE}
        markerHeight={15}
        stroke={color}
        activeDot={{ r: 1 }}
      >
        <LabelList content={<CustomLabel color={color} />} />
      </Line>
    </Chart>
  );
};
