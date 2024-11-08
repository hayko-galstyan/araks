import React from 'react';
import { Col, Row } from 'antd';
import { ReactComponent as SourceSvg } from 'components/icons/source.svg';
import { SearchInput } from 'components/input/search-input';
import { Text } from 'components/typography';

export const SourceFilter: React.FC<{
  onOpen: (value: boolean) => void;
  onSearch: (value: string) => void;
  result: number;
}> = ({ onOpen, onSearch, result }) => {
  return (
    <Row justify="space-between" style={{ marginBottom: '18px' }}>
      <Col span={16}>
        <Row gutter={24}>
          <Col span={14}>
            <SearchInput setIsValue={onSearch} />
          </Col>
          {!!result && (
            <Col span={8}>
              <Text style={{ fontWeight: 600, fontSize: '18px' }}>{result} results</Text>
            </Col>
          )}
        </Row>
      </Col>
      <Col span={4}>
        <Row justify="end">
          <SourceSvg style={{ cursor: 'pointer' }} onClick={() => onOpen(false)} />
        </Row>
      </Col>
    </Row>
  );
};
