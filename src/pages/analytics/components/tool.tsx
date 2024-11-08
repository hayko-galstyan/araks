import React, { FC } from 'react';
import { Charts } from 'components/analytics/charts';
import { TextEditor } from 'components/analytics/text-editor';
import { AnalyticsTable } from 'components/analytics/table';
import { AnalyticTools } from 'helpers/constants';
import { Card } from 'components/analytics/card';

const ToolComponents: Record<AnalyticTools, FC<{ id: string }>> = {
  [AnalyticTools.CHART]: Charts,
  [AnalyticTools.TEXT]: TextEditor,
  [AnalyticTools.TABLE]: AnalyticsTable,
  [AnalyticTools.CARD]: Card,
};

type TRenderTool = {
  tool: AnalyticTools;
  id: string;
};

export const RenderTool: React.FC<TRenderTool> = ({ tool, id }) => {
  const ToolComponent = ToolComponents[tool];

  if (!ToolComponent) return null;

  return <ToolComponent id={id} />;
};
