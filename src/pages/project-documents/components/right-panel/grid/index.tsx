import { Pagination, Row } from 'antd';
import { useId, useState } from 'react';
import { DocumentViewInfo } from './document-view';
import styled from 'styled-components';
import { useGetDocuments } from '../../hooks/use-get-documents';
import { initialPageData } from '../../constants';
import { useDocument } from 'components/layouts/components/document/wrapper';

const PaginationWrapper = styled.div`
  display: flex;
  justify-content: end;
  margin-top: 1rem;
`;

export const Grid = () => {
  const id = useId();

  const [pageData, setPageData] = useState(initialPageData);

  const { searchDocument } = useDocument();

  const data = useGetDocuments({ search: searchDocument, pageData });

  const handlePageChange = (page: number, pageSize?: number) => {
    setPageData({
      ...pageData,
      page,
      limit: pageSize || pageData.limit,
    });
  };

  return (
    <>
      <Row style={{ height: 'calc(100vh - 340px)', gap: '1rem', overflow: 'auto' }} justify="start">
        {data?.documents?.map((items) => (
          <DocumentViewInfo key={id} {...items} />
        ))}
      </Row>
      {data?.documents?.length && data.count > 10 ? (
        <PaginationWrapper>
          <Pagination
            current={pageData.page}
            pageSize={pageData.limit}
            total={data?.count}
            onChange={handlePageChange}
          />
        </PaginationWrapper>
      ) : undefined}
    </>
  );
};
