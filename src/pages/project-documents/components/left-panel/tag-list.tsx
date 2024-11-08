import { useCallback, useEffect, useState } from 'react';
import { Divider, List, Space, Spin, Tooltip } from 'antd';
import { useDocument } from 'components/layouts/components/document/wrapper';
import styled from 'styled-components';
import { SecondaryText, Text } from 'components/typography';
import { getFileIcon } from '../utils';
import { useGetSimilarTag } from 'api/document-repositories/use-get-similar-tag';
import { IDocumentTagResponse, IKeyword } from 'api/types';
import { useDocumentSimulation } from '../hooks/use-get-simulation';
import { LoadingOutlined } from '@ant-design/icons';
import { useGetExpandTags } from 'api/document-repositories/use-get-expand-tags';
import { COLORS } from 'helpers/constants';

const Item = styled(List.Item)`
  cursor: pointer;
  padding: 12px !important;
`;

const ListMeta = styled(List.Item.Meta)`
  .ant-list-item-meta-content {
    flex-basis: max-content !important;
  }

  .ant-list-item-meta-description {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    width: 200px;
  }
`;

const ListItem = styled(List.Item)<{ selected: boolean }>`
  cursor: pointer;
  padding: 12px !important;
  background: ${({ selected }) => (selected ? 'rgba(104, 119, 196, 0.29)' : 'transparent')};

  :hover {
    opacity: 0.8;
    background: rgba(104, 119, 196, 0.29);
  }
`;

const AllTagSpace = styled(Space)<{ selected: boolean }>`
  cursor: pointer;
  padding: 12px !important;
  display: flex;
  align-items: center;
  gap: 8px;
  justify-content: space-between;
  background: ${({ selected }) => (selected ? 'rgba(104, 119, 196, 0.29)' : 'transparent')};

  div:last-child {
    padding-right: 8px;
  }

  :hover {
    opacity: 0.8;
    background: rgba(104, 119, 196, 0.29);
  }
`;

export const TagList = () => {
  const { mutate: mutateExpand } = useGetExpandTags();
  const {
    similarDocument: { document_name, url },
    setShowDocumentDrawer,
    setSimilarDocumentList,
  } = useDocument() ?? {};
  const [similarDocuments, setSimilarDocuments] = useState<IDocumentTagResponse>();
  const [selectedTag, setSelectedTag] = useState<string | undefined>('All');

  const { mutate } = useGetSimilarTag();

  const { temp, isLoading } = useDocumentSimulation<IKeyword>({
    data: similarDocuments?.keywords ?? [],
  });

  const onSuccessExpand = useCallback(
    (data: IDocumentTagResponse) => {
      setSimilarDocumentList({
        documents: data.data,
        count: data.data.length,
      });
    },
    [setSimilarDocumentList]
  );

  const onSuccess = useCallback(
    (data: IDocumentTagResponse) => {
      setSimilarDocuments(data);
      onSuccessExpand(data);
    },
    [onSuccessExpand]
  );

  const handleExpandTag = (name?: string) => mutateExpand({ url, keyword: name ?? '' }, { onSuccess: onSuccessExpand });

  const handleExpandAllTag = () => mutate({ url }, { onSuccess: onSuccessExpand });

  useEffect(() => {
    mutate({ url }, { onSuccess });
  }, [mutate, onSuccess, setSimilarDocumentList, url]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div style={{ display: 'flex', flexDirection: 'column', height: '500px' }}>
        <Divider style={{ margin: '0' }} />
        <Item
          onClick={() => {
            setShowDocumentDrawer({
              url,
              name: document_name,
            });
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div style={{ height: '32px', display: 'flex', gap: '10px' }}>
              <div style={{ width: '32px', height: '32px', display: 'flex' }}>{getFileIcon(url, 32)}</div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <SecondaryText style={{ color: '#252D68', fontWeight: 600 }}>{document_name}</SecondaryText>
              </div>
            </div>
          </div>
        </Item>
        <Divider style={{ margin: '0' }} />
        <AllTagSpace
          selected={selectedTag === 'All'}
          onClick={() => {
            setSelectedTag('All');
            handleExpandAllTag();
          }}
        >
          <div style={{ display: 'flex', gap: '1rem' }}>
            <Text>All</Text>
          </div>
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <SecondaryText style={{ color: '#252D68', fontWeight: 600 }}>
              {similarDocuments?.all_doc_count}
            </SecondaryText>
          </div>
        </AllTagSpace>
        <List
          style={{
            height: 'calc(100vh - 330px)',
            overflow: 'auto',
          }}
          dataSource={temp}
          renderItem={(item: IKeyword | undefined, index) => (
            <>
              <ListItem
                selected={selectedTag === item?.name}
                onClick={() => {
                  setSelectedTag(item?.name);
                  handleExpandTag(item?.name);
                }}
                actions={[
                  <div key={index}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <SecondaryText style={{ color: '#252D68', fontWeight: 600 }}>
                        {item?.count ? Math.floor(item?.count ?? 0) : undefined}
                      </SecondaryText>
                    </div>
                  </div>,
                ]}
              >
                <ListMeta
                  style={{ paddingLeft: '18px' }}
                  description={
                    <Tooltip overlayClassName="action-tooltip" title={item?.name} arrow={false} placement="top">
                      <Text style={{ color: item?.taxonomy?.length ? COLORS.SECONDARY.GREEN : '#424242' }}>
                        {item?.name}
                      </Text>
                    </Tooltip>
                  }
                />
              </ListItem>
              {index === temp?.length - 1 && <Spin spinning={isLoading} indicator={<LoadingOutlined spin />} />}
            </>
          )}
        />
      </div>
    </div>
  );
};
