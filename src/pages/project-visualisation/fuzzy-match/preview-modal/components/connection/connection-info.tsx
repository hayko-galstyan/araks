import React, { useState } from 'react';
import styled from 'styled-components';
import { Col, Collapse, Row, Space } from 'antd';
import { SecondaryText, Text } from 'components/typography';
import { useGraph } from 'components/layouts/components/visualisation/wrapper';
import { COLORS } from 'helpers/constants';
import { ConnectionHeader } from './connection-header';
import { ReactComponent as CaretSvg } from '../icons/caret.svg';
import { PaginationComponent } from '../paginaton';
import { ConnectionPropertyItem } from './connection-property-item';

const Wrapper = styled.div`
  width: 100%;
  height: 4rem;
  background: linear-gradient(90deg, rgba(255, 255, 255, 0.7) 1.63%, rgba(255, 255, 255, 0.2) 100%);

  .connection {
    display: flex;
    align-items: center;
    height: 100%;
    margin-left: 2rem;
  }

  .ant-collapse {
    height: calc(100vh - 27rem);
    overflow: auto;

    .ant-collapse-header {
      z-index: 1;
      padding: 0 !important;
      height: 4rem;
      align-items: center !important;
    }

    .ant-collapse-item {
      background: #f2f2f2;
      border-bottom: 1px solid #dbdbdb;
    }

    .ant-collapse-content-box {
      gap: 1rem;
      display: flex;
      flex-direction: column;
      background: #cacdd7;
    }

    .ant-collapse-expand-icon {
      position: absolute;
      padding-inline-end: 0 !important;
      margin-inline-start: 14px !important;
    }
  }
`;

const ListRow = styled(Row)`
  display: flex;
  align-items: center;

  .ant-col:first-child {
    padding: 0 3rem;
  }

  .ant-col:last-child {
    padding: 0 1rem;
  }
`;

export const ConnectionInfo: React.FC = () => {
  const { fuzzyData } = useGraph() || {};
  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const paginatedItems = fuzzyData?.slice(startIndex, endIndex)?.map((f, i) => ({
    key: i + startIndex,
    label: (
      <ListRow>
        <Col span={10}>
          <SecondaryText color={COLORS.PRIMARY.BLUE}>{f.source.node_name}</SecondaryText>
        </Col>
        <Col offset={4} span={10}>
          <SecondaryText color={COLORS.PRIMARY.BLUE}>{f.target.node_name}</SecondaryText>
        </Col>
      </ListRow>
    ),
    children: (
      <ConnectionPropertyItem
        key={i + startIndex}
        sourceProperties={f.source.match_property}
        targetProperties={f.target.match_property}
      />
    ),
  }));

  const totalItems = fuzzyData?.length || 0;

  const onPageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <Wrapper>
      <ConnectionHeader />
      {totalItems > 0 ? (
        <>
          <Collapse
            items={paginatedItems}
            defaultActiveKey={[`${startIndex}`]}
            expandIcon={({ isActive }) => (
              <CaretSvg
                rotate={isActive ? 90 : 0}
                style={{
                  rotate: isActive ? '90deg' : '0deg',
                  transition: 'all 0.3s,visibility 0s',
                  color: COLORS.PRIMARY.GRAY,
                }}
              />
            )}
          />
          <PaginationComponent
            currentPage={currentPage}
            itemsPerPage={itemsPerPage}
            totalItems={totalItems}
            onPageChange={onPageChange}
          />
        </>
      ) : (
        <Space style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
          <Text>There is no matched data</Text>
        </Space>
      )}
    </Wrapper>
  );
};
