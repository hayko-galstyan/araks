import React, { useCallback, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Button, Col, Row, Space, Table } from 'antd';
import { useGetProjectNodeTypeProperties } from 'api/project-node-type-property/use-get-project-node-type-properties';
import { useDataSheetWrapper } from 'components/layouts/components/data-sheet/wrapper';
import { PropertyTypes } from 'components/form/property/types';
import { ImportActionType, ItemMapping, TSelectedColumn, useImport } from 'context/import-context';
import { Input } from 'components/input';
import { VerticalSpace } from 'components/space/vertical-space';
import { SecondaryText } from 'components/typography';
import { COLORS } from 'helpers/constants';
import { Select } from 'components/select';
import { ColumnsType } from 'antd/es/table';
import { ImportMappingIgnoreErrorsModal } from 'components/modal/import-mapping-ignore-errors-modal';
import { ExcelType } from 'pages/import/types';
import { addSuffixProperty, generateNewRowProperty, processDataWithType } from './utils';
import './import-table.css';
import { PropertyDataTypeSelect } from 'components/select/property-data-type-select';
import { useAuth } from 'context/auth-context';
import { detectType, validationPropertyName } from 'helpers/utils';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { ProjectTypePropertyReturnData } from 'api/types';

const { Option } = Select;

const dataTypesSelect = ['text', 'date', 'integer', 'decimal', 'boolean', 'url'];

export const ImportTable: React.FC = () => {
  const { nodeTypeId } = useDataSheetWrapper();
  const [count, setIsCount] = useState(0);
  const { state, dispatch } = useImport();

  const user = useAuth();
  const { id: project_id } = useParams();

  const [rowData, setRowData] = useState<ItemMapping[]>([]);

  const checkColumnName = (name: string, data: ProjectTypePropertyReturnData[]) => {
    const firstIndex = data.findIndex((col) => col.name === validationPropertyName(name));
    return firstIndex !== -1 ? true : false;
  };

  const clearRowData = useCallback((record: ItemMapping, isDefaultProperty = false) => {
    setRowData((prevData) =>
      prevData?.map(({ check, importedFields, ...item }) => ({
        ...item,
        ...(item.key !== record.key && !isDefaultProperty ? { check, importedFields } : {}),
      }))
    );
  }, []);

  const calcPercent = (record: ItemMapping) => {
    if (!record?.check?.allData || Number.isNaN(record?.check.allData) || Number.isNaN(record?.check.emptyValue)) {
      return 0;
    }

    return Math.round(((record?.check.allData - record?.check.emptyValue) * 100) / record?.check.allData);
  };

  const changeStateWithPayload = useCallback(
    (data: ItemMapping[], error?: boolean) => {
      dispatch({
        type: ImportActionType.IMPORT_MAPPING_SET_COLUMNS,
        payload: {
          columns: data,
          mapping: data,
          columnsMapped: data,
          mappingHasWarning: error,
        },
      });
    },
    [dispatch]
  );

  const handleFieldChange = (record: ItemMapping, value?: unknown, isDefaultProperty = false) => {
    const property = validationPropertyName(value as string);

    let updatedRowData: ItemMapping[] = [];

    if (!value) {
      clearRowData(record);
      updatedRowData = rowData?.filter((item) => !!item.importedFields && item.key !== record.key) ?? [];
      if (isDefaultProperty) {
        dispatch({
          type: ImportActionType.IMPORT_MAPPING_CLEAR_DATA,
          payload: {},
        });
        return;
      }
    } else {
      setRowData((prevData) => {
        const title = addSuffixProperty(property, prevData);
        updatedRowData =
          prevData?.map((item) =>
            item.key === record.key
              ? ({
                  ...item,
                  importedFields: value,
                  dataFields: `${item?.disabled ? item?.property.name : title} (${item.property.ref_property_type_id})`,
                  title: title,
                  property: {
                    ...record?.property,
                    name: item?.disabled ? item?.property.name : title,
                  },
                  importedFieldsIndex: !state.isCSV ? state.columnRow?.findIndex((item) => item === value) : undefined,
                } as ItemMapping)
              : item
          ) ?? [];

        return updatedRowData;
      });
    }

    const processResult = processDataWithType(updatedRowData, (state.sheetData as ExcelType).data, state.isCSV);

    if (processResult.wrongDataInfo && !!value) {
      updatedRowData = updatedRowData.map((item) => {
        if (item.key === record.key) {
          return {
            ...item,
            check: {
              matched: !processResult.wrongDataInfo[record.key]?.count,
              ...processResult.wrongDataInfo[record.key],
            },
          };
        }
        return item;
      });

      setRowData(updatedRowData);
    }

    dispatch({
      type: ImportActionType.IMPORT_MAPPING_SAVE_DATA,
      payload: {
        sheetData: processResult.data,
        mappingHasWarning:
          !!processResult.wrongDataInfo[record.key]?.count ||
          rowData.filter((data) => data.key !== record.key).findIndex((wData) => wData.check?.count) > -1,
        mapping: updatedRowData,
        columns: updatedRowData,
      },
    });
  };

  /* get value import fields with property name */

  const getValueImportFields = useCallback(
    (name: string) => {
      if (!state?.selectedColumnRow?.length) {
        return '';
      }

      const existIndex = state.selectedColumnRow.findIndex((el) => name === validationPropertyName(el.name));

      if (existIndex !== -1) {
        return state.selectedColumnRow[existIndex].name;
      }
      return state.selectedColumnRow[0]?.name;
    },
    [state.selectedColumnRow]
  );

  // auto create dataSource and dataSave

  const autoAddData = useCallback(
    (data: ItemMapping[]) => {
      const dataToProcess: ItemMapping[] = [];

      data.forEach((record) => {
        const value = getValueImportFields(record.property.name);

        dataToProcess.push({
          ...record,
          importedFieldsIndex: !state.isCSV ? state.columnRow?.findIndex((item) => item === value) : undefined,
          importedFields: value,
        } as ItemMapping);
      });

      const processResult = processDataWithType(dataToProcess, (state.sheetData as ExcelType).data, state.isCSV);

      dispatch({
        type: ImportActionType.IMPORT_MAPPING_SAVE_DATA,
        payload: {
          sheetData: processResult.data,
          mapping: dataToProcess,
        },
      });
    },
    [state.isCSV, state.columnRow, state.sheetData, dispatch, getValueImportFields]
  );

  useGetProjectNodeTypeProperties(nodeTypeId, {
    enabled: !!nodeTypeId,
    onSuccess: (data) => {
      const propertiesFielter = data.filter(
        (row) =>
          row.ref_property_type_id !== PropertyTypes.IMAGE_URL &&
          row.ref_property_type_id !== PropertyTypes.Document &&
          row.ref_property_type_id !== PropertyTypes.Location &&
          row.ref_property_type_id !== PropertyTypes.Connection
      );
      const selectedColumns = state?.selectedColumnRow ?? [];

      const dataTypes: { index: number | string; type: string }[] = [];

      setIsCount(data.length - propertiesFielter.length);

      if (!state.isCSV) {
        selectedColumns?.forEach((item, index) => {
          const typeArr = { index: index, type: PropertyTypes.Text };

          Object.entries((state.sheetData as ExcelType).data).forEach(([key, value]) => {
            const type = detectType(value[index]);
            typeArr.type = type;
          });

          if (!checkColumnName(item.name, propertiesFielter)) {
            dataTypes.push(typeArr);
          }
        });
      } else {
        selectedColumns?.forEach((key: TSelectedColumn, index: number) => {
          const typeArr = { index: index, type: PropertyTypes.Text };

          (state?.sheetData as ExcelType)?.data.forEach((item) => {
            const value = String(item[key.name as keyof typeof item]);
            const type = detectType(value.trim());
            typeArr.type = type;
          });

          if (!checkColumnName(key.name, propertiesFielter)) {
            dataTypes.push(typeArr);
          }
        });
      }

      const autoImportColumn: ItemMapping[] = selectedColumns
        .filter((item) => !checkColumnName(item.name, propertiesFielter))
        .map((item, i) => {
          const uniqueId = crypto.randomUUID();
          const value = validationPropertyName(item.name);
          return {
            dataFields: `${value} (${dataTypes[i].type})`,
            dataIndex: `${uniqueId}`,
            key: `${uniqueId}`,
            title: `${value}`,
            importedFields: item.name,
            importedFieldsIndex: !state.isCSV
              ? state.columnRow?.findIndex((item) => item === getValueImportFields(value))
              : undefined,
            property: generateNewRowProperty({
              name: value,
              project_id: project_id,
              project_type_id: nodeTypeId,
              user_id: user?.user?.id,
              type: dataTypes[i].type,
              key: uniqueId,
            }),
            disabled: false,
          };
        });

      const combinedRowData: ItemMapping[] = [
        ...propertiesFielter.map((item) => ({
          dataFields: `${item.name} (${item.ref_property_type_id})`,
          dataIndex: `${item.id}`,
          key: `${item.id}`,
          title: `${item.name}`,
          property: item,
          disabled: true,
          importedFieldsIndex: !state.isCSV
            ? state.columnRow?.findIndex((col) => col === getValueImportFields(item.name))
            : undefined,
          importedFields: getValueImportFields(item.name),
        })),
        ...autoImportColumn,
      ];

      setRowData(combinedRowData);

      autoAddData(combinedRowData);

      dispatch({
        type: ImportActionType.IMPORT_MAPPING_SET_COLUMNS,
        payload: {
          columnsMapped: combinedRowData,
          columns: combinedRowData,
          type_id: nodeTypeId,
        },
      });
    },
  });

  /* remove column */

  const removeColumnMapping = (key: string) => {
    const newColumnMapping = rowData.filter((item) => item.key !== key);
    setRowData(newColumnMapping);
    autoAddData(newColumnMapping);
    changeStateWithPayload(newColumnMapping);
  };

  /* add column create new uniqueId */

  const addColumnMapping = () => {
    const uniqueId = crypto.randomUUID();
    const title = addSuffixProperty('new_property', rowData);
    setRowData((prev) => {
      const updatedRowData = [
        ...prev,
        {
          dataFields: `${title} (${PropertyTypes.Text})`,
          dataIndex: `${uniqueId}`,
          key: `${uniqueId}`,
          title: title,
          importedFields: state?.selectedColumnRow?.[0].name,
          property: generateNewRowProperty({
            name: title,
            project_id: project_id,
            project_type_id: nodeTypeId,
            user_id: user?.user?.id,
            type: PropertyTypes.Text,
            key: uniqueId,
          }),
          disabled: false,
        },
      ];

      autoAddData(updatedRowData);

      dispatch({
        type: ImportActionType.IMPORT_MAPPING_SET_COLUMNS,
        payload: {
          columnsMapped: updatedRowData,
          columns: updatedRowData,
          type_id: nodeTypeId,
        },
      });

      return updatedRowData;
    });
  };

  const changeTypeProperty = (type: string, key: string) => {
    const data = [...rowData];
    const target = data.find((col) => col.key === key);

    if (target?.property) {
      target.property.ref_property_type_id = type;
      handleFieldChange(target, getValueImportFields(target.property.name), target.disabled);
    }
  };

  const handleChangeInputValue = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>, key: string) => {
      const name = e.target.value;

      const updatedRowData = rowData.map((colItem) => {
        if (colItem.key === key) {
          let value = validationPropertyName(name);
          value = addSuffixProperty(value, rowData);

          return {
            ...colItem,
            property: {
              ...colItem.property,
              name: value,
            },
            title: value,
            dataFields: `${value} (${colItem.property.ref_property_type_id})`,
            errorMessage: value ? '' : 'Field is required',
          };
        }
        return colItem;
      });

      setRowData(updatedRowData);

      const hasErrors = updatedRowData.some((item) => Boolean(item.errorMessage));

      autoAddData(updatedRowData);

      changeStateWithPayload(updatedRowData, hasErrors);
    },
    [changeStateWithPayload, rowData, autoAddData]
  );

  const columns: ColumnsType<ItemMapping> = [
    {
      dataIndex: 'action',
      key: 'action',
      className: 'on-top',
      width: '24px',
      render: (_: unknown, record: ItemMapping, index: number) =>
        !record?.disabled && (
          <MinusCircleOutlined
            onClick={() => removeColumnMapping(record?.key)}
            style={{ cursor: 'pointer', paddingTop: '10px' }}
          />
        ),
    },
    {
      title: 'Data schema fields',
      dataIndex: 'dataFields',
      key: 'dataFields',
      render: (_: unknown, record: ItemMapping, index: number) => {
        return (
          <VerticalSpace size={2}>
            {index === 0 && (
              <SecondaryText color={COLORS.PRIMARY.BLUE} disabled>
                Default property
              </SecondaryText>
            )}
            <Input
              value={`${record.property.name}`}
              onChange={(e) => handleChangeInputValue(e, record?.key)}
              disabled={record?.disabled}
            />
            <Space>
              {record.property.required_type && (
                <SecondaryText color={COLORS.SECONDARY.GREEN_LIGHT}>Required</SecondaryText>
              )}
              {record.property.unique_type && (
                <SecondaryText color={COLORS.SECONDARY.GREEN_LIGHT}>Unique</SecondaryText>
              )}
              {record.property.multiple_type && <SecondaryText color="#C3C3C3">Multiple</SecondaryText>}
              {record.errorMessage && <SecondaryText color={COLORS.ALERT.RED}>{record.errorMessage}</SecondaryText>}
            </Space>
          </VerticalSpace>
        );
      },
    },
    {
      title: 'Data Type',
      dataIndex: 'dataType',
      key: 'dataType',
      className: 'on-top',
      render: (_: unknown, record: ItemMapping, index: number) => {
        return (
          <VerticalSpace size={2}>
            {index === 0 && <SecondaryText color={COLORS.PRIMARY.BLUE}>Data Type </SecondaryText>}
            <PropertyDataTypeSelect
              onSelect={(value) => changeTypeProperty(value, record.key)}
              disabled={record?.disabled}
              codes={dataTypesSelect.toString()}
              defaultValue={record?.property?.ref_property_type_id}
            />
          </VerticalSpace>
        );
      },
    },
    {
      title: 'Imported fields',
      dataIndex: 'importedFields',
      key: 'importedFields',
      className: 'on-top',
      render: (_: unknown, record: ItemMapping, index: number) => (
        <VerticalSpace size={2}>
          {index === 0 && <SecondaryText color={COLORS.PRIMARY.BLUE}>Default property </SecondaryText>}
          <Select
            style={{ width: '100%' }}
            placeholder="Select"
            defaultValue={getValueImportFields(record.property.name)}
            onChange={(value) => {
              handleFieldChange(record, value, !index);
            }}
            onClear={() => {
              clearRowData(record, !index);
            }}
          >
            {state.columnRow?.map((item) => (
              <Option value={item} key={item}>
                {item}
              </Option>
            ))}
          </Select>
        </VerticalSpace>
      ),
    },
    {
      title: 'Matching process',
      dataIndex: 'check',
      key: 'check',
      className: 'on-top',
      render: (_: unknown, record: ItemMapping) => {
        if (record?.check && record.check.matched) {
          return (
            <VerticalSpace size={0}>
              <SecondaryText color={COLORS.SECONDARY.GREEN_LIGHT}>Matched to the column</SecondaryText>
              <SecondaryText color="#C3C3C3">{`${calcPercent(record)}% of rows have a value`}</SecondaryText>
            </VerticalSpace>
          );
        }
        if (record?.check && !record.check.matched) {
          return (
            <Row align="middle">
              <Col span={12}>
                <VerticalSpace size={0}>
                  <SecondaryText
                    color={COLORS.SECONDARY.MAGENTA}
                  >{`${record?.check.count} validation errors`}</SecondaryText>
                  <SecondaryText color="#C3C3C3">{`${calcPercent(record)}% of rows have a value`}</SecondaryText>
                </VerticalSpace>
              </Col>
              <Col span={12}>
                <ImportMappingIgnoreErrorsModal
                  count={record?.check.count}
                  onClose={() => {
                    setRowData((prevData) =>
                      prevData?.map((item) =>
                        item.key === record.key
                          ? {
                              ...item,
                              check: {
                                ...(item.check || { allData: 0, emptyValue: 0 }),
                                matched: true,
                                count: 0,
                              },
                            }
                          : item
                      )
                    );

                    if (
                      rowData
                        .filter((item) => item.key !== record.key && item.check)
                        .findIndex((item) => !item.check?.matched) === -1
                    ) {
                      // there is no row with warning
                      dispatch({ type: ImportActionType.IMPORT_MAPPING_CLEAR_WARNING, payload: {} });
                    }
                  }}
                  onCancel={() => {
                    //clear selected value which has warnings
                    clearRowData(record);
                    handleFieldChange(record);
                  }}
                />
              </Col>
            </Row>
          );
        }

        return '';
      },
    },
  ];

  return (
    <>
      <Table dataSource={rowData} columns={columns} pagination={false} />
      <Button disabled={rowData.length + count > 24} block className="add-new-property" onClick={addColumnMapping}>
        <PlusOutlined />
        Add New Property
      </Button>
    </>
  );
};
