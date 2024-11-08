import { Col, Row } from 'antd';
import { SecondaryText } from 'components/typography';
import { ReactComponent as BackSvg } from 'components/icons/back.svg';
import { ReactComponent as JiraSvg } from 'components/icons/jira.svg';
import { JIRA_CONNECTED_TITLE, JIRA_TITLE } from '../../../../helpers/constants';
import { FC, useCallback, useState } from 'react';
import { ClickableColProps, FlexColProps, TToolSetJiraHeaderProps } from 'types/jira-integration';
import { JiraProjectActionPopover } from '../../jira-project-action-popover';
import { DeleteJiraProjectModal } from 'components/modal/delete-jira-project-modal';
import { useParams } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';
import { useManageJiraProject } from 'api/jira/use-manage-jira-project';
import { GET_PROJECT_DATA } from 'api/projects/use-get-project';

const ClickableCol: FC<ClickableColProps> = ({ children, onClick, span }) => (
  <Col span={span} style={{ cursor: 'pointer', display: 'flex' }} onClick={onClick}>
    {children}
  </Col>
);

const FlexCol: FC<FlexColProps> = ({ span, children, style = {} }) => (
  <Col span={span} style={{ display: 'flex', alignItems: 'center', ...style }}>
    {children}
  </Col>
);

export const ToolSetJiraHeader: TToolSetJiraHeaderProps = ({ handleBackClick, jiraConnect }) => {
  const [deleteProjectModal, setDeleteProjectModal] = useState<boolean>();

  const { id } = useParams();
  const queryClient = useQueryClient();

  const { mutate } = useManageJiraProject(true);

  const getJiraTitleHeader = useCallback(() => {
    return jiraConnect ? JIRA_TITLE : JIRA_CONNECTED_TITLE;
  }, [jiraConnect]);

  const handleDelete = () => {
    mutate(undefined, {
      onSuccess: () => {
        handleBackClick();
        queryClient.invalidateQueries([GET_PROJECT_DATA.replace(':id', id || '')]);
      },
    });
  };

  return (
    <>
      <Row style={{ marginBottom: '1rem' }}>
        <Col span={18}>
          <Row>
            <ClickableCol
              span={2}
              onClick={() => {
                handleBackClick();
              }}
            >
              <BackSvg style={{ width: '14px' }} />
            </ClickableCol>
            <FlexCol span={16} style={{ gap: '0.4rem' }}>
              <JiraSvg style={{ width: '16px' }} />
              <SecondaryText style={{ fontSize: '18px', fontWeight: 600 }}>{getJiraTitleHeader()}</SecondaryText>
            </FlexCol>
          </Row>
        </Col>
        <Col offset={4} span={2} style={{ justifyContent: 'end', display: 'flex' }}>
          {jiraConnect && <JiraProjectActionPopover onClickDelete={() => setDeleteProjectModal(!deleteProjectModal)} />}
        </Col>
      </Row>
      <DeleteJiraProjectModal
        handleBackClick={handleBackClick}
        handleDelete={handleDelete}
        isOpen={!!deleteProjectModal}
        title="Are you sure delete project"
        text="nodes will be deleted"
      />
    </>
  );
};
