import { Checkbox, Form, Space } from 'antd';
import { FormInput } from 'components/input';
import { Text } from 'components/typography';
import { FormItem } from './form-item';
import { Button } from 'components/button';
import styled from 'styled-components';
import { TreeSelect } from 'components/select';
import { ColorSelect } from 'components/select/color-select';
import { useDataSheetWrapper } from 'components/layouts/components/data-sheet/wrapper';
import { Dispatch, SetStateAction, useCallback } from 'react';
import { VerticalSpace } from 'components/space/vertical-space';
import { UsefulInformationTooltip } from 'components/tool-tip/useful-information-tooltip';

const Wrapper = styled.div`
  width: 422px;
`;

type Props = {
  isEdit?: boolean;
  setCreateTarget: Dispatch<SetStateAction<{ selected?: string | undefined; isOpen: boolean } | undefined>>
};

export const AddTypeTarget = ({ setCreateTarget, isEdit = false }: Props) => {
  const { nodesList, color, parentId } = useDataSheetWrapper();

  const form = Form.useFormInstance();
  const setValue = useCallback(
    (color: string) => {
      form.setFieldValue('color', color);
    },
    [form]
  );

  return (
    <Wrapper>
      <Space direction="horizontal">
        <Text>Create New Type</Text>
        <UsefulInformationTooltip
          infoText="A node type represents a group of nodes with a shared business purpose. It allows for the definition
                    of node properties and rules governing conversions between node types. Each node is associated with a
                    specific node type."
        />
      </Space>
      <FormItem
        name="create_type_name"
        label="Node type"
        rules={[
          { required: true, message: 'Node type name is required' },
          { min: 3, message: 'The minimum length for this field is 3 characters' },
          { max: 30, message: 'The maximum length for this field is 30 characters' },
        ]}
      >
        <FormInput placeholder="Node type" />
      </FormItem>
      <FormItem name="parent_id">
        <TreeSelect
          treeData={nodesList}
          showSearch
          style={{ width: '100%' }}
          dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
          placeholder="Please select parent"
          allowClear
          treeDefaultExpandAll
          fieldNames={{ value: 'key' }}
          value={parentId}
        />
      </FormItem>
      {!isEdit && (
        <Form.Item
          noStyle
          shouldUpdate={(prevValues, currentValues) => prevValues.parent_id !== currentValues.parent_id}
        >
          {({ getFieldValue }) => (
            <Space align="start">
              <FormItem name="inherit" valuePropName="checked">
                <Checkbox disabled={!getFieldValue('parent_id')}>Inherit properties</Checkbox>
              </FormItem>
              <UsefulInformationTooltip infoText="Inherit parent options" />
            </Space>
          )}
        </Form.Item>
      )}
      <FormItem name="color">
        <ColorSelect setValue={setValue} initialColor={isEdit ? color : undefined} />
      </FormItem>
      <FormItem>
        <VerticalSpace>
          <Button block type="primary" htmlType="submit">
            Save
          </Button>   
          <Button block type="text" onClick={() => setCreateTarget({ isOpen: false })}>
            Cancel
          </Button>
        </VerticalSpace>
      </FormItem>
    </Wrapper>
  );
};
