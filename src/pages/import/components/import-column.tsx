import { FC, useCallback, useMemo } from 'react';
import { Checkbox, Flex } from 'antd';
import { ImportActionType, TSelectedColumn, useImport } from 'context/import-context';
import { TImportColumn } from '../types';
import { useGetPropertyCount } from 'api/import/use-get-property-count';
import { useDataSheetWrapper } from 'components/layouts/components/data-sheet/wrapper';

export const ImportColumn: FC<TImportColumn> = ({ name, dataIndex }) => {
  const { state, dispatch } = useImport();
  const { nodeTypeId } = useDataSheetWrapper();

  const { data: propertyes } = useGetPropertyCount(nodeTypeId as string);

  const addSuffixColumName = useCallback(
    (key: string): string => {
      const arr = [...(state?.columnRow || [])] as string[];
      const CT = arr.filter((col) => col === key).length;

      const uniqId = Math.random().toString(36).substring(2, 4);

      if (CT > 1) return `${key}_${uniqId}`;

      return key;
    },
    [state?.columnRow]
  );

  const updateDisableCheckBox = useCallback(
    (data: TSelectedColumn[]): TSelectedColumn[] => {
      const CT = data.filter((el) => el.checked && !el.disabled).length;
      const exceedsLimit = CT + (propertyes?.count ?? 0) > 24;

      return data.map((el, index) => {
        if (exceedsLimit && el.disabled && el.checked) {
          return { ...el, disabled: false, checked: false };
        }
        if (exceedsLimit && !el.checked) {
          return { ...el, disabled: true, checked: false };
        }
        return { ...el, disabled: false };
      });
    },
    [propertyes?.count]
  );

  const handleChangeColumnRow = useCallback(
    (name: string, dataIndex: number) => {
      let data: TSelectedColumn[] = [...(state?.selectedColumnRow || [])] as TSelectedColumn[];

      data[dataIndex].checked = !data[dataIndex].checked;

      data = data.sort((a, b) => a.index - b.index);

      data = updateDisableCheckBox(data);

      dispatch({ type: ImportActionType.IMPORT_SELECT_COLUMN, payload: { selectedColumnRow: data } });
    },
    [dispatch, state?.selectedColumnRow, updateDisableCheckBox]
  );

  const columnName = useMemo(() => addSuffixColumName(name), [name, addSuffixColumName]);

  return (
    <Flex gap={8}>
      {state?.step === 1 && (
        <Checkbox
          onChange={() => handleChangeColumnRow(columnName, dataIndex)}
          disabled={state?.selectedColumnRow?.[dataIndex]?.disabled || propertyes.count >= 24}
          checked={state?.selectedColumnRow?.[dataIndex]?.checked ?? false}
        />
      )}
      {columnName}
    </Flex>
  );
};
