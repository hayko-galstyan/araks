/* eslint-disable react-hooks/exhaustive-deps */
import { Row, Space } from 'antd';
import {
  ContentWrapper,
  TemplateList,
} from '../project-scheme/components/left-bar/components/template-types/use-template-drawer/style';
import { TemplateTitle } from 'pages/project-scheme/components/left-bar/components/template-types/use-template-titel';
import { PreviewSchema } from '../project-scheme/components/schema/preview';
import { Toolbar } from '../../components/tool-bar';
import { useSchema } from '../../components/layouts/components/schema/wrapper';
import { ActionBar } from '../project-scheme/components/action-bar';
import { useParams } from 'react-router-dom';
import { useGetTemplateById } from '../../api/project-templates/use-get-template-by-id';
import { useEffect } from 'react';
import { initNodes } from '../../components/layouts/components/schema/container/initial/nodes';
import { formattedTypes } from '../../components/layouts/components/schema/helpers/format-type';
import { UserProjectRole } from '../../api/types';
import { useAuth } from 'context/auth-context';
import { ProjectPrivacy } from 'helpers/constants';
import { TreeView } from 'pages/project-scheme/components/left-bar/components/topology/tree-view';
import styled from 'styled-components';
const VerticalScroll = styled(Row)`
  width: 100%;
  display: flex;
  justify-content: space-between;
  height: ${window.innerHeight - 200}px;
  border-radius: 4px;
  padding: 8px;
  margin-top: 8px;
  overflow-y: auto;
`;

export const ProjectTemplateEdit = () => {
  const { id } = useParams();
  const { graph_preview, setEdges, setNodes, ...params } = useSchema() ?? {};

  const { data } = useGetTemplateById(id ?? '', {
    enabled: !!id,
  });
  const { user } = useAuth();

  useEffect(() => {
    if (id && data?.data.nodes) {
      setNodes(data?.data.nodes);
      setEdges(data?.data.edges);

      initNodes(
        graph_preview,
        formattedTypes(graph_preview, data?.data.nodes, data?.data.edges, { role: UserProjectRole.Owner }),
        params
      );

      if (graph_preview?.zoomToFit) graph_preview.zoomToFit();
    }
  }, [data?.data.edges, data?.data.nodes, graph_preview, id, setEdges, setNodes]);

  return (
    <Space>
      <ActionBar />
      <ContentWrapper>
        <TemplateList isTemplateEdit={true}>
          {data && (
            <TemplateTitle
              item={{
                id: data?.data.id,
                description: data?.data.description,
                created_by: data?.data.created_by,
                name: data?.data.name,
                screenshot: data?.data.screenshot,
                privacy: data?.data.privacy,
                originalPrivacy: data?.data.user_id === user?.id ? ProjectPrivacy.PRIVATE : data.data.privacy,
              }}
              titel={data?.data.name}
              id={data?.data.id}
            />
          )}
          <VerticalScroll>
            <TreeView nodes={data?.data.nodes} />
          </VerticalScroll>
        </TemplateList>
        <PreviewSchema />
        <Toolbar graph_preview={graph_preview} position="right" />
      </ContentWrapper>
    </Space>
  );
};
