import { useEffect, useState } from 'react';
import { Button } from 'antd';
import { useGraph } from 'components/layouts/components/visualisation/wrapper';
import { ReactComponent as ResetSvg } from './icons/reset.svg';
import { useGetData } from 'api/visualisation/use-get-data';
import { formattedData } from 'components/layouts/components/visualisation/helpers/format-node';
import { initData } from 'components/layouts/components/visualisation/container/initial/nodes';
import { UserProjectRole } from 'api/types';
import { useProject } from 'context/project-context';
import { NODE_LIMIT } from 'helpers/constants';
import { graphRender } from '../../../../components/layouts/components/visualisation/helpers/utils';
import { ReactComponent as ConcentricSvg } from './icons/concentric.svg';
import { ControlsWrapper } from './style';

export const ControlsComponent = () => {
  const { graph, setGraphInfo, startFuzzyModal } = useGraph() || {};
  const { projectInfo } = useProject();
  const [isReseat, setIsReseat] = useState(false);

  const { nodes, edges, count, relationsCounts } = useGetData({
    enabled: isReseat,
  });

  useEffect(() => {
    if (isReseat) {
      const data = formattedData(nodes ?? [], edges ?? [], relationsCounts);
      if (data !== undefined) initData(graph, data);
      setGraphInfo({
        nodeCount: (count ?? 0) > NODE_LIMIT ? NODE_LIMIT : count,
      });

      graphRender(graph);

      setIsReseat(false);
    }
  }, [count, edges, graph, isReseat, nodes, setGraphInfo, relationsCounts]);

  return (
    <ControlsWrapper>
      {projectInfo?.role === UserProjectRole.Owner && (
        <Button
          icon={<ConcentricSvg />}
          onClick={() => {
            startFuzzyModal({
              isOpened: true,
            });
          }}
        >
          Fuzzy Match
        </Button>
      )}
      <Button
        className="reset"
        icon={<ResetSvg  className='reset-icon'/>}
        onClick={() => {
          setIsReseat(true);
        }}
      >
        Reset
      </Button>
    </ControlsWrapper>
  );
};
