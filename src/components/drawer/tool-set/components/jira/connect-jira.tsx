import { useCallback, useState } from 'react';
import { Col, List, Row } from 'antd';
import { IJiraProject, JiraIntegrationContent } from 'types/jira-integration';
import { StyledJiraListItem } from '../../styles';
import { SecondaryText } from 'components/typography';
import { Button } from 'components/button';
import { useManageJiraProject } from 'api/jira/use-manage-jira-project';
import { ConfirmChangeProject } from './confirm-change-project';
import { useJira } from './context';
import { GET_PROJECT_DATA } from 'api/projects/use-get-project';
import { useQueryClient } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { message } from 'antd';

const list = [
  'You can revoke access at any time',
  `Collaborators in your Araks files will be able to see what you've imported from Jira`,
].map((text, index) => (
  <SecondaryText key={index} style={{ fontSize: '18px', fontWeight: 500 }}>
    {text}
  </SecondaryText>
));

export const ConnectJira: JiraIntegrationContent = (params) => {
  const [confirmChangeModal, setConfirmChangeModal] = useState<boolean>(false);

  const { id } = useParams();
  const { data, selected, setSelectedProject, jiraConnect } = params;

  const queryClient = useQueryClient();
  const { setOpenViewJira } = useJira();

  const { mutate } = useManageJiraProject();

  const handleCancel = useCallback(() => {
    setOpenViewJira('list');
    if (setSelectedProject) setSelectedProject(undefined);
  }, [setOpenViewJira, setSelectedProject]);

  const handleClick: VoidFunction = () => {
    if (data?.length) {
      const project = data.find((p: IJiraProject) => p.key === selected);

      if (project) {
        mutate(project, {
          onSuccess: () => {
            queryClient.invalidateQueries([GET_PROJECT_DATA.replace(':id', id || '')]);
            handleCancel();
          },
          onError: () => {
            message.error('An unexpected error occurred');
          },
        });
      }
    }
  };

  return (
    <>
      <Col span={24}>
        <SecondaryText style={{ color: '#414141', fontWeight: 700 }}>
          Araks would like to access your Jira account
        </SecondaryText>
        <List dataSource={list} renderItem={(item) => <StyledJiraListItem>{item}</StyledJiraListItem>} />
      </Col>
      <Col span={24}>
        <Row style={{ gap: '1rem' }}>
          <Col span={24}>
            <Button
              style={{ height: '2.5rem', padding: '6px' }}
              block
              htmlType="submit"
              type="primary"
              disabled={jiraConnect?.key === selected}
              onClick={() => {
                if (jiraConnect) {
                  setConfirmChangeModal(!confirmChangeModal);
                } else {
                  handleClick();
                }
              }}
            >
              Connect Jira project
            </Button>
          </Col>
          <Col span={24}>
            <Button style={{ width: '100%' }} onClick={handleCancel}>
              Cancel
            </Button>
          </Col>
        </Row>
      </Col>
      <ConfirmChangeProject
        isOpen={confirmChangeModal}
        onClose={() => setConfirmChangeModal(!confirmChangeModal)}
        onSubmit={handleClick}
        title={'Are you sure change jira project ?'}
        text={'All connected nodes will be deleted!'}
      />
    </>
  );
};
