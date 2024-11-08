import { Col, Collapse, Image, Row } from 'antd';
import { FC } from 'react';
import { VerticalSpace } from 'components/space/vertical-space';
import { TaskStatus } from './task-status';
import { Text } from 'components/typography';
import dayjs from 'dayjs';
import { dateFormat } from 'helpers/constants';
import { IJiraTaskItem } from 'types/jira-integration';

export const TaskViewDetails: FC<IJiraTaskItem> = (params) => {
  const { status_name, assignee_image, assignee_name, reporter_image, reporter_name, dueDate } = params;

  const items = (
    <VerticalSpace style={{ width: '100%' }}>
      <Row align="middle">
        <Col span={8}>Assignee</Col>
        <Col span={16}>
          <Image src={assignee_image} width={25} height={25} preview={false} />
          <Text style={{ marginLeft: '16px' }}>{assignee_name}</Text>
        </Col>
      </Row>
      <Row align="middle">
        <Col span={8}>Reporter</Col>
        <Col span={16}>
          <Image src={reporter_image} width={25} height={25} preview={false} />
          <Text style={{ marginLeft: '16px' }}>{reporter_name}</Text>
        </Col>
      </Row>
      <Row align="middle">
        <Col span={8}>Status</Col>
        <Col span={16}>
          <TaskStatus status={status_name} />
        </Col>
      </Row>
      <Row>
        <Col span={8}>Due Date</Col>
        <Col span={16}>
          <Text>{dayjs(dueDate).format(dateFormat)}</Text>
        </Col>
      </Row>
    </VerticalSpace>
  );

  return <Collapse defaultActiveKey={['1']} items={[{ key: '1', label: 'Details', children: items }]} />;
};
