import { SecondaryText } from 'components/typography';
import { ReactComponent as SimilarDocsSVG } from '../icons/similar-docs.svg';
import { ReactComponent as SimilarDocs1SVG } from '../icons/similar-docs1.svg';
import { useDocument } from 'components/layouts/components/document/wrapper';
import { ISimilarDocument } from 'components/layouts/components/document/types';
import styled from 'styled-components';
import { ModeTypes, useMode } from 'context/document-mode-context';

const SimilarDocsWrapper = styled.div`
  height: 45px;
  justify-content: center;
  width: 100%;
  background: #ced2de;
  border-radius: 5px;
  display: flex;
  align-items: center;
  border: 1px solid #ffffff;

  ․ant-typography {
    font-size: 15px;
    font-weight: 700;
    line-height: 19.14px;
    letter-spacing: 0.07em;
    text-align: left;
    color: #232f6a;
  }
`;

export const SimilarDocs = ({ ...params }: ISimilarDocument) => {
  const { setSimilarDocument } = useDocument() ?? {};
  const { state } = useMode();

  return (
    <SimilarDocsWrapper
      className="similar-document-wrapper"
      onClick={() => {
        setSimilarDocument({ ...params });
      }}
    >
      <div style={{ width: '50px' }}>{state === ModeTypes.List ? <SimilarDocsSVG /> : <SimilarDocs1SVG />}</div>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'start' }}>
        <SecondaryText>Find Similar</SecondaryText>
        <SecondaryText>Documents</SecondaryText>
      </div>
    </SimilarDocsWrapper>
  );
};
