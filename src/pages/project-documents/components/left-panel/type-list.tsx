import { Space, List } from 'antd';
import styled from 'styled-components';
import { ReactComponent as FolderSvg } from 'components/icons/folder.svg';
import { ReactComponent as DocumentSvg } from 'components/icons/document.svg';

import { SecondaryText, Text } from 'components/typography';
import { LeftPanelProps } from 'types/document-repository';
import { useMemo } from 'react';
import { useDocument } from 'components/layouts/components/document/wrapper';

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

const ListItem = styled(List.Item)`
  cursor: pointer;
  padding: 12px !important;

  :hover {
    opacity: 0.8;
    background: rgba(104, 119, 196, 0.29);
  }
`;

const AllTypeFlex = styled(Space)`
  cursor: pointer;
  padding: 12px !important;
  display: flex;
  align-items: center;
  gap: 8px;
  justify-content: space-between;

  div:last-child {
    padding-right: 8px;
  }

  :hover {
    opacity: 0.8;
    background: rgba(104, 119, 196, 0.29);
  }
`;

export const TypeList: LeftPanelProps = ({ list }) => {
  const count = useMemo(() => list?.reduce((acc, item) => acc + +item.count, 0), [list]);
  const { setSelectedType, selectedType, setSearchDocument } = useDocument() ?? {};

  return (
    <div style={{ display: 'flex', gap: '24px', flexDirection: 'column' }}>
      {count ? <div>Node Types:</div> : <></>}
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        {count ? (
          <AllTypeFlex
            style={{ background: selectedType ? '' : 'rgba(104, 119, 196, 0.29)' }}
            onClick={() => {
              setSearchDocument(undefined);
              setSelectedType(undefined);
            }}
          >
            <div style={{ display: 'flex', gap: '1rem' }}>
              <FolderSvg />
              <Text>All</Text>
            </div>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <SecondaryText style={{ color: '#252D68', fontWeight: 600 }}>{count}</SecondaryText>
              <DocumentSvg />
            </div>
          </AllTypeFlex>
        ) : (
          <></>
        )}
        <List
          style={{
            height: 'calc(100vh - 330px)',
            overflow: 'auto',
          }}
          dataSource={list}
          renderItem={(item, index) => (
            <ListItem
              style={{ background: item.id === selectedType ? 'rgba(104, 119, 196, 0.29)' : '' }}
              actions={[
                <div key={index}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginRight: '10px' }}>
                    <SecondaryText style={{ color: '#252D68', fontWeight: 600 }}>{item.count}</SecondaryText>
                    <DocumentSvg />
                  </div>
                </div>,
              ]}
              onClick={() => {
                setSearchDocument(undefined);
                setSelectedType(`${item.id}`);
              }}
            >
              <ListMeta
                style={{ paddingLeft: '18px' }}
                avatar={<FolderSvg />}
                description={<Text title={item.name}>{item.name}</Text>}
              />
            </ListItem>
          )}
        />
      </div>
    </div>
  );
};
