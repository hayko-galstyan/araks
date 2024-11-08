import { Card, Col, Row, Image, Typography } from 'antd';
import { CheckboxChangeEvent } from 'antd/es/checkbox';
import { IDataExternalResourcesItem } from 'api/types';
import { Checkbox } from 'components/checkbox';
import { Text } from 'components/typography';
import React from 'react';
import { CardBody } from './styled';

const { Paragraph } = Typography;

type SourceCardProps = {
  data: IDataExternalResourcesItem;
  dataSource: IDataExternalResourcesItem[];
  searchText: string;
  onChangeCheckbox: (e: CheckboxChangeEvent) => void;
};

export const SourceCard: React.FC<SourceCardProps> = ({ data, dataSource, onChangeCheckbox, searchText }) => {
  const highlightText = (text: string) => {
    if (!searchText.trim() && searchText?.length > 3) {
      return text;
    }
    const regex = new RegExp(`(${searchText})`, 'gi');
    return text.replace(regex, '<span style="background:yellow">$1</span>');
  };

  const highlightedTitle = highlightText(data?.article?.title);
  const abstractText = highlightText(data?.article?.abstract);

  return (
    <Card key={data?.article?.article_id} style={{ marginTop: '16px', padding: '10px' }}>
      <CardBody>
        <Checkbox
          disabled={
            !dataSource?.find((el) => el.article.article_id === data?.article?.article_id)?.isChecked &&
            dataSource.length >= 10
          }
          value={data?.article?.article_id}
          onChange={onChangeCheckbox}
        />
        <div style={{ width: '100%' }}>
          <Row justify="space-between">
            <Col span={21} onClick={() => window.open(data?.article?.article_url)}>
              <div
                style={{ fontSize: '18px', fontWeight: 600 }}
                dangerouslySetInnerHTML={{
                  __html: highlightedTitle,
                }}
              />
            </Col>
            <Col span={2}>
              <Image
                onClick={() => window.open(data?.article?.article_url)}
                src="/pubmed-logo.png"
                width={80}
                height={30}
                preview={false}
              />
            </Col>
          </Row>
          <div style={{ marginTop: '10px', display: 'flex', flexDirection: 'column', gap: 6 }}>
            <Row>
              <Col span={4}>
                <Text style={{ fontWeight: 600, fontSize: '16px' }}>Publication Date: </Text>
              </Col>
              <Col span={4}>
                <Text style={{ fontWeight: 400, fontSize: '16px' }}>{data?.article?.pub_date}</Text>
              </Col>
            </Row>
            <Row>
              <Col span={4}>
                <Text style={{ fontWeight: 600, fontSize: '16px' }}>Author: </Text>
              </Col>
              <Col span={20}>
                <Text style={{ fontWeight: 400, fontSize: '16px' }}>
                  {data?.authors?.map((author) => author?.name.concat('', ','))}
                </Text>
              </Col>
            </Row>
            <Row>
              <Col span={4}>
                <Text style={{ fontWeight: 600, fontSize: '16px' }}>Keywords: </Text>
              </Col>
              <Col span={20}>
                <Text style={{ fontWeight: 400, fontSize: '16px' }}>
                  {data?.keywords ? data?.keywords?.slice(0, 5).map((keyword) => keyword.concat('', ',')) : 'No'}
                </Text>
              </Col>
            </Row>
            <Col span={22}>
              <Paragraph
                ellipsis={{
                  rows: 2,
                  expandable: false,
                }}
                style={{ fontSize: '16px', fontWeight: 400 }}
              >
                <div dangerouslySetInnerHTML={{ __html: abstractText }}></div>
              </Paragraph>
            </Col>
          </div>
        </div>
      </CardBody>
    </Card>
  );
};
