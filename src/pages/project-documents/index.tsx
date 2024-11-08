import styled from 'styled-components';
import { LeftPanel } from './components/left-panel/left-panel';
import { useGetDocumentTypes } from 'api/document-repositories/use-get-document-types';
import { RightSection } from './components/right-panel';
import { ModeProvider } from 'context/document-mode-context';

const DocumentRepository = styled.div`
  display: flex;

  .document-list {
    background: #f2f2f2;
    box-shadow: 10px 0 10px rgba(111, 111, 111, 0.1);
    width: 450px;
    padding-left: 2rem;
    padding-top: 1.5rem;
  }

  .document-table {
    width: 100%;
    display: flex;
    gap: 1rem;
  }

  .visualize-document-btn {
    background: transparent;
    font-size: 20px;
    border: none;

    path {
      fill: #232f6a;
    }
  }
`;

export const ProjectDocuments = () => {
  const { data } = useGetDocumentTypes();

  return (
    <DocumentRepository>
      <ModeProvider>
        <LeftPanel list={data} />
        <RightSection />
      </ModeProvider>
    </DocumentRepository>
  );
};
