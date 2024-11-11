import React, { useMemo } from 'react';
import { DraggingContainer } from '../dragging';
import { useAnalytics } from 'context/analytics';
import { LineChart } from './line-chart';
import { BarChart } from './bar-chart';
import { PieChart } from './pie-chart';
import { TChart } from '../types';
import { AnalyticToolType } from 'helpers/constants';
import { getCurrentChartSize } from '../util';

const { LINE, BAR, PIE } = AnalyticToolType;

export const Charts: React.FC<TChart> = ({ id }) => {
  const { tools, activeBoard } = useAnalytics();

  const boardTools = tools[activeBoard];

  const widthChart = useMemo(() => {
    return Math.max(getCurrentChartSize(boardTools[id].width, boardTools[id].data.length), 200);
  }, [boardTools, id]);

  const getContentChart = (): React.ReactNode => {
    switch (boardTools[id].type) {
      case LINE:
        return (
          <LineChart
            key={`line-${id}-chart`}
            width={widthChart}
            height={boardTools[id].height}
            params={boardTools[id]}
          />
        );
      case BAR:
        return (
          <BarChart key={`bar-${id}-chart`} width={widthChart} height={boardTools[id].height} params={boardTools[id]} />
        );
      case PIE:
        return (
          <PieChart
            key={`pie-${id}-chart`}
            width={boardTools[id].width}
            height={boardTools[id].height}
            params={boardTools[id]}
          />
        );
      default:
        return null;
    }
  };

  return <DraggingContainer containerKey={id}>{getContentChart() || null}</DraggingContainer>;
};
