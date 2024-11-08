import { Header } from './header';
import { DocumentList } from './document-list';
import { ModeTypes, useMode } from 'context/document-mode-context';
import styled from 'styled-components';
import { RepositoryViewInfo } from 'components/drawer/repository-view-drawer';

const PanelWrapper = styled.div<{ isVisualization: boolean }>`
  display: flex;
  flex-direction: column;
  padding: ${(props) => (props.isVisualization ? 0 : '2rem')};
`;

export const RightSection = () => {
  const { state } = useMode();

  return (
    <PanelWrapper className="document-table" isVisualization={state === ModeTypes.Visualization}>
      <Header />
      <DocumentList />
      <RepositoryViewInfo />
    </PanelWrapper>
  );
};
