import React, { useMemo, useState } from 'react';
import styled from 'styled-components';
import { useSchema } from 'components/layouts/components/schema/wrapper';
import { AddTypeModal } from './modals/add-type';
import { AddTypePropertyModal } from './modals/add-type-property';
import { ReactComponent as AddTypeSVG } from './components/icons/add.svg';
import { ReactComponent as AddLinkSVG } from './components/icons/connection.svg';
import { Search } from './components/search';
import { AddEdgeModal } from './modals/add-edge';
import { AddEdgePropertyModal } from './modals/edge-properties';
import { useProject } from 'context/project-context';
import { UserProjectRole } from 'api/types';
import { useNavigate, useParams } from 'react-router-dom';
import { PATHS, ProjectPrivacy } from 'helpers/constants';
import { Button } from 'components/button';
import { isPublicTemplate, useIsTemplateEditPage } from 'hooks/use-is-template-page';
import { useTemplate } from 'api/project-templates/use-template';
import { SaveTemplateSuccessModal } from 'pages/project-template/components/success-message';

const ToolStyle = styled.div`
  position: fixed;
  display: flex;
  flex-direction: column;
  gap: 8px;
  left: 330px;
  top: 188px;
  z-index: 1;

  > * {
    width: 40px;
    height: 40px;
    box-shadow: 0px 10px 10px rgba(141, 143, 166, 0.2);
  }

  .add-type,
  .add-link {
    cursor: pointer;

    &:hover {
      rect:first-child {
        fill: rgba(35, 47, 106, 0.8);
      }
    }
  }
`;

const SaveTemplateButton = styled(Button)`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  right: 5rem;
  top: 2rem;
  z-index: 1;
`;

export const ActionBar: React.FC = () => {
  const [openSuccess, setOpenSuccess] = useState(false);
  const [templateId, setTemplateId] = useState('');

  const { id } = useParams();
  const { template_preview_data } = useSchema() ?? {};
  const isTemplateEditPage = useIsTemplateEditPage();

  const navigate = useNavigate();

  const { mutate } = useTemplate({
    onSuccess: (data) => {
      setOpenSuccess(true);
      setTemplateId(data.data.project_id);
    },
  });

  const { graph, graph_preview, startEdgeType, startTemplateView } = useSchema() || {};
  const { projectInfo } = useProject();

  const addType = () => {
    if (graph !== undefined) {
      graph.container.style.cursor = 'crosshair';
    }

    if (graph_preview !== undefined) {
      graph_preview.container.style.cursor = 'crosshair';
    }
  };

  const redirectToTemplate = () => {
    if (isTemplateEditPage) {
      mutate({
        template_id: template_preview_data?.id ?? (id || ''),
      });
    }

    if (graph?.getNodes()?.length) navigate(PATHS.PROJECT_TEMPLATE.replace(':id', id || ''));
    else startTemplateView();
  };

  const isOwner =
    projectInfo?.role === UserProjectRole.Owner && template_preview_data?.privacy !== ProjectPrivacy.PUBLIC;

  const isTemplateEdit = isTemplateEditPage && !isPublicTemplate();

  const showActions = useMemo(() => isOwner || isTemplateEdit, [isOwner, isTemplateEdit]);

  const closeTemplate = () => {
    setOpenSuccess(false);
    navigate(PATHS.PROJECT_SCHEME.replace(':id', templateId));
  };

  return (
    <>
      <ToolStyle>
        <Search />
        {showActions && (
          <>
            <AddTypeSVG className="add-type" onClick={addType} />
            <AddLinkSVG className="add-link" onClick={() => startEdgeType({ isUpdate: false, id: undefined })} />
          </>
        )}
      </ToolStyle>
      <SaveTemplateButton type="primary" onClick={redirectToTemplate}>
        {graph?.getNodes()?.length ? 'Save as a Template' : 'Use Template'}
      </SaveTemplateButton>
      <AddEdgeModal />
      <AddEdgePropertyModal />
      <AddTypeModal />
      <AddTypePropertyModal />
      <SaveTemplateSuccessModal open={openSuccess} onClose={closeTemplate} />
    </>
  );
};
