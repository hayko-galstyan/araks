import React, { useEffect, useMemo, useState } from 'react';
import { Row } from 'antd';
import { ToolSetJiraWrapper } from '../../styles';
import { useGetJiraProject } from 'api/jira/use-get-jira-project';
import { ToolSetJiraHeader } from './components/header/tool-set-jira-header';
import { IntegrationContent } from './integration-content';
import { useGetProject } from 'api/projects/use-get-project';
import { useParams } from 'react-router-dom';
import { JiraProjectTasks } from './jira-project-tasks';
import { useJira } from './context';
import { TaskView, JiraForm } from './components';

export const ToolSetJira: React.FC<{ handleBackClick: VoidFunction; defaultTypeView?: string }> = ({
  handleBackClick,
  defaultTypeView,
}) => {
  const { data: jiraData } = useGetJiraProject();
  const { openViewJira, setOpenViewJira } = useJira();
  const { id } = useParams<{ id: string }>();

  const { data: project } = useGetProject({ id: id ?? '' });
  const jiraConnect = useMemo(() => project?.jiraConnect, [project?.jiraConnect]);

  const [selectedProject, setSelectedProject] = useState(jiraConnect?.key);

  const renderTaskView = useMemo(() => {
    if (openViewJira.task) return <TaskView />;
    if (openViewJira.edit) return <JiraForm />;
    return <JiraProjectTasks projectName={jiraConnect?.name ?? ''} />;
  }, [jiraConnect?.name, openViewJira]);

  const renderIntegrationContent = (
    <Row style={{ gap: '2rem' }}>
      <IntegrationContent
        jiraConnect={jiraConnect}
        data={jiraData}
        handleBackClick={handleBackClick}
        selected={selectedProject}
        setSelectedProject={setSelectedProject}
      />
    </Row>
  );

  const renderHeader = (
    <ToolSetJiraHeader handleBackClick={handleBackClick} selectedProject={selectedProject} jiraConnect={jiraConnect} />
  );

  useEffect(() => {
    if (defaultTypeView) {
      return setOpenViewJira(defaultTypeView);
    }
  }, [defaultTypeView, setOpenViewJira]);

  return (
    <ToolSetJiraWrapper>
      {!jiraConnect || openViewJira.connect ? (
        renderIntegrationContent
      ) : (
        <>
          {!openViewJira.task && !openViewJira.edit && renderHeader}
          <Row style={{ gap: '2rem' }}>{renderTaskView}</Row>
        </>
      )}
    </ToolSetJiraWrapper>
  );
};
