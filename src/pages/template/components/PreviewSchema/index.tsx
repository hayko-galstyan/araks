import styled from 'styled-components';
import 'components/layouts/components/schema/container/register';
import { useTemplateSchemaRef } from './useTemplateSchemaRef';

const Graph = styled.div`
  position: fixed;
  z-index: 0;
  width:'100%';

`;
type Props ={
    id:string
}

export const PreviewSchema = ({id}:Props) => {
  return <Graph  ref={useTemplateSchemaRef({id:id})} />;
};
