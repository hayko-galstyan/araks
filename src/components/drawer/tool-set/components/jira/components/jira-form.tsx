import { FC, useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';
import { Button, Col, Form, Input, Row, Select } from 'antd';
import { TaskViewHeader } from './header/task-view-header';
import { useGetJiraIssue } from 'api/jira/use-get-issue';
import { useGetIssueTypes } from 'api/jira/use-get-issue-types';
import { useGetJiraUsers } from 'api/jira/use-get-jira-users';
import { useGetJiraStatuses } from 'api/jira/use-get-statuses';
import { FormItem } from 'components/form/form-item';
import { JiraUserAutocomplete } from 'components/input/jira-user-autocomplete';
import { Datepicker } from 'components/datepicker';
import { JiraIssueRequestType, useCreateIssue } from 'api/jira/use-create-issue';
import { dateFormat } from 'helpers/constants';
import dayjs from 'dayjs';
import { useJira } from '../context';
import { TaskList } from './task-lists';

const ShareInput = styled(Input)`
  height: 40px;
  font-weight: 600;
  letter-spacing: 0.07em;
  color: #414141;
  font-size: 15px;
`;

export const JiraForm: FC = () => {
  const [search, setSearch] = useState<string>();
  const [form] = Form.useForm();
  const { node_id, openViewJira, setOpenViewJira } = useJira();

  const { data: jiraIssue, isSuccess } = useGetJiraIssue(node_id ?? '', {
    enabled: !!node_id,
  });

  const { mutate: createIssue, isLoading } = useCreateIssue();
  const { data: issueTypes } = useGetIssueTypes({ enabled: !!node_id && !jiraIssue?.jiraTask?.deleted_at });
  const { data: users } = useGetJiraUsers({ enabled: !!node_id });
  const { data: statuses } = useGetJiraStatuses(node_id ?? '', {
    enabled: isSuccess && !!jiraIssue?.jiraTask && !jiraIssue?.jiraTask?.deleted_at,
  });

  const handleFinish = (values: JiraIssueRequestType) => {
    const payload = {
      isUpdate: !!jiraIssue.jiraTask,
      nodeId: node_id,
      ...values,
      status_id: statuses?.find((status) => status.status_id === values.status_id)?.id as string,
      dueDate: values.dueDate ? dayjs(values.dueDate).format('YYYY-MM-DD') : undefined,
    };
    createIssue(payload, {
      onSuccess: () => {
        setOpenViewJira('task');
      },
    });
  };

  useEffect(() => {
    if (jiraIssue) {
      const { jiraTask } = jiraIssue;
      form.setFieldsValue({
        issue_type_id: jiraTask?.issue_type_id,
        status_id: jiraTask?.status_id,
        assignee_id: jiraTask?.assignee_id,
        dueDate: jiraTask?.dueDate ? dayjs(jiraTask.dueDate) : null,
      });
      setSearch(jiraTask?.assignee_name);
    }
  }, [form, jiraIssue]);

  const JiraFooter = useMemo(
    () => (
      <Row gutter={0} justify="center" style={{ marginTop: '30px' }}>
        <Col span={24}>
          <Button type="primary" onClick={() => form.submit()} loading={isLoading} disabled={isLoading}>
            {jiraIssue?.jiraTask ? 'Update Jira Task' : 'Create Jira Task'}
          </Button>
        </Col>
      </Row>
    ),
    [jiraIssue, form, isLoading]
  );

  return (
    <>
      {openViewJira.edit && !!jiraIssue.jiraTask && (
        <TaskViewHeader
          title={jiraIssue?.jiraTask?.issue_key}
          node_id={jiraIssue?.jiraTask?.node_id}
          url={jiraIssue?.url}
          type="task"
        />
      )}
      {jiraIssue?.jiraTask && <TaskList {...jiraIssue?.jiraTask} url={jiraIssue?.url} />}
      <Form
        form={form}
        name="jira-task-form"
        layout="vertical"
        autoComplete="off"
        requiredMark={false}
        onFinish={handleFinish}
        style={{ width: '100%' }}
      >
        <FormItem
          name="issue_type_id"
          label="Issue Type"
          rules={[{ required: true, message: 'Please select a Jira issue type' }]}
        >
          <Select
            options={issueTypes}
            placeholder="Please select"
            style={{ width: '100%' }}
            fieldNames={{ value: 'id', label: 'name' }}
          />
        </FormItem>
        <FormItem name="status_id" label="Status">
          <Select
            options={statuses}
            placeholder={!jiraIssue?.jiraTask ? 'To Do' : 'Please Select'}
            style={{ width: '100%' }}
            disabled={!jiraIssue?.jiraTask}
            fieldNames={{ value: 'status_id', label: 'name' }}
          />
        </FormItem>
        <FormItem name="assignee_id" label="Assignee">
          <JiraUserAutocomplete search={search} setSearch={setSearch} data={users}>
            <ShareInput placeholder="Please select" onChange={(e) => setSearch(e.target.value)} />
          </JiraUserAutocomplete>
        </FormItem>
        <FormItem name="dueDate" label="Due Date" style={{ marginBottom: 0 }}>
          <Datepicker format={dateFormat} style={{ width: '100%' }} />
        </FormItem>
      </Form>
      {JiraFooter}
    </>
  );
};
