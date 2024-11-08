import { FC } from 'react';
import { Form } from 'antd';
import { FormItem } from 'components/form/form-item';
import { MatchData } from '../../type';
import { InputNumber } from 'components/input-number';

type PropertyRadio = FC<{ name: number }>;

export const RadioPropertyNumberFormItem: PropertyRadio = ({ name }) => {
  const isExact = (Form.useFormInstance().getFieldValue('matchList') as MatchData[])[name]?.exact === false;

  return isExact ? (
    <FormItem name={[name, 'fuzzyMatch']} rules={[{ required: true, message: 'The field is required' }]}>
      <InputNumber addonBefore={'%'} min={70} max={100} />
    </FormItem>
  ) : null;
};
