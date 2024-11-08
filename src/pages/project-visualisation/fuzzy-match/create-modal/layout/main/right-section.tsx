import { Col, Form, Row } from 'antd';
import React, { useEffect, useState } from 'react';
import { FormItem } from 'components/form/form-item';
import { Select } from 'components/select';
import { useGetProjectEdgeTypes } from 'api/node-edge-type/use-get-edge-types-beetwen-types';
import styled from 'styled-components';
import { CreateConnectionItems } from '../../components/form-data/create-connection-items';
import { AddNewButton } from 'components/form/type-property/type-property-steps-form-items/connection-property-items';

const RowSection = styled(Row)`
  display: flex;
  justify-content: center;
  padding: 1rem 0;

  .ant-row {
    width: 100%;
  }
`;

export const ConnectionSection: React.FC = () => {
  const sourceId = Form.useWatch('sourceId', { preserve: true });
  const targetId = Form.useWatch('targetId', { preserve: true });

  const [newConnection, setNewConnection] = useState<boolean>(false);

  const disabled = !(sourceId && targetId);

  const { data } = useGetProjectEdgeTypes(sourceId, targetId, {
    enabled: !!(sourceId && targetId),
  });

  const form = Form.useFormInstance();

  useEffect(() => {
    return () => {
      setNewConnection(false);
    };
  }, [disabled]);

  return (
    <RowSection>
      <Col span={22} className={disabled ? 'disabled' : ''}>
        <FormItem
          name="edgeId"
          label="Connection Name"
          rules={[{ required: true, message: 'Connection data type is required' }]}
        >
          <Select
            options={data}
            style={{ width: '100%' }}
            placeholder="Please select"
            fieldNames={{ value: 'id', label: 'name' }}
            disabled={!(sourceId && targetId)}
            onChange={(id) => {
              const edge = data?.find((n) => n.id === id);

              form.setFieldValue('edge', {
                id: edge?.id,
                name: edge?.name,
              });
            }}
          />
        </FormItem>
      </Col>
      <Col span={22}>
        <AddNewButton
          disabled={!disabled}
          onClick={() => {
            setNewConnection(!newConnection);
          }}
        >
          +Add New Connection
        </AddNewButton>
        {newConnection && !disabled && <CreateConnectionItems setCreateConnection={setNewConnection} />}
      </Col>
    </RowSection>
  );
};
