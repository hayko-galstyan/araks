import React, { useEffect, useState } from 'react';
import { Button, CheckboxProps, Drawer, Empty, Skeleton, Spin, Typography } from 'antd';
import { COLORS, PATHS } from 'helpers/constants';
import { SourceSideBar } from './all-source-sidebar';
import { SourceFilter } from './source-filter';
import { Content, ContentFooter, ScrollContent } from './style';

import { useGetExternalResources } from 'api/all-data/use-get-external-resources';
import { IDataExternalResourcesItem } from 'api/types';
import { useNavigate, useParams } from 'react-router-dom';
import { LoadingOutlined } from '@ant-design/icons';
import { useAddExternalResources } from 'api/all-data/use-put-external-resouces';
import { SourceCard } from 'components/card/source-card/source-card';

const { MAIN_GRAY } = COLORS;
const { Paragraph } = Typography;

const width = window.innerWidth;

export const SourceDrawer: React.FC<{ onOpen: (value: boolean) => void; isOpen: boolean }> = ({ onOpen, isOpen }) => {
  const [searchText, setIsSearchText] = useState<string>('');
  const [dataSource, setIsDataSource] = useState<IDataExternalResourcesItem[]>([]);
  const navigate = useNavigate();
  const { id } = useParams();

  const { data, isFetching, refetch, hasNextPage, fetchNextPage } = useGetExternalResources(searchText, 1, {
    enabled: searchText?.length > 2,
  });

  const { mutate: createDataFn, isLoading } = useAddExternalResources();

  const onCreateData = (): void => {
    const data = dataSource?.filter((el) => el?.isChecked);
    createDataFn(data, {
      onSuccess: () => {
        navigate(PATHS.PROJECT_VISUALISATION.replace(':id', id ?? ''));
      },
    });
  };

  const onChangeCheckbox: CheckboxProps['onChange'] = (e) => {
    const article = data?.articles.find((el) => el?.article?.article_id === e.target.value);
    if (article && dataSource?.length <= 10) {
      const index = dataSource?.findIndex((el) => el?.article?.article_id === e.target.value);
      if (index !== -1) {
        if (!e.target.checked) {
          const updatedDataSource = [...dataSource.slice(0, index), ...dataSource.slice(index + 1)];
          setIsDataSource(updatedDataSource);
        }
      } else {
        if (e.target.checked) {
          article.isChecked = e.target.checked;
          setIsDataSource((prev) => [...prev, article]);
        }
      }
    }
  };

  const onSeeMore = (): void => {
    if (!isFetching && hasNextPage) {
      fetchNextPage();
    }
  };

  useEffect(() => {
    if (!searchText?.length) {
      setIsSearchText('');
      setIsDataSource([]);
      refetch();
    }
  }, [searchText, refetch]);

  return (
    <Drawer
      maskStyle={{ background: 'transparent' }}
      width={'100%'}
      contentWrapperStyle={{ top: width > 1600 ? '150px' : '130px' }}
      open={isOpen}
      headerStyle={{ display: 'none' }}
      bodyStyle={{ background: MAIN_GRAY, padding: 0, display: 'flex', overflow: 'hidden' }}
      onClose={() => onOpen(false)}
    >
      <SourceSideBar />
      <Content>
        <SourceFilter onSearch={setIsSearchText} result={data?.count ?? 0} onOpen={onOpen} />
        {searchText?.length < 3 && searchText?.length > 1 && (
          <Paragraph style={{ color: 'red' }}>The minimum length for this field is 3 characters</Paragraph>
        )}
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <Spin spinning={isFetching} indicator={<LoadingOutlined spin />} />
        </div>
        <ScrollContent style={{ pointerEvents: isLoading ? 'none' : 'auto' }}>
          {data?.count
            ? data?.articles?.map((item: IDataExternalResourcesItem) => {
                return (
                  <SourceCard
                    searchText={searchText}
                    key={item?.article?.article_id}
                    data={item}
                    dataSource={dataSource}
                    onChangeCheckbox={onChangeCheckbox}
                  />
                );
              })
            : !isFetching && <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />}
          <Skeleton active={true} loading={isFetching && !!searchText?.length} />
          {!!data?.count && !isFetching && data?.count > 5 && (
            <Button disabled={isFetching} className="see-more-btn" onClick={onSeeMore}>
              See More
            </Button>
          )}
        </ScrollContent>
        <ContentFooter>
          {dataSource?.length > 0 && (
            <Button disabled={isLoading} type="primary" style={{ width: '100%' }} onClick={onCreateData}>
              Add
              <Spin
                spinning={isLoading}
                indicator={<LoadingOutlined style={{ color: COLORS.PRIMARY.WHITE, marginLeft: '18px' }} />}
              />
            </Button>
          )}
        </ContentFooter>
      </Content>
    </Drawer>
  );
};
