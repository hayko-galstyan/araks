import { FC, useCallback, useEffect } from 'react';
import styled from 'styled-components';
import { Graph } from '@antv/x6';
import { useSchemaRef } from 'hooks/use-schema';
import { Toolbar } from 'components/tool-bar';
import { useTypes } from 'hooks/use-types';
import { useSchema } from 'components/layouts/components/schema/wrapper';
import { initNodes } from 'components/layouts/components/schema/container/initial/nodes';
import { formattedTypes } from 'components/layouts/components/schema/helpers/format-type';
import { useProject } from 'context/project-context';
import { animateGraphFit, switchTypePermission } from 'components/layouts/components/schema/helpers/utils';
import { SaveTemplate } from './save-template';
import { initTemplateEvents } from 'components/layouts/components/schema/container/initial/events';

interface MainProps {
  graph?: Graph;
  step: number | undefined;
}

const GraphWrapper = styled.div`
  position: fixed;
  z-index: 0;
`;

const Wrapper = styled.div`
  height: 100%;
`;

export const Main: FC<MainProps> = ({ step }) => {
  useTypes();
  const { projectInfo } = useProject();
  const { graph, nodes, edges, ...params } = useSchema();

  useEffect(() => {
    if (graph) {
      const graphNodes = graph.getNodes();
      graphNodes.forEach((n) => {
        switchTypePermission(n, false);
      });
    }
  }, [graph]);

  const zoomAndFit = useCallback(() => {
    animateGraphFit(graph, '0.4s');
    graph.zoomToFit({ padding: 10, maxScale: 1 });
  }, [graph]);

  useEffect(() => {
    const handleStepChange = () => {
      if (!graph || !nodes || !edges) return;

      switch (step) {
        case 0:
          initNodes(graph, formattedTypes(graph, nodes, edges, projectInfo), params);
          initTemplateEvents(graph);
          break;
        case 1:
          graph.resize(window.innerWidth, window.innerHeight - 152);
          graph.removeCells(graph.getNodes().filter((n) => !n.attrs?.body.allow));
          graph.getNodes().forEach((n) => {
            n.removeAttrByPath('eye');

            /** Enable node dragging by setting pointer-events to none */
            const nodeView = graph.findViewByCell(n);
            if (nodeView) {
              const nodeElement = nodeView.container as HTMLElement;
              nodeElement.style.pointerEvents = 'auto';
            }
          });
          graph.off('node:click');
          zoomAndFit();
          graph.enableMouseWheel();
          graph.enablePanning();
          break;
        case 2:
          graph.resize(window.innerWidth - 600, graph.options.height);
          graph.disableMouseWheel();
          graph.disablePanning();

          zoomAndFit();

          /** Disable node dragging by setting pointer-events to none */
          graph.getNodes().forEach((node) => {
            const nodeView = graph.findViewByCell(node);
            if (nodeView) {
              const nodeElement = nodeView.container as HTMLElement;
              nodeElement.style.pointerEvents = 'none';
            }
          });
          break;
        default:
          break;
      }
    };

    handleStepChange();
  }, [step, graph, nodes, edges, params, projectInfo, zoomAndFit]);

  return (
    <Wrapper>
      <GraphWrapper style={{ top: '200px' }} ref={useSchemaRef()} />
      <Toolbar position="right" isTemplate={true} />
      {step === 2 && <SaveTemplate />}
    </Wrapper>
  );
};
