import React from 'react';
import { useGraphRef } from 'hooks/use-graph';
import { Wrapper } from './wrapper';
import { useGetData } from 'api/visualisation/use-get-data';
import { Spin } from 'antd';
interface Props {
  callpased?: number;
}

export const Graph: React.FC<Props> = ({ callpased }) => {
  const { nodes, edges, count, relationsCounts, isInitialLoading } = useGetData();
  const ref = useGraphRef({ nodes, edges, count, relationsCounts, callpased });

  return (
    <Spin style={{ maxHeight: '100%' }} spinning={isInitialLoading}>
      <Wrapper isExpanded={callpased} ref={ref} />
    </Spin>
  );
};
