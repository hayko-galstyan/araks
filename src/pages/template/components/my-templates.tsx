import { Col, PaginationProps, Row, Spin } from 'antd';
import { useGetTemplates } from 'api/project-templates/use-get-templates-my';
import { TitleSeparator } from 'components/typography';
import { initData, folderReducer, FolderAction } from 'pages/projects/components/folder/folders';
import { TemplateItem } from './template-item';
import { useCallback, useEffect, useMemo, useReducer, useState } from 'react';
import { ReactComponent as NoData } from 'components/icons/no-data.svg';

import styled from 'styled-components';
import { TemplatesItemInfo } from 'api/types';
import { TemplateViewModal } from './TemplateViewModal';

type Props = {
  projectsUrl?: string;
  title: string;
  search: string;
  showOptions: boolean;
};
const BodyRow = styled(Row)`
  overflow-x: auto;
  min-height: 300px;
  margin-bottom: 20px;
`;
const EmptyRow = styled(Row)`
  width: '100%';
  min-height: 300px;
  background: 'blue';
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const MyTemplates = ({ projectsUrl, title, search, showOptions }: Props) => {
  const [folderState, dispatch] = useReducer(folderReducer, { ...initData, size: 5 });
  const [templateId, setTemplateId] = useState<TemplatesItemInfo | undefined>();

  const {
    data: { data },
    isInitialLoading,
  } = useGetTemplates(
    { page: folderState.page, size: folderState.size, search: search.length > 2 ? search : undefined },
    projectsUrl
  );

  const onPaginationChange: PaginationProps['onChange'] = useCallback((page: number) => {
    dispatch({ type: FolderAction.CHANGE_PAGE, page });
  }, []);

  const paginationProps = useMemo(
    () =>
      data?.count
        ? {
            onChange: onPaginationChange,
            total: data.count,
            defaultPageSize: 5,
            current: folderState.page,
          }
        : undefined,
    [data?.count, folderState.page, onPaginationChange]
  );
  useEffect(() => {
    onPaginationChange(1, 5);
  }, [onPaginationChange, search]);

  return (
    <Spin style={{ minHeight: 600 }} spinning={isInitialLoading}>
      <TitleSeparator name={title} paginationProps={paginationProps} />
      {!(!isInitialLoading && data.count > 0) ? (
        !isInitialLoading && (
          <EmptyRow>
            <NoData />
          </EmptyRow>
        )
      ) : (
        <BodyRow>
          <Row wrap={false}>
            {data.templates.map((item) => (
              <Col key={item.id}>
                <TemplateItem setTemplateId={setTemplateId} showOptions={showOptions} key={item.id} item={item} />
              </Col>
            ))}
          </Row>
          <TemplateViewModal
            isModalOpen={!!templateId}
            setIsModalOpen={setTemplateId}
            templateId={templateId?.id}
            isPublic={true}
            item={templateId}
          />
        </BodyRow>
      )}
    </Spin>
  );
};
