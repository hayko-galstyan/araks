import { Fragment } from 'react';
import { Avatar, Col, Divider, List, Row, Skeleton, Spin, Tooltip } from 'antd';
import { NodePagination } from 'components/pagination';
import { SecondaryText, Text } from 'components/typography';
import { COLORS, initPageData } from 'helpers/constants';
import styled from 'styled-components';
import { defaultAllDataFilter } from '../right-section-all-data';
import { ReactComponent as DefaultIconSvg } from 'components/icons/default-image.svg';
import { useGetProjectAllDocuments } from 'api/all-data/use-get-project-all-documents';
import { Button } from 'components/button';
import { Icon } from 'components/icon';
import { MarkedText } from 'components/typography/marked-text';
import { useViewDatasheet } from 'context/datasheet-view-vontext';
import { useIsXXlScreen } from 'hooks/use-breakpoint';
import { PageParameters } from 'api/types';

type TypeInfoProps = {
  color?: string;
};

const TypeInfo = styled(({ color, ...props }) => <div {...props} />)<TypeInfoProps>`
  background-color: ${(props) => `${props.color}15`};
  text-align: center;
  border-radius: 8px;
`;

const StyledListItem = styled(({ color, ...props }) => <List.Item {...props} />)`
  && {
    align-items: flex-start;
    margin-bottom: 8px;
    padding-left: 24px;
    padding-right: 32px;
    background: linear-gradient(90.12deg, rgba(255, 255, 255, 0.7) 1.63%, rgba(255, 255, 255, 0.2) 100%);

    &:hover {
      box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.1);

      .all-data-type-name {
        background-color: ${(props) => `${props.color}`};
      }
    }

    .text {
      overflow: hidden;
      text-overflow: ellipsis;
      width: 300px;
    }

    /* .ant-list-item-meta {
      align-items: center;
    } */
  }
`;

type Props = {
  filterValue: typeof defaultAllDataFilter;
  checkedItems: string[];
  setCheckedItems: (values: string[]) => void;
  setFilterValue: (
    filter: typeof defaultAllDataFilter | ((prevVar: typeof defaultAllDataFilter) => typeof defaultAllDataFilter)
  ) => void;
};

export const AllDataListDocument = ({ filterValue, setFilterValue, checkedItems, setCheckedItems }: Props) => {
  const isXXl = useIsXXlScreen();

  const {
    rowsData,
    count: pageCount,
    isInitialLoading,
  } = useGetProjectAllDocuments(filterValue as PageParameters, {
    enabled: !!(filterValue.project_type_list_id && filterValue.type === 'document'),
  });
  const { dispatch } = useViewDatasheet();

  return (
    <Spin spinning={isInitialLoading}>
      <List
        pagination={false}
        dataSource={rowsData}
        style={{ overflow: 'auto', height: `calc(100vh - ${(isXXl ? 152 : 130) + 200}px)` }}
        renderItem={(item, index) => {
          return (
            <StyledListItem key={item.node_id} color={item.color}>
              <List.Item.Meta
                avatar={
                  item.default_image ? (
                    <Avatar src={`${process.env.REACT_APP_AWS_URL}${item.default_image}`} />
                  ) : (
                    <DefaultIconSvg />
                  )
                }
                title={
                  <Row align="top" gutter={10}>
                    <Col xs={7} xxl={5} style={{ textAlign: 'left' }}>
                      <Button onClick={() => dispatch(item.node_id)} type="link">
                        <Tooltip title={item.node_name} placement="top">
                          <Text title={item.node_name} color={COLORS.PRIMARY.GRAY} className="text" underline>
                            {item.node_name}
                          </Text>
                        </Tooltip>
                      </Button>
                    </Col>
                    <Col xs={12} xxl={14}>
                      {item.data?.map((dataItem, index) => (
                        <Fragment key={index}>
                          <Row justify="end" align="top" gutter={32}>
                            <Col xs={10} xxl={9}>
                              <Button
                                block
                                type="link"
                                onClick={() => {
                                  window.open(dataItem.path, '_blank');
                                }}
                                icon={<Icon color="red" icon="file1" size={16} />}
                              >
                                <SecondaryText ellipsis>
                                  <MarkedText longText={dataItem.match_filename || dataItem.filename} />
                                </SecondaryText>
                              </Button>
                            </Col>
                            <Col xs={11} xxl={12}>
                              <MarkedText longText={dataItem.match_content} />
                            </Col>
                            <Col xs={3} xxl={2}>
                              <Text color={COLORS.PRIMARY.GRAY}>({dataItem.match_count})</Text>
                            </Col>
                          </Row>
                          <Divider />
                        </Fragment>
                      ))}
                    </Col>
                    <Col xs={4}>
                      <TypeInfo color={item.color} className="all-data-type-name">
                        <Text color={COLORS.PRIMARY.GRAY_DARK}>{item.type_name}</Text>
                      </TypeInfo>
                    </Col>
                  </Row>
                }
              />
            </StyledListItem>
          );
        }}
      />
      {pageCount ? (
        <NodePagination
          total={pageCount}
          defaultPageSize={initPageData.size}
          pageSize={filterValue.size}
          defaultCurrent={initPageData.page}
          current={filterValue.page}
          onChange={(page) => {
            setFilterValue((prev) => ({ ...prev, page, allowDocumentCount: false }));
          }}
          showSizeChanger
          onShowSizeChange={(current, size) => {
            setFilterValue((prev) => ({ ...prev, page: current, size: size, allowDocumentCount: false }));
          }}
        />
      ) : (
        isInitialLoading && <Skeleton />
      )}
    </Spin>
  );
};
