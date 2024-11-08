import { getFileExtension, getFileIcon } from '../../utils';
import { VARIABLES } from 'helpers/constants';
import { LongTitle, SecondaryText, Text } from 'components/typography';
import dayjs from 'dayjs';
import { SimilarDocs } from '../similar-docs';
import { ISimilarDocument } from 'components/layouts/components/document/types';
import { UploadedFileType } from 'types/node';

export const list_columns = (handleDocumentNameClick: (record: UploadedFileType) => void) => [
  {
    title: 'File Name',
    dataIndex: 'document_name',
    key: 'document_name',
    sorter: true,
    propertyId: 'document_name',
    showSorterTooltip: false,
    render: (document_name: string, { url }: { url: string }) => (
      <div className="document-name-cell" onClick={() => handleDocumentNameClick({ url, name: document_name })}>
        <div className="file-icon">{getFileIcon(document_name)}</div>
        <SecondaryText className="document-name-text">
          {document_name.length > VARIABLES.MAX_PROJECT_TITLE_LENGTH ? (
            <LongTitle name={document_name} />
          ) : (
            <Text>{document_name}</Text>
          )}
        </SecondaryText>
      </div>
    ),
  },
  {
    title: 'Node Name',
    dataIndex: 'node_name',
    key: 'node_name',
    render: (name: string) => <SecondaryText>{name}</SecondaryText>,
  },
  {
    title: 'Type Name',
    width: 150,
    dataIndex: 'document_name',
    key: 'document_name',
    render: (document_name: string) => <SecondaryText>{getFileExtension(document_name)}</SecondaryText>,
  },
  {
    title: 'Created Date',
    dataIndex: 'created_at',
    key: 'created_at',
    render: (created_at: string) => <SecondaryText>{dayjs(created_at).format('DD MM YYYY')}</SecondaryText>,
  },
  {
    title: '',
    dataIndex: 'similar',
    key: 'similar',
    render: (_: string, { url, document_name }: ISimilarDocument) => (
      <div className="similar-docs-cell">
        <SimilarDocs url={url} document_name={document_name} />
      </div>
    ),
  },
];
