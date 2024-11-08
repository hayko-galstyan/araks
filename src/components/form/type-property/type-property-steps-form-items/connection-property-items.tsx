import { Dispatch, ReactNode, SetStateAction, useEffect, useState } from 'react';
import { Form, Input, Radio } from 'antd';
import { FormItem } from '../../form-item';
import { Select, TreeSelect } from '../../../select';
import { useDataSheetWrapper } from '../../../layouts/components/data-sheet/wrapper';
import { VerticalSpace } from '../../../space/vertical-space';
import { Button } from '../../../button';
import styled from 'styled-components';
import { SetCreateConnection } from '../add-type-property-form';
import { useGetProjectEdgeTypes } from '../../../../api/node-edge-type/use-get-edge-types-beetwen-types';
import { optionsRegex, regexPattern } from 'helpers/constants';

interface CreateTarget {
  selected?: string | undefined;
  isOpen: boolean;
}
interface Props {
  dataTypeSelect: ReactNode;
  hide: () => void;
  setCreateConnection: SetCreateConnection;
  propertyId: string | undefined;
  setCreateTarget: Dispatch<SetStateAction<CreateTarget | undefined>>;
  createTarget: CreateTarget | undefined;
}
export const AddNewButton = styled.div<{ disabled: boolean }>`
  background: none;
  border: none;
  color: #232f6a;
  font-size: 14px;
  font-weight: 600;
  letter-spacing: 1.12px;
  text-decoration-line: underline;
  cursor: pointer;
  user-select: none;
  margin: 1rem 0;
  width: 11rem;

  ${({ disabled }) => !disabled && 'color: #BFBFBF; cursor: auto'};
`;

export const ConnectionPropertyFormItems = ({ dataTypeSelect, setCreateConnection, hide, setCreateTarget }: Props) => {
  const [hasNodeType, setHasNodeType] = useState(false);
  const [selectedValue, setSelectedValue] = useState<string | null>();
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [inputError, setInputError] = useState('');

  const form = Form.useFormInstance();
  const source = Form.useWatch('source_id', { preserve: true });
  const target = Form.useWatch('target_id', { preserve: true });
  const inverse = Form.useWatch('inverse', { preserve: true });
  const { nodesList, nodeTypeId } = useDataSheetWrapper();

  const { data } = useGetProjectEdgeTypes(source, target, {
    enabled: !!(source && target),
  });

  const validateRegexInput = (input: string) => regexPattern.test(input);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setInputError(validateRegexInput(newValue) ? '' : ('Input must match the /^[ ~`!@#$%^&*()_-+={}[]|\\:;"“”‘’,./<>?]$/'));
  };
  
  useEffect(() => {
    if (nodeTypeId) {
      form.setFieldValue('source_id', nodeTypeId);
      setHasNodeType(true);
    }
    return () => {
      setHasNodeType(false);
      form.resetFields(['source_id']);
    };
  }, [form, nodeTypeId]);

  useEffect(() => {
    if (target !== source && inverse) {
      form.setFieldValue('inverse', false);
    }
  }, [form, source, target, inverse]);

  return (
    <>
      <FormItem name="source_id" label="Source" rules={[{ required: true, message: 'Source is required' }]}>
        <TreeSelect
          disabled={hasNodeType}
          treeData={nodesList}
          showSearch
          style={{ width: '100%' }}
          dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
          placeholder="Select source"
          allowClear
          treeDefaultExpandAll
          fieldNames={{ value: 'key' }}
        />
      </FormItem>
      <FormItem name="target_id" label="Target" rules={[{ required: true, message: 'Target is required' }]}>
        <TreeSelect
          treeData={nodesList}
          showSearch
          style={{ width: '100%' }}
          dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
          placeholder="Select target"
          allowClear
          treeDefaultExpandAll
          fieldNames={{ value: 'key' }}
          onSelect={(value, node) => {
            form.setFieldValue('edit_connection_name', undefined);
          }}
        />
      </FormItem>
      <AddNewButton
        disabled={true}
        onClick={() => {
          setCreateTarget({ isOpen: true });
        }}
      >
        +Add New Target Type
      </AddNewButton>
      <FormItem name="regex" label="Delimiters">
        <Select
          style={{ width: '100%' }}
          placeholder="Delimiters"
          value={selectedValue}
          defaultValue={selectedValue ?? 'None'}
          onDropdownVisibleChange={setDropdownVisible}
          open={dropdownVisible}
          dropdownRender={() => (
            <div style={{ padding: '10px' }}>
              <Radio.Group
                style={{ display: 'flex', flexDirection: 'column', gap: 10 }}
                value={selectedValue}
                onChange={(e) => {
                  const newValue = e.target.value;
                  setSelectedValue(newValue);
                  form.setFieldValue('regex', newValue);
                  setDropdownVisible(false);
                }}
                defaultValue={selectedValue ?? 'None'}
              >
                {optionsRegex?.map((option) => (
                  <div key={option.value}>
                    <Radio value={option.value}>{option.label}</Radio>
                  </div>
                ))}
              </Radio.Group>
            </div>
          )}
        ></Select>
      </FormItem>
      {selectedValue === 'Other' && (
        <FormItem
          name="other"
          validateStatus={inputError ? 'error' : ''}
          help={inputError}
          style={{ margin: '10px 0px' }}
          label="Other"
        >
          <Input placeholder="Symbol" onChange={handleInputChange} />
        </FormItem>
      )}

      {dataTypeSelect}
      <FormItem
        name="edit_connection_name"
        label="Connection Name"
        rules={[{ required: true, message: 'Node property data type is required' }]}
      >
        <Select
          options={data}
          style={{ width: '100%' }}
          placeholder="Please select"
          fieldNames={{ value: 'id', label: 'name' }}
        />
      </FormItem>
      <AddNewButton
        disabled={!!target}
        onClick={() => {
          if (!!target)
            setCreateConnection({
              isOpen: true,
            });
        }}
      >
        +Add New Connection
      </AddNewButton>
      <FormItem>
        <VerticalSpace>
          <Button block type="primary" htmlType="submit">
            Save
          </Button>
          <Button block type="text" onClick={hide}>
            Cancel
          </Button>
        </VerticalSpace>
      </FormItem>
    </>
  );
};
