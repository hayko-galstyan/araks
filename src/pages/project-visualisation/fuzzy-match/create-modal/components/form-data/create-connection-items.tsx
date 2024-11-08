import styled from 'styled-components';
import { useQueryClient } from '@tanstack/react-query';
import { Checkbox, Form, Space, Tooltip, Typography } from 'antd';
import React, { Dispatch, SetStateAction, useMemo } from 'react';
import { FormItem } from 'components/form/form-item';
import { InfoCircleFilled } from '@ant-design/icons';
import { Rule } from 'antd/es/form';
import { FormInput } from 'components/input';
import { TreeSelect } from 'components/select';
import { InverseFormItem } from '../../../../../project-scheme/components/action-bar/form/add-edge/inverse-form-item';
import { VerticalSpace } from 'components/space/vertical-space';
import { Button } from 'components/button';
import { useTypes } from 'hooks/use-types';
import { createNodesTree } from 'components/layouts/components/data-sheet/utils';
import { ProjectEdgeForm } from 'types/project-edge';
import { useCreateEdge } from 'api/schema/edge/use-create-edge';
import { GET_PROJECT_EDGE_TYPES } from 'api/node-edge-type/use-get-edge-types-beetwen-types';
import { useParams } from 'react-router-dom';

const { Text } = Typography;

const Wrapper = styled.div`
  width: auto;
  background: #ebecee;
  padding: 2rem;
`;

type Props = {
  setCreateConnection: Dispatch<SetStateAction<boolean>>;
};

export const CreateConnectionItems: React.FC<Props> = ({ setCreateConnection }) => {
  const form = Form.useFormInstance();
  const queryClient = useQueryClient();

  const { id } = useParams();

  const source = Form.useWatch('sourceId', { preserve: true });
  const target = Form.useWatch('targetId', { preserve: true });

  const { mutate: createEdge } = useCreateEdge(id, {
    onSuccess: (data) => {
      queryClient.invalidateQueries([
        GET_PROJECT_EDGE_TYPES.replace(':source_type_id', source || '').replace(':target_type_id', target),
      ]);

      setCreateConnection(false);

      form.resetFields(['connection_name']);

      const edge = data?.data;

      form.setFieldValue('edgeId', edge?.id);

      form.setFieldValue('edge', {
        id: edge?.id,
        name: edge?.name,
      });
    },
  });

  const { nodes } = useTypes();
  const treeNodes = useMemo(() => createNodesTree(nodes), [nodes]);

  const onSave = () => {
    const errorEdgeName = form.getFieldError('connection_name');

    if (!errorEdgeName.length) {
      /** ADD NEW CONNECTION */
      const { connection_name, inverse, multiple } = form.getFieldValue([]) as ProjectEdgeForm & {
        connection_name: string;
      };

      const sourceId = source ?? '';
      const targetId = target ?? '';


      createEdge({
        name: connection_name,
        inverse,
        multiple,
        source_id: sourceId,
        target_id: targetId,

      });
    }
  };

  return (
    <Wrapper>
      <Space size={8}>
        <Text>Add Connection</Text>
        <Tooltip title="Useful information" placement="right">
          <InfoCircleFilled style={{ fontSize: 16, color: '#C3C3C3' }} />
        </Tooltip>
      </Space>
      <FormItem
        name="connection_name"
        label="Connection name"
        rules={[
          {
            required: true,
            message: 'Connection name is required',
          },
          { min: 3, message: 'The minimum length for this field is 3 characters' },
          { max: 30, message: 'The maximum length for this field is 30 characters' },
          {
            validator: async (_: Rule, value: string | undefined) => {
              if (value) {
                const regex = /^[a-z0-9_]+$/;
                if (!regex.test(value)) {
                  return Promise.reject('Name must only contain lowercase letters, numbers and underscores');
                }
              }
              return Promise.resolve();
            },
          },
        ]}
      >
        <FormInput placeholder="Connection name" />
      </FormItem>

      <FormItem name="sourceId" label="Source">
        <TreeSelect
          value={source}
          disabled
          treeData={treeNodes}
          style={{ width: '100%' }}
          fieldNames={{ value: 'key' }}
        />
      </FormItem>
      <FormItem name="targetId" label="Target">
        <TreeSelect
          value={target}
          disabled
          treeData={treeNodes}
          style={{ width: '100%' }}
          fieldNames={{ value: 'key' }}
        />
      </FormItem>
      <InverseFormItem source={source} />
      <FormItem name="multiple" valuePropName="checked" initialValue={true}>
        <Checkbox disabled>
          <Space>
            Multiple
            <Tooltip title="Useful information" placement="right">
              <InfoCircleFilled style={{ fontSize: 16, color: '#C3C3C3' }} />
            </Tooltip>
          </Space>
        </Checkbox>
      </FormItem>
      <FormItem>
        <VerticalSpace>
          <Button block type="primary" onClick={onSave}>
            Save
          </Button>
          <Button block type="text" onClick={() => setCreateConnection(false)}>
            Cancel
          </Button>
        </VerticalSpace>
      </FormItem>
    </Wrapper>
  );
};
