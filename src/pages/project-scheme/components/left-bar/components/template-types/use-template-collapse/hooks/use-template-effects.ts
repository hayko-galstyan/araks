/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react';
import { useSchema } from 'components/layouts/components/schema/wrapper';
import { initNodes } from 'components/layouts/components/schema/container/initial/nodes';
import { animateGraphFit } from 'components/layouts/components/schema/helpers/utils';
import { UserProjectRole } from 'api/types';
import { formattedTypes } from 'components/layouts/components/schema/helpers/format-type';
import { ITemplate } from 'api/project-templates/use-get-template-types';
import { Graph } from '@antv/x6';
import { PickSchemaContextType } from 'components/layouts/components/schema/types';
import { ProjectEdgeResponse } from 'types/project-edge';

export const useTemplateEffects = (
  isTemplateEditPage: boolean,
  template: ITemplate,
  graph_preview: Graph,
  params: PickSchemaContextType
) => {
  const { setNodes, setEdges, view_template, setTemplatePreviewData } = useSchema();

  const edges = template?.edges as ProjectEdgeResponse[];

  useEffect(() => {
    if ((isTemplateEditPage || view_template?.isOpened) && template && graph_preview) {
      setNodes(template.nodes);
      setEdges(edges);

      initNodes(
        graph_preview,
        formattedTypes(graph_preview, template.nodes, edges, { role: UserProjectRole.Owner }),
        params
      );
    }
  }, [view_template?.isOpened, graph_preview, template]);

  useEffect(() => {
    if (template) {
      setTemplatePreviewData({
        id: template.id,
        title: template.name,
        description: template.description,
        icon: template.screenshot,
        privacy: template.privacy,
      });
    }
  }, [template]);

  useEffect(() => {
    if (graph_preview?.zoomToFit) {
      animateGraphFit(graph_preview, '0.4s');
      graph_preview.zoomToFit({ padding: 10, maxScale: 1 });
    }
  }, [template?.id]);
};
