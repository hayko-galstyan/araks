import { ReactComponent as RepositorySvg } from 'components/icons/repository.svg';

import { SecondaryText } from 'components/typography';
import { LeftPanelProps } from 'types/document-repository';
import { TypeList } from './type-list';
import { useDocument } from 'components/layouts/components/document/wrapper';
import { TagList } from './tag-list';
import { ReactComponent as BackSvg } from 'components/icons/back.svg';

export const LeftPanel: LeftPanelProps = ({ list }) => {
  const { similarDocument, setSimilarDocument, setSimilarDocumentList } = useDocument() ?? {};

  return (
    <div
      className="document-list"
      style={{ display: 'flex', flexDirection: 'column', gap: '24px', height: 'calc(100vh - 152px)' }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          cursor: similarDocument ? 'pointer' : 'initial',
        }}
        onClick={() => {
          setSimilarDocument(undefined);
          setSimilarDocumentList(undefined);
        }}
      >
        {similarDocument && (
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <BackSvg />
          </div>
        )}
        <RepositorySvg />
        <SecondaryText style={{ color: '#252D68', fontWeight: 600 }}>Document repository</SecondaryText>
      </div>
      {similarDocument ? <TagList /> : <TypeList list={list} />}
    </div>
  );
};
