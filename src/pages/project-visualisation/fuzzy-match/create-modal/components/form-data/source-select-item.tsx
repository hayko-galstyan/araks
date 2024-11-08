import React from 'react';
import { Col, Divider, Form } from 'antd';
import { FormItem } from 'components/form/form-item';
import { TreeSelect } from 'components/select';
import { TreeNodeType } from '../../../../../data-sheet/types';
import { IProjectType } from 'api/types';

interface SourceSelectProps {
  treeNodes: TreeNodeType[];
  resetProperties: (field: string) => void;
  nodes: IProjectType[];
  onClearHandle: (field: string) => void;
}

export const SourceSelectItem: React.FC<SourceSelectProps> = ({ nodes, treeNodes, resetProperties, onClearHandle }) => {
  const form = Form.useFormInstance();

  return (
    <Col offset={1} span={10}>
      <FormItem
        name="sourceId"
        label="Source"
        rules={[{ required: true, message: 'Source is required' }]}
        style={{ margin: 0, padding: '0 5px' }}
      >
        <TreeSelect
          treeData={treeNodes}
          showSearch
          style={{ width: '100%' }}
          dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
          placeholder="Please select"
          allowClear
          treeDefaultExpandAll
          fieldNames={{ value: 'key' }}
          onClear={() => onClearHandle('sourceId')}
          onChange={(id) => {
            resetProperties('sourceId');

            const node = nodes.find((n) => n.id === id);

            form.setFieldValue('sourceDefaultPropertyId', node?.properties.find((p) => p.default_property)?.id);
            form.setFieldValue('source', {
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
