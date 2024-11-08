import React, { useCallback, useEffect, useState } from 'react';
import { Checkbox, Flex } from 'antd';
import { CheckboxChangeEvent } from 'antd/es/checkbox';
import { ImportActionType, TSelectedColumn, useImport } from '../../../context/import-context';
import { useDataSheetWrapper } from '../../layouts/components/data-sheet/wrapper';
import { useGetPropertyCount } from '../../../api/import/use-get-property-count';

export const CheckedAllColumns: React.FC = () => {
  const { state, dispatch } = useImport();
  const { nodeTypeId } = useDataSheetWrapper();

  const { data: propertyes } = useGetPropertyCount(nodeTypeId as string);

  const [checked, setIsChecked] = useState(true);

  const generateSelectedColumns = useCallback((): TSelectedColumn[] => {
    if (!state?.columns?.length) {
      return [];
    }

    let data = [...state.columns];
    data = state.isCSV ? data : data.slice(1);

    return data.map((column, index) => {
      let isChecked = true;
      let isDisabled = false;
      if (propertyes.count >= 24) {
        isChecked = false;
        isDisabled = true;
      } else {
        const maxCount = index + propertyes.count + 1;
        isChecked = index + 1 <= (maxCount > 24 ? 24 : maxCount);
        isDisabled = index + 1 > (maxCount > 24 ? 24 : maxCount);
      }

      return {
        index: index,
        name: column.key as string,
        checked: isChecked,
        disabled: isDisabled,
      };
    });
  }, [propertyes?.count, state.columns, state.isCSV]);

  const dispatchSelectedColumns = useCallback(
    (columns: TSelectedColumn[]) => {
      dispatch({
        type: ImportActionType.IMPORT_SELECT_COLUMN,
        payload: { selectedColumnRow: columns },
      });
    },
    [dispatch]
  );

  const handleChangeCheckBox = useCallback(
    (e: CheckboxChangeEvent) => {
      const { checked } = e.target;
      if (checked) {
        const selectedColumns = generateSelectedColumns();
        dispatchSelectedColumns(selectedColumns);
      } else {
        const selectedColumns = (state.selectedColumnRow || []).map((el) => ({
          ...el,
          checked: false,
          disabled: false,
        }));
        dispatchSelectedColumns(selectedColumns);
      }
      setIsChecked((prev) => !prev);
    },
    [generateSelectedColumns, dispatchSelectedColumns, state.selectedColumnRow]
  );

  useEffect(() => {
    if (!state.selectedColumnRow?.length) {
      const selectedColumns = generateSelectedColumns();
      dispatchSelectedColumns(selectedColumns);
      setIsChecked(true);
      return;
    } else {
      const data = state.selectedColumnRow.filter((el) => el.checked || el.disabled);
      setIsChecked(data.length === state.columnRow?.length);
    }
  }, [
    dispatchSelectedColumns,
    generateSelectedColumns,
    state.columnRow?.length,
    state.selectedColumnRow,
    state.selectedColumnRow?.length,
  ]);

  return (
    <Flex gap={8}>
      <Checkbox
        checked={checked}
        disabled={propertyes?.count >= 24}
        onChange={(check) => handleChangeCheckBox(check)}
      />
      Check All
    </Flex>
  );
};
