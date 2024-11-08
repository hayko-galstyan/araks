import React, { useEffect } from 'react';
import { initGraphPreview } from 'components/layouts/components/schema/container/initial/graph';
import { useSchema } from 'components/layouts/components/schema/wrapper';
import { useIsTemplateEditPage } from './use-is-template-page';

type GraphRef = React.MutableRefObject<HTMLDivElement | null>;

export const useSchemaPreviewRef = () => {
  const { graph_preview, setGraphPreview, ...params } = useSchema() ?? {};
  const isTemplateEditPage = useIsTemplateEditPage();

  const ref: GraphRef = React.useRef(null);

  useEffect(() => {
    if (graph_preview === undefined && setGraphPreview !== undefined) {
      setGraphPreview(initGraphPreview(isTemplateEditPage, ref.current as HTMLDivElement, params));
    }
  }, [graph_preview, isTemplateEditPage, params, setGraphPreview]);

  return ref;
};
