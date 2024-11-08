import { Col, Divider, Form } from 'antd';
import React from 'react';
import { FormItem } from 'components/form/form-item';
import { TreeSelect } from 'components/select';
import { TreeNodeType } from '../../../../../data-sheet/types';
import { IProjectType } from 'api/types';

interface SourceSelectProps {
  sourceId: string;
  treeNodes: TreeNodeType[];
  resetProperties: (field: string) => void;
  nodes: IProjectType[];
  onClearHandle: (field: string) => void;
}

export const TargetSelectItem: React.FC<SourceSelectProps> = ({
  nodes,
  treeNodes,
  resetProperties,
  onClearHandle,
  sourceId,
}) => {
  const form = Form.useFormInstance();

  return (
    <Col offset={1} span={10} className={!sourceId ? 'disabled' : ''}>
      <FormItem name="targetId" label="Target" rules={[{ required: true, message: 'Target is required' }]}>
        <TreeSelect
          treeData={treeNodes}
          showSearch
          style={{ width: '100%' }}
          dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
          placeholder="Please select"
          allowClear
          treeDefaultExpandAll
          onClear={() => onClearHandle('targetId')}
          fieldNames={{ value: 'key' }}
          disabled={!sourceId}
          onChange={(id, data, temp) => {
            resetProperties('targetId');
            const node = nodes.find((n) => n.id === id);

            form.setFieldValue('targetDefaultPropertyId', node?.properties.find((p) => p.default_property)?.id);
            form.setFieldValue('target', {
              id: node?.id,
              name: node?.name,
              color: node?.color,
            });
          }}
        />
      </FormItem>
      <Divider style={{ color: '#E0E0E0' }} />
    </Col>
  );
};
