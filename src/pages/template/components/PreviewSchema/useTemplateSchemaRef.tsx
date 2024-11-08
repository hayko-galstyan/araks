import React, { useEffect, useState } from 'react';
import { initGraphTemplateListPreview } from 'components/layouts/components/schema/container/initial/graph';
import { useGetTemplateById } from 'api/project-templates/use-get-template-by-id';
import { initTemplateListNodes } from 'components/layouts/components/schema/container/initial/nodes';
import { UserProjectRole } from 'api/types';
import { formattedTypes } from 'components/layouts/components/schema/helpers/format-type';
import { useIsTemplateEditPage } from 'hooks/use-is-template-page';
import { Graph } from '@antv/x6';
import { useSchema } from 'components/layouts/components/schema/wrapper';

type GraphRef = React.MutableRefObject<HTMLDivElement | null>;
type Props = {
  id: string;
};

export const useTemplateSchemaRef = ({ id }: Props) => {
  const isTemplateEditPage = useIsTemplateEditPage();
  const { data } = useGetTemplateById(id, {
    enabled: !!id,
  });

  const [graph, setGraph] = useState<Graph | undefined>(undefined);
  const {...params } = useSchema() ?? {};

  const ref: GraphRef = React.useRef(null);

  useEffect(() => {
    if (graph === undefined && setGraph !== undefined && ref.current !== null) {
      setGraph(initGraphTemplateListPreview(isTemplateEditPage, ref.current as HTMLDivElement, params));
    }

    if (graph !== undefined && data?.data.nodes) {
      initTemplateListNodes(
        graph,
        formattedTypes(graph, data?.data.nodes, data?.data.edges, { role: UserProjectRole.Owner })
      );
      graph.zoomToFit();
    }
  }, [data?.data.edges, data?.data.nodes, graph, isTemplateEditPage, params]);

  return ref;
};
