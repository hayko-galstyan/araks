import { Button as Component } from 'antd';
import { MenuText } from 'components/typography';
import { FC, useState } from 'react';
import styled from 'styled-components';
import { DocumentInfo } from './document-info';
import { IDocumentResponse } from 'api/types';
import { getFileIcon } from '../../utils';
import dayjs from 'dayjs';
import { SimilarDocs } from '../similar-docs';
import { useDocument } from 'components/layouts/components/document/wrapper';

type DocumentViewProps = FC<IDocumentResponse>;

const StyledButton = styled(({ isHover, ...props }) => <Component {...props} />)`
  &.ant-btn-default {
    background: transparent !important;
    line-height: 22px;
    width: 210px;
    height: 288px;
    padding: 0;
    display: flex;
    align-items: flex-start;
    justify-content: center;
    border: none !important;

    .image-title {
      background: white;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 210px;
      border: 1px solid #848aaa;
      height: 200px;
      border-radius: 2px;
    }

    .document-description {
      padding-top: 14px;
    }
  }
`;

const DocumentContainer = styled.div`
  position: absolute;
  width: 96%;
  top: 9rem;
  display: flex;
  align-self: center;
  justify-content: center;

  .similar-document-wrapper {
    justify-content: space-evenly;
    height: 52px;
  }
`;

export const DocumentViewInfo: DocumentViewProps = ({ url, document_name, node_name, created_at }) => {
  const [isHover, setIsHover] = useState(false);
  const { setShowDocumentDrawer } = useDocument();

  return (
    <StyledButton isHover={isHover}>
      <div
        onMouseOver={() => setIsHover(true)}
        onMouseLeave={() => setIsHover(false)}
        style={{ display: 'flex', flexDirection: 'column' }}
      >
        <div style={{ paddingBottom: '6px', display: 'flex', flexDirection: 'column' }}>
          <div
            className="image-title"
            onClick={() => {
              setShowDocumentDrawer({ url, name: document_name });
            }}
          >
            {getFileIcon(document_name)}
          </div>
          {isHover && (
            <DocumentContainer>
              <SimilarDocs url={url} document_name={document_name} />
            </DocumentContainer>
          )}
          <div
            className="document-description"
            style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}
          >
            <DocumentInfo ext={document_name} title={node_name} />
            <MenuText>{dayjs(created_at).format('DD MM YYYY')}</MenuText>
          </div>
        </div>
      </div>
    </StyledButton>
  );
};
