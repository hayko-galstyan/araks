import styled from 'styled-components';
import 'components/layouts/components/schema/container/register';
import { useSchemaPreviewRef } from 'hooks/use-preview-schema';

const Graph = styled.div`
  position: relative;
  width: 100%;
  z-index: 0;
`;

export const PreviewSchema = () => {
  return <Graph ref={useSchemaPreviewRef()} />;
};
