/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import { initData } from '../components/layouts/components/visualisation/container/initial/nodes';
import { useProject } from '../context/project-context';
import { graphRender } from '../components/layouts/components/visualisation/helpers/utils';
import { useDocument } from '../components/layouts/components/document/wrapper';
import { initDocumentGraph } from '../pages/project-documents/components/right-panel/graph/init-graph';
import { formattedDocumentData } from '../pages/project-documents/components/right-panel/graph/formated-data';
import { DocumentNodes } from '../api/document-repositories/use-get-document-graph';
type GraphRef = React.MutableRefObject<HTMLDivElement | null>;

type Props = ({ nodes, count }: { nodes: DocumentNodes | undefined; count: number }) => GraphRef;

export const useDocumentGraphRef: Props = ({ nodes, count }) => {
  const { projectInfo } = useProject();

  const { graph, setGraph, setShowDocumentDrawer } = useDocument() ?? {};

  const ref: GraphRef = React.useRef(null);

  useEffect(() => {
    if (graph === undefined && setGraph !== undefined && Object.hasOwn(projectInfo ?? {}, 'role')) {
      setGraph(initDocumentGraph(ref.current as HTMLDivElement, setShowDocumentDrawer));
    }

    if (graph !== undefined && nodes !== undefined) {
      const data = formattedDocumentData(nodes);

      if (data !== undefined) initData(graph, data);

      graphRender(graph);
    }
  }, [nodes, graph, setGraph, projectInfo, count]);

  return ref;
};
