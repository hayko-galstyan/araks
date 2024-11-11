import React, { useCallback, useEffect, useRef, useState } from 'react';
import 'react-quill/dist/quill.snow.css';
import ReactQuill from 'react-quill';
import { useParams } from 'react-router-dom';
import { AnyObject } from 'antd/es/_util/type';
import { Button, Form, Input, Select, ColorPicker, TreeSelect, Spin } from 'antd';
import { ParamsTools, DINAMIC_FORM_NAME } from './params';
import { Text } from 'components/typography';
import { TTreeSelectType } from 'components/analytics/types';
import { useAnalytics } from 'context/analytics';
import { ACTIONS } from 'context/analytics/reducer';
import { TAnalyticsNodeTypeProperties } from 'api/types';
import { useGetAllNodeTypeProperties } from 'api/analytics/use-get-all-property-by-id';
import { useCreateBoardItem } from 'api/analytics/use-add-board-item';
import {
  AnalyticTools,
  AnalyticActionTypes,
  AnalyticToolForm,
  AnalyticOpearators,
  COLORS,
  AnalyticToolsDisabled,
  AnalyticPropertyType,
} from 'helpers/constants';
import { ToolParamsForm } from './styles';
import { transformDataToTreeSelect } from './utils';
import { CARD_OPERATOR, CHART_OPERATOR, OPERATOR_SELECT_OPTIONS } from './operators';
import { LoadingOutlined } from '@ant-design/icons';

const { INPUT, COLOR, TREESELECT, SELECT, TEXT_EDITOR } = AnalyticToolForm;
const { UPDATE } = AnalyticActionTypes;
const { CHART, TABLE, TEXT, CARD } = AnalyticTools;
const { COUNT } = AnalyticOpearators;
const { PRIMARY } = COLORS;

export const ToolParams: React.FC = () => {
  const { selectedTool, handleAction, tools, activeBoard, nodeTypeId } = useAnalytics();

  const operators = selectedTool?.name === CARD ? CARD_OPERATOR : CHART_OPERATOR;

  const [chartParams, setChartParams] = useState<TTreeSelectType[]>([]);
  const [options, setIsOptions] = useState([...OPERATOR_SELECT_OPTIONS, ...operators]);

  const [form] = Form.useForm();
  const { id } = useParams();

  const yAxisValue = Form.useWatch(DINAMIC_FORM_NAME.Y_AXIS, form);

  const paramsObjectRef = useRef<AnyObject>({});

  const { data: properties } = useGetAllNodeTypeProperties(nodeTypeId, { enabled: !!nodeTypeId });

  const { mutate: createBoardItemFn, isLoading: isCreateLoading } = useCreateBoardItem();

  const treeSelectData = transformDataToTreeSelect(properties as TAnalyticsNodeTypeProperties);

  const changeOperatorWidthType = useCallback(
    (nodeType: AnalyticPropertyType, operator?: string) => {
      // change operator with type
      if (nodeType) {
        const filterOperators = [...OPERATOR_SELECT_OPTIONS, ...operators].filter((item) =>
          item.type.includes(nodeType as AnalyticPropertyType)
        );
        setIsOptions(filterOperators);
        form.setFieldsValue({ operator: operator || filterOperators?.at(0)?.value });
      }
    },
    [form, operators]
  );

  const handleSelect = (value: string, node: TTreeSelectType, name: string) => {
    const data = [...chartParams];
    const index = data.findIndex((item) => item.id === value);

    if (name === 'yAxis') {
      changeOperatorWidthType(node.type as AnalyticPropertyType);
    }

    if (index !== -1) {
      const newData = data.filter((item) => item.id === value);
      setChartParams(newData);
    } else {
      setChartParams([
        ...chartParams,
        {
          id: value,
          name: node.name,
          type: node.type,
          project_type_id: node.project_type_id,
          project_type_name: node.project_type_name,
          target_edge_type_id: node.target_edge_type_id,
        },
      ]);
    }
  };

  const handleChange = (value: string[]) => {
    if (selectedTool?.action_type === UPDATE) {
      if (Array.isArray(value)) {
        const filteredData = chartParams.filter((data) => data.id && value.includes(data.id));
        setChartParams(filteredData || []);
      }
    }
  };

  useEffect(() => {
    paramsObjectRef.current = {};
    form.resetFields();
    setChartParams([]);
    if (selectedTool?.action_type === UPDATE) {
      if (tools[activeBoard]) {
        const formData = tools[activeBoard][selectedTool?.id];
        paramsObjectRef.current = formData;
        const isSimilarNodeTypeId = formData?.source_type_id === nodeTypeId;
        // check name and set form fields value
        switch (formData?.name) {
          case CHART: {
            form.setFieldsValue({
              title: formData.title,
              yAxis: isSimilarNodeTypeId ? formData?.params[1]?.property_type_id : null,
              xAxis: isSimilarNodeTypeId ? formData?.params[0]?.property_type_id : null,
              legend: formData.legend,
              operator: formData.operator,
              color: formData.color,
            });
            break;
          }
          case TABLE: {
            form.setFieldsValue({
              title: formData.title,
              columns: isSimilarNodeTypeId ? formData.params.map((item: AnyObject) => item.property_type_id) : null,
            });
            break;
          }
          case TEXT: {
            form.setFieldsValue({
              title: formData.title,
              editor: formData.params[0].additional,
            });
            break;
          }
          case CARD: {
            form.setFieldsValue({
              title: formData.title,
              yAxis: isSimilarNodeTypeId ? formData?.params[0]?.property_type_id : null,
              operator: formData.operator,
              color: formData.color,
            });
          }
        }

        if (formData && isSimilarNodeTypeId) {
          setChartParams(() =>
            formData?.params.map((item: AnyObject) => ({
              id: item.property_type_id,
              name: item.project_type_name,
              type: item.property_type,
              project_type_id: item.project_type_id,
              project_type_name: item.project_type_name,
              target_edge_type_id: item.target_edge_type_id,
            }))
          );

          const index = formData?.params.length % 2 === 0 ? 1 : 0;
          changeOperatorWidthType(formData.params[index].property_type, formData.operator);
        }
      }
    }
  }, [selectedTool, tools, activeBoard, form, nodeTypeId, operators, changeOperatorWidthType]);

  useEffect(() => {
    setIsOptions([...OPERATOR_SELECT_OPTIONS, ...operators]);
  }, [selectedTool, operators]);

  const onFinish = (data: AnyObject) => {
    let requestData;

    let [xAxisData, yAxisData, cardData]: TTreeSelectType[] = [{}, {}, {}];

    const globalParams = {
      fx: selectedTool?.action_type === UPDATE ? paramsObjectRef.current.fx : 10,
      fy: selectedTool?.action_type === UPDATE ? paramsObjectRef.current.fy : 10,
      width: selectedTool?.action_type === UPDATE ? paramsObjectRef.current.width : 300,
      height: selectedTool?.action_type === UPDATE ? paramsObjectRef.current.height : 300,
      project_id: id,
      title: data.title,
      name: selectedTool?.name,
      type: selectedTool?.type,
    };

    if (selectedTool?.name === CHART) {
      xAxisData = chartParams.find((el) => el.id === data.xAxis) as TTreeSelectType;
      yAxisData = chartParams.find((el) => el.id === data.yAxis) as TTreeSelectType;
    }

    if (selectedTool?.name === CARD) {
      cardData = chartParams.find((el) => el.id === data.yAxis) as TTreeSelectType;
    }

    if (data['color']) {
      if (data['color'] !== paramsObjectRef?.current?.color) {
        data['color'] = data['color'].toHexString();
      }
    }

    switch (selectedTool?.name) {
      case CHART: {
        // x default params
        const xParam = {
          property_type_id: data.xAxis,
          project_type_id: xAxisData.project_type_id,
          property_type: xAxisData?.name === 'name' ? 'name' : xAxisData?.type,
          entity_type: 'node',
          property_type_name: xAxisData?.name,
          axis: 'x_axis',
        };

        // y default params
        const yParam = {
          property_type_id: data.yAxis,
          project_type_id: yAxisData.project_type_id,
          property_type: yAxisData?.name === 'name' ? 'name' : yAxisData?.type,
          entity_type: 'node',
          property_type_name: yAxisData?.name,
          axis: 'y_axis',
        };

        requestData = {
          id: paramsObjectRef.current.id,
          ...globalParams,
          operator: data.operator || COUNT,
          color: data.color || COLORS.PRIMARY.BLUE,
          legend: data.legend || false,
          source_type_id: nodeTypeId,
          params: [xParam, yParam],
        };
        break;
      }

      case TABLE: {
        /* table default params */
        const table_params = chartParams.map((item) => ({
          project_type_id: item.project_type_id,
          project_type_name: item.project_type_name,
          property_type_id: item.id,
          target_edge_type_id: item.target_edge_type_id,
          property_type_name: item.name,
          property_type: item?.name === 'name' ? 'name' : item?.type,
          entity_type: 'node',
          axis: 'colum',
        }));

        requestData = {
          id: paramsObjectRef.current.id,
          ...globalParams,
          operator: COUNT,
          source_type_id: nodeTypeId,
          params: table_params,
        };
        break;
      }

      case TEXT: {
        // default param editor
        const editor_params = {
          property_type_name: 'text',
          axis: 'text',
          additional: data.editor,
        };

        requestData = {
          id: paramsObjectRef.current.id,
          project_id: id,
          title: data.title,
          name: selectedTool.name,
          type: selectedTool.type,
          params: [editor_params],
        };
        break;
      }

      case CARD: {
        // card param
        const card_param = {
          project_type_id: cardData.project_type_id,
          project_type_name: cardData.project_type_name,
          property_type_id: cardData.id,
          property_type_name: cardData.name,
          property_type: cardData?.name === 'name' ? 'name' : cardData?.type,
          entity_type: 'node',
          axis: 'card',
        };

        requestData = {
          id: paramsObjectRef.current.id,
          ...globalParams,
          operator: data.operator,
          source_type_id: nodeTypeId,
          color: data.color || COLORS.PRIMARY.BLUE,
          params: [card_param],
        };
        break;
      }

      default:
        break;
    }

    createBoardItemFn(
      { id: activeBoard, data: requestData as AnyObject },
      {
        onSuccess: (data) => {
          handleAction({
            type: ACTIONS.ADD_TOOL_DASHBOARD,
            payload: data.data,
          });
          setChartParams([]);
        },
      }
    );

    form.resetFields();
  };

  if (!selectedTool) {
    return null;
  }

  if (!nodeTypeId && AnalyticToolsDisabled[selectedTool?.name as keyof typeof AnalyticToolsDisabled]) {
    return null;
  }

  return (
    <ToolParamsForm vertical>
      <Text style={{ fontSize: 16 }}>
        Parameters ({selectedTool?.name} / {selectedTool?.type})
      </Text>
      <Form layout="vertical" form={form} onFinish={onFinish}>
        {ParamsTools.map((tool) => {
          if (tool.type === selectedTool?.name) {
            return tool.items.map((item) => {
              return (
                <React.Fragment key={item.name}>
                  {item.name !== DINAMIC_FORM_NAME.OPERATOR && (
                    <Form.Item
                      label={<Text style={{ fontSize: 14, fontWeight: 400 }}>{item.label}</Text>}
                      name={item.name}
                      rules={[{ required: item.required, message: item.message }]}
                    >
                      {item.type === INPUT ? (
                        <Input className="analytic-form-input" placeholder={item.placeholder} />
                      ) : item.type === COLOR ? (
                        <ColorPicker defaultValue={item.color} />
                      ) : item.type === SELECT ? (
                        <Select
                          className="analytic-form-select"
                          placeholder={item.placeholder}
                          defaultValue={item.options?.at(0)?.value}
                          value={undefined}
                          mode={item.mode}
                          options={item.options}
                        />
                      ) : item.type === TREESELECT ? (
                        <TreeSelect
                          className="analytic-form-tree-select"
                          placeholder={item.placeholder}
                          showSearch={false}
                          treeLine
                          treeCheckable={item.mode === 'multiple'}
                          multiple={item.mode === 'multiple'}
                          treeData={[treeSelectData]}
                          treeNodeLabelProp="title"
                          onSelect={(value, node) => handleSelect(value, node, item.name)}
                          onChange={(value) => handleChange(value)}
                        />
                      ) : item.type === TEXT_EDITOR ? (
                        <ReactQuill
                          modules={{
                            toolbar: [
                              ['bold', 'italic', 'underline', 'strike'],
                              [{ script: 'sub' }, { script: 'super' }],
                              [{ size: [] }, false],
                              [{ color: [] }, { background: [] }],
                              [{ align: [] }],
                            ],
                          }}
                          theme="snow"
                          placeholder={item.placeholder}
                          style={{ background: PRIMARY.WHITE, minHeight: 300, fontSize: 14 }}
                          className="analytic-editor"
                        />
                      ) : null}
                    </Form.Item>
                  )}

                  {item.name === DINAMIC_FORM_NAME.OPERATOR && yAxisValue && (
                    <Form.Item
                      label={item.label}
                      name={item.name}
                      rules={[{ required: item.required, message: item.message }]}
                    >
                      <Select placeholder={item.placeholder} mode={item.mode} options={options} />
                    </Form.Item>
                  )}
                </React.Fragment>
              );
            });
          }
          return null;
        })}
        <Button htmlType="submit" type="primary">
          Apply
          <Spin indicator={<LoadingOutlined style={{ color: COLORS.PRIMARY.WHITE }} />} spinning={isCreateLoading} />
        </Button>
      </Form>
    </ToolParamsForm>
  );
};
