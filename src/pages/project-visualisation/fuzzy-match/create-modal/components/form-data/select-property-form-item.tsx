import './form-item-select.css';
import { Col, Divider, Form } from 'antd';
import { FC } from 'react';
import { FormItem } from 'components/form/form-item';
import { MatchData } from '../../type';
import { Select } from 'components/select';
import { PropertyTypes } from 'components/form/property/types';
import { editFuzzyPropertyList } from '../manage-property/data-types-select';
import { ProjectTypePropertyReturnData } from 'api/types';
import { Rule } from 'antd/es/form';

type PropertyOptionParams = FC<{
  name: (string | number)[];
  label: string;
  options: { label: JSX.Element; value: string; type?: string }[];
  disabled?: boolean;
  sourceProperties?: ProjectTypePropertyReturnData[] | undefined;
  onChange: (id: string, name: (string | number)[]) => void;
}>;

export const SelectPropertyFormItem: PropertyOptionParams = ({
  name,
  label,
  options,
  disabled,
  sourceProperties,
  onChange,
}) => {
  const form = Form.useFormInstance();
  const matchList = Form.useWatch('matchList', { preserve: true });

  const onClear = () => {
    if (name[1] === 'sourceId') {
      form.setFieldValue(
        'matchList',
        (form.getFieldValue('matchList') as MatchData[]).map((l, index: number) => {
          if (index === name[0] && l?.targetId) {
            l.targetId = undefined;
          }
          return l;
        })
      );
    }
  };

  const currentSource = (form.getFieldValue('matchList') as MatchData[]).find((l, i) => i === name[0])?.sourceId;

  const isDisabled = name[1] === 'targetId' && !currentSource ? true : disabled;

  const getOptionsWithDisabled = (option: { label: JSX.Element; value: string; type?: string | undefined }) => {
    if (name[1] === 'targetId') {
      const sourceType = sourceProperties?.find((o) => o.id === currentSource)?.ref_property_type_id ?? '';

      const isAccessType = (editFuzzyPropertyList[sourceType as PropertyTypes] as PropertyTypes[])?.includes(
        option.type as PropertyTypes
      );
      return {
        ...option,
        disabled: !isAccessType,
      };
    }

    return option;
  };

  return (
    <>
      <Col offset={1} span={10} className={isDisabled ? 'disabled' : ''}>
        <FormItem
          name={name}
          label={label}
          rules={[
            { required: true, message: `${label} is required` },
            {
              validator: async (_: Rule, value: string | undefined) => {
                if (!value) return Promise.resolve();

                if (name[1] === 'targetId') {
                  const currentData = matchList[name[0]] as MatchData;

                  const repetitiveData = (matchList as MatchData[]).filter(
                    (m) => m.sourceId === currentData.sourceId && m.targetId === currentData.targetId
                  );

                  if (repetitiveData.length > 1) {
                    return Promise.reject('There are repetitive data');
                  }
                }

                return Promise.resolve();
              },
            },
          ]}
        >
          <Select
            popupClassName="property-select-dropdown"
            options={options.map((o) => getOptionsWithDisabled(o))}
            placeholder={`Please select ${label.toLowerCase()}`}
            style={{ width: '100%' }}
            allowClear
            onClear={onClear}
            disabled={isDisabled}
            onChange={(id) => {
              onClear();
              onChange(id as string, name);
            }}
          />
        </FormItem>
        <Divider style={{ color: '#E0E0E0', margin: '15px 0' }} />
      </Col>
    </>
  );
};
