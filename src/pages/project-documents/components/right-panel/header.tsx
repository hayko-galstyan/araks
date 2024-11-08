import { useDocument } from 'components/layouts/components/document/wrapper';
import styled from 'styled-components';
import { DocumentView } from './view';
import { ModeTypes, useMode } from 'context/document-mode-context';
import { SearchDocument } from '../search';

const HeaderFlexWrapper = styled.div<{ documentId: boolean }>`
  z-index: 1;
  display: flex;
  align-items: center;
  gap: 1rem;
  height: 40px;
  position: ${(props) => (props.documentId ? 'fixed' : 'initial')};
  right: 40px;
  top: 11.4rem;
  width: ${(props) => (props.documentId ? '120px' : '100%')};
`;

export const Header = () => {
  const { documentId, similarDocument } = useDocument() ?? {};
  const { state } = useMode();

  return (
    <HeaderFlexWrapper documentId={state === ModeTypes.Visualization}>
      <div
        style={{
          width: '100%',
          visibility: similarDocument ? 'hidden' : 'initial',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        {state !== ModeTypes.Visualization && !documentId && <SearchDocument />}
      </div>
      <div style={{ display: 'flex', justifyContent: 'end', alignItems: 'center' }}>
        <DocumentView />
      </div>
    </HeaderFlexWrapper>
  );
};
