import React from 'react';
import { Wrapper } from './wrapper';
import { Space, Spin } from 'antd';
import { useDocumentGraphRef } from 'hooks/use-document-graph';
import { useGetDocumentGraph } from 'api/document-repositories/use-get-document-graph';
import { useDocument } from 'components/layouts/components/document/wrapper';
import { LayoutComponent } from 'pages/project-visualisation/components/settings/LayoutComponent';

export const DocumentGraph: React.FC<{ search: string | undefined }> = ({ search }) => {
  const { selectedType } = useDocument() ?? {};

  const { nodes, count, isInitialLoading } = useGetDocumentGraph({}, search, selectedType);

  const ref = useDocumentGraphRef({ nodes, count });

  return (
    <Spin spinning={isInitialLoading}>
      <Wrapper ref={ref} />
      <Space style={{ right: '100px', position: 'fixed' }}>
        <LayoutComponent isDocument={true} />
      </Space>
    </Spin>
  );
};
