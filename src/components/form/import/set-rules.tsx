import { Form, Radio } from 'antd';
import { GetTypeNodes } from 'api/node/use-get-type-nodes';
import { Text } from 'components/typography';
import { ImportActionType, SetImportRule, useImport } from 'context/import-context';
import { COLORS, DEFAULT_PAGE_NUMBER, DEFAULT_PAGE_SIZE, ORDER } from 'helpers/constants';
import { useEffect } from 'react';
import { FormItem } from '../form-item';

type FirstRowISColumn = {
  setRulesSkip: SetImportRule;
};

/**
 *
 * @returns if not skip then overwrite
 */
export const SetRules = () => {
  const options = Object.values(SetImportRule);
  const [form] = Form.useForm();
  const { state, dispatch } = useImport();

  const { count: dataCount } = GetTypeNodes(
    { page: DEFAULT_PAGE_NUMBER, size: DEFAULT_PAGE_SIZE, sortOrder: ORDER.DESC, filters: [] },
    state.type_id,
    {
      enabled: true,
    }
  );

  useEffect(() => {
    if (state.setRulesSkipOverwrite) {
      form.setFieldValue('setRulesSkip', state.setRulesSkipOverwrite);
    }
  }, [form, state.setRulesSkipOverwrite]);

  const onFinish = (values: FirstRowISColumn) => {
    dispatch({
      type: ImportActionType.IMPORT_SET_RULE_ACTION,
      payload: { setRulesSkipOverwrite: values.setRulesSkip },
    });
  };
  return (
    <Form name="import-set-rules" form={form} onFinish={onFinish} autoComplete="off" layout="vertical">
      <FormItem
        name="setRulesSkip"
        label={
          <Text strong color={COLORS.PRIMARY.GRAY_DARK}>
            Choose the option that best suits your needs to proceed with the import.
          </Text>
        }
        onChange={() => {
          form.submit();
        }}
      >
        <Radio.Group disabled={!dataCount}>
          {options.map((option) => (
            <Radio key={option} value={option} style={{ textTransform: 'capitalize' }}>
              <Text color={COLORS.PRIMARY.GRAY_DARK}>{option}</Text>
            </Radio>
          ))}
        </Radio.Group>
      </FormItem>
    </Form>
  );
};
