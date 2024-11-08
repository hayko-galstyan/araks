import { COLORS } from 'helpers/constants';
import styled from 'styled-components';
import { CurrentNumber } from './currectNumber';
import { CardBox, CardText } from '../Styled';
interface Props {
  projectsCount: string;
  nodeCount: string;
  connectionCount: string;
  filesCount: string;
}

const Container = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-around;
  background-color: ${COLORS.PRIMARY.WHITE};
  gap: 40px;
  border-radius: 8px;
  padding: 20px;
  outline: none;
  margin-bottom: 40px;
`;

export const AdminProjectsCount = ({ projectsCount, nodeCount, connectionCount, filesCount }: Props) => {
  return (
    <Container>
      <CardBox backgroundColor="#232F6A80">
        <CurrentNumber value={+projectsCount} />
        <CardText>Project Count</CardText>
      </CardBox>

      <CardBox backgroundColor="#F5B452DE">
        <CurrentNumber value={+nodeCount} />
        <CardText>Node Count</CardText>
      </CardBox>

      <CardBox backgroundColor="#68C4D0D6">
        <CurrentNumber value={+connectionCount} />
        <CardText>Connection Count</CardText>
      </CardBox>

      <CardBox backgroundColor="#469DDCB0">
        <CurrentNumber value={+filesCount} />
        <CardText>Uploaded Files</CardText>
      </CardBox>
    </Container>
  );
};
