import { JiraIntegrationContent } from 'types/jira-integration';
import { Col, Divider, Flex } from 'antd';
import { DropdownContainer } from '../../styles';
import { Select } from 'components/select';
import { ReactComponent as JiraSvg } from '../../icons/jira-caption.svg';
import { ReactComponent as AraksSvg } from '../../icons/araks.svg';
import { ConnectJira } from './connect-jira';

export const IntegrationContent: JiraIntegrationContent = (params) => {
  const { data, selected, setSelectedProject, jiraConnect } = params;

  return (
    <>
      <Col span={24} style={{ display: 'flex', justifyContent: 'center' }}>
        <Flex style={{ width: '100%', padding: '0 24px' }} align="center">
          <JiraSvg />
          <Divider dashed style={{ minWidth: 0, borderWidth: '2px 0 0' }} />
          <AraksSvg />
        </Flex>
        <DropdownContainer>
          <Select
            options={data}
            style={{
              width: '100%',
              maxWidth: `${window.innerWidth / 3 - 200}px`,
              display: 'flex',
              alignItems: 'center',
            }}
            defaultValue={selected || jiraConnect?.name}
            value={selected || jiraConnect?.name}
            onSelect={(val) => {
              if (setSelectedProject) {
                setSelectedProject(val as string);
              }
            }}
            placeholder="Please select"
            fieldNames={{ value: 'key', label: 'name' }}
          />
        </DropdownContainer>
      </Col>
      <ConnectJira {...params} jiraConnect={jiraConnect} selected={selected} />
    </>
  );
};
