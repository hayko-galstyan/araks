import { Dispatch, SetStateAction, useCallback, useEffect, useState } from 'react';
import { CloseOutlined } from '@ant-design/icons';
import { PlusAction } from 'components/actions/plus';
import { Button, Col, Drawer, Form, Radio, Row, Space } from 'antd';
import { VisualizationSubmitType } from 'api/neo4j/types';
import { useQueriesVisualization } from 'api/neo4j/use-queries-visualization';
import { useGetQueryByid } from 'api/query-history/use-get-histories-by-id';
import { QueriesForm } from 'components/form/all-data/queries-form';
import { getQueryFilterType, QueryFilterTypes, setQueryFormValue } from 'components/select/queries-select';
import { VerticalSpace } from 'components/space/vertical-space';
import { UsefulInformationTooltip } from 'components/tool-tip/useful-information-tooltip';
import { useOverview } from 'context/overview-context';
import { TreeConnectionType, TreeNodeType } from 'pages/data-sheet/types';
import styled from 'styled-components';
import { formattedData } from '../layouts/components/visualisation/helpers/format-node';
import { initData } from '../layouts/components/visualisation/container/initial/nodes';
import { useGraph } from '../layouts/components/visualisation/wrapper';
import {
  StyledAddButton,
  StyledButtonsWrapper,
  StyledCleanButton,
  StyledRunButton,
} from '../../pages/project-visualisation/components/buttons/styles';
import { useGetData } from '../../api/visualisation/use-get-data';
import { graphRender } from '../layouts/components/visualisation/helpers/utils';
import { Dayjs } from 'dayjs';
import { getQueryValue } from 'helpers/utils';
import { SaveQueryModal } from 'pages/project-visualisation/query-section/SaveQueryModal';
import { UpdateQueryModal } from 'pages/project-visualisation/query-section/UpdateQueryModal';
import { useParams } from 'react-router-dom';
import { COLORS, NODE_LIMIT } from 'helpers/constants';

type Props = {
  isQueries?: boolean;
  activeQuerisID?: { name: string; id: string } | null;
  setActiveQuerisID?: (activeQuerisID: { name: string; id: string } | null) => void;
  queryCollapsed?: boolean;
  setQueryCollapsed?: Dispatch<SetStateAction<boolean>>;
};

const StyledRadioButton = styled(Radio.Group)`
  .ant-radio-button-wrapper {
    border: none;

    &.ant-radio-button-wrapper-checked {
      border-radius: 4px;
      background: #232f6a;
      display: inline-flex;
      align-items: center;
      padding: 0 16px;
      &:hover {
        opacity: 0.8;
        background: #232f6a;
      }
    }
  }

  .ant-radio-button-wrapper:nth-child(2)::before {
    content: none;
  }
`;
const ButtonText = styled.text`
  font-family: 'Rajdhani';
  font-size: 16px;
  font-weight: 400;
  color: ${(props) => props.color || 'black'};
`;
interface StyledButtonProps {
  styleType: 'active' | 'passive';
}
const StyledButton = styled(Button)<StyledButtonProps>`
  border: none;
  border-radius: 4px;
  margin-left: 20px;
  justify-content: center;
  align-items: center;
  background-color: ${(props) =>
    props.styleType === 'active' ? COLORS.PRIMARY.WHITE : COLORS.PRIMARY.BLUE} !important;
  color: ${(props) => (props.styleType === 'active' ? COLORS.PRIMARY.BLUE : COLORS.PRIMARY.GRAY_LIGHT)};
  border-width: 1px;
  border-style: solid;
  border-color: ${COLORS.PRIMARY.BLUE};
  transition: transform 0.2s ease, box-shadow 0.2s ease;

  &:hover {
    cursor: ${(props) => (props.disabled ? 'not-allowed' : 'pointer')};
    transform: ${(props) => !props.disabled && 'scale(1.01)'};
    box-shadow: ${(props) => !props.disabled && '0px 4px 15px rgba(0, 0, 0, 0.2)'};

    .anticon {
      color: ${COLORS.PRIMARY.WHITE};
    }
  }

  &:active {
    transform: ${(props) => !props.disabled && 'scale(1)'};
    box-shadow: ${(props) => !props.disabled && '0px 2px 10px rgba(0, 0, 0, 0.15)'};
  }
`;


export type FormQueryValues = {
  operator: 'AND' | 'OR';
  queries: (
    | TreeNodeType
    | (TreeConnectionType & {
        type: QueryFilterTypes;
        typeText: string;
      })
  )[];
};

export const getDate = (d: Dayjs) => d?.format('YYYY-MM-DD');

export const QueriesButton = ({
  isQueries,
  activeQuerisID,
  setActiveQuerisID,
  queryCollapsed,
  setQueryCollapsed,
}: Props) => {
  const params = useParams();
  const [filter, setFilter] = useState<VisualizationSubmitType>({} as VisualizationSubmitType);
  const [formStatus, setFormStatus] = useState<'save' | 'run'>('run');
  const [openTable, setOpenTable] = useState(false);
  const [isSaveModalOpen, setIsSaveModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [drawerContentHeight, setDrawerContentHeight] = useState('100%');
  const { graph, setGraphInfo } = useGraph() ?? {};
  const { nodes: nodesList, edges: edgesList, count, relationsCounts } = useGetData();

  const { hideLeftSection, setHideLeftSection } = useOverview();
  const [form] = Form.useForm();

  const { mutate } = useQueriesVisualization(filter, {
    enabled: !!filter.queryArr?.length,
    onSuccess: (data) => {
      if (!data.nodes.length) {
        initData(graph, { edges: [], nodes: [] });
        graphRender(graph);
        setGraphInfo({
          nodeCount: 0,
        });
      } else {
        const { nodes, edges } = formattedData(data?.nodes, data?.edges, data.relationsCounts);
        const result = { nodes: nodes || [], edges: edges || [] };
        initData(graph, result);
        graphRender(graph);
        setGraphInfo({
          nodeCount: graph.getNodes().length,
        });
      }
    },
  });
  useGetQueryByid(params.id ?? '', activeQuerisID?.id ?? '', {
    enabled: !!params.id && !!activeQuerisID,
    onSuccess: (data) => {
      form.setFieldsValue({
        operator: data.data.operator,
        queries: setQueryFormValue(data),
      });
    },
  });
  const initGraphData = () => {
    const data = formattedData(nodesList ?? [], edgesList ?? [], relationsCounts);
    if (data !== undefined) initData(graph, data);
    setGraphInfo({
      nodeCount: (count ?? 0) > NODE_LIMIT ? NODE_LIMIT : count,
    });
    graphRender(graph);
  };

  const onClose = () => {
    setHideLeftSection(false);
    form.resetFields();
  };

  const clearFilter = useCallback(() => {
    setFilter({} as VisualizationSubmitType);
  }, []);

  const handleCleanAll = () => {
    form.resetFields();
    initGraphData();
    setActiveQuerisID && setActiveQuerisID(null);
  };

  const onFinish = (values: FormQueryValues) => {
    if (formStatus === 'run') {
      const dataToMap = values.queries;
      let queryArr;
      if (values.operator === 'AND') {
        queryArr = dataToMap
          .filter(Boolean)
          .map((query) => ({
            type: query.isConnectionType ? 'relation' : 'node',
            label: query.labelValue,
            ...((query.isConnectionType && query.depth !== 3) || (!query.isConnectionType && query.depth === 1)
              ? { action: getQueryFilterType(query.type) }
              : {}),
            ...(query.isConnectionType && query.depth !== 1 ? { project_edge_type_id: query.id } : {}),
            query:
              (query.isConnectionType && query.depth === 3) || (!query.isConnectionType && query.depth === 2)
                ? dataToMap.reduce((acc, item, index) => {
                    if (item.depth === query.depth && item.labelValue === query.labelValue) {
                      delete dataToMap[index];

                      return {
                        ...acc,
                        [item.name]: {
                          type: item.ref_property_type_id,
                          action: getQueryFilterType(item.type),
                          multiple: item.multiple_type,
                          value: getQueryValue(item),
                        },
                      };
                    }
                    return acc;
                  }, {})
                : {},
          }))
          .filter((item) => (!item.action && Object.keys(item.query).length) || item.action);
      } else {
        queryArr = values.queries.map((query) => ({
          type: query.isConnectionType ? 'relation' : 'node',
          label: query.labelValue,
          ...((query.isConnectionType && query.depth !== 3) || (!query.isConnectionType && query.depth === 1)
            ? { action: getQueryFilterType(query.type) }
            : {}),
          ...(query.isConnectionType && query.depth !== 1 ? { project_edge_type_id: query.id } : {}),
          query:
            (query.isConnectionType && query.depth === 3) || (!query.isConnectionType && query.depth === 2)
              ? {
                  [query.name]: {
                    type: query.ref_property_type_id,
                    action: getQueryFilterType(query.type),
                    multiple: query.multiple_type,
                    value: getQueryValue(query),
                  },
                }
              : {},
        }));
      }

      const data = {
        operator: values.operator,
        queryArr: queryArr,
      } as VisualizationSubmitType;
      setFilter(data);
      mutate(data);
    } else if (formStatus === 'save') {
      if (activeQuerisID === null) {
        setIsSaveModalOpen(true);
      } else setIsUpdateModalOpen(true);
    }
  };

  useEffect(() => {
    const headerHeight = document.getElementById('overview-header')?.clientHeight;
    const headerTabsHeight = document.querySelector('#overview-header-tabs .ant-tabs-nav')?.clientHeight;

    // Calculate the content height and set it to state
    const contentHeight = `calc(100vh - ${headerHeight}px - ${headerTabsHeight}px - 20px)`;
    setDrawerContentHeight(contentHeight);
  }, []);
  useEffect(() => {
    if (activeQuerisID === null) {
      form.resetFields();
    }
  }, [activeQuerisID, form]);

  const renderHeader = () => {
    return (
      <Row justify="space-around">
        <Col span={6}>
          <Space>Queries</Space>
        </Col>
        <Col span={8}>
          <Space>
            <UsefulInformationTooltip infoText="Inherit parent options" />
            <Form.Item name="operator" noStyle initialValue={'AND'}>
              <StyledRadioButton
                size="small"
                options={[
                  { label: 'And', value: 'AND' },
                  { label: 'Or', value: 'OR' },
                ]}
                optionType="button"
                buttonStyle="solid"
              />
            </Form.Item>
          </Space>
        </Col>
        <Col>
          <CloseOutlined onClick={onClose} style={{ fontSize: '20px' }} />
        </Col>
      </Row>
    );
  };

  const renderQueriesForm = () => {
    return (
      <div id="queries-form-body">
        <QueriesForm openTable={openTable} setOpenTable={setOpenTable} clearFilter={clearFilter} />
      </div>
    );
  };

  const renderFooter = () => {
    return (
      <div style={{ marginTop: 'auto' }}>
        <VerticalSpace>
          <StyledButtonsWrapper>
            <Row gutter={10} style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
              <Col span={12}>
                <StyledCleanButton onClick={handleCleanAll} block>
                  Clean All
                </StyledCleanButton>
              </Col>
              <Col span={12}>
                <StyledAddButton
                  onClick={() => {
                    setOpenTable(true);
                    clearFilter();
                  }}
                  block
                >
                  <PlusAction /> Add
                </StyledAddButton>
              </Col>
            </Row>
            <Row gutter={10} style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
              <Col span={12}>
                <StyledCleanButton onClick={() => setFormStatus('save')} htmlType="submit" block>
                  Save Queries
                </StyledCleanButton>
              </Col>
              <Col span={12}>
                <StyledRunButton onClick={() => setFormStatus('run')} type="primary" htmlType="submit" block>
                  Run Search
                </StyledRunButton>
              </Col>
            </Row>
            <SaveQueryModal
              isModalOpen={isSaveModalOpen}
              setIsModalOpen={setIsSaveModalOpen}
              setQueryCollapsed={setQueryCollapsed}
              setActiveQuerisID={setActiveQuerisID}
              defaultformData={{ operator: form.getFieldValue('operator'), queries: form.getFieldValue('queries') }}
            />
            {activeQuerisID !== undefined && activeQuerisID !== null && (
              <UpdateQueryModal
                isModalOpen={isUpdateModalOpen}
                setIsModalOpen={setIsUpdateModalOpen}
                defaultformData={{ operator: form.getFieldValue('operator'), queries: form.getFieldValue('queries') }}
                activeQuerisID={activeQuerisID}
              />
            )}
          </StyledButtonsWrapper>
        </VerticalSpace>
      </div>
    );
  };

  const renderVisualizationHeader = () => {
    const infoText = 'And - All conditions must be satisfied. Or - At least one condition should be satisfied';

    return (
      <Row justify={setQueryCollapsed ? 'space-between' : 'end'}>
        {queryCollapsed !== undefined && setQueryCollapsed && (
          <Col>
            <StyledButton
              onClick={() => setQueryCollapsed(!queryCollapsed)}
              styleType={!queryCollapsed ? 'passive' : 'active'}
            >
              <ButtonText fontSize={12} color={!queryCollapsed ?COLORS.PRIMARY.WHITE:COLORS.PRIMARY.BLUE}>
                Saved Queries
              </ButtonText>
            </StyledButton>
          </Col>
        )}

        <Col span={8}>
          <Space>
            <UsefulInformationTooltip infoText={infoText} />
            <Form.Item name="operator" noStyle initialValue={'AND'}>
              <StyledRadioButton
                size="small"
                options={[
                  { label: 'And', value: 'AND' },
                  { label: 'Or', value: 'OR' },
                ]}
                optionType="button"
                buttonStyle="solid"
              />
            </Form.Item>
          </Space>
        </Col>
      </Row>
    );
  };

  const renderContent = () => {
    if (isQueries) {
      return (
        <>
          {renderVisualizationHeader()}
          {renderQueriesForm()}
          {renderFooter()}
        </>
      );
    }
    return (
      <Drawer
        className="queries-filter-drawer"
        headerStyle={{ background: '#F2F2F2', padding: '12px 16px 12px 12px' }}
        title={renderHeader()}
        placement="right"
        closable={false}
        onClose={onClose}
        open={hideLeftSection}
        mask={false}
        getContainer={false}
        afterOpenChange={(open) => {
          if (!open) {
            setHideLeftSection(false);
          }
        }}
        width="100%"
        contentWrapperStyle={{ height: drawerContentHeight, overflowY: 'auto' }}
        footerStyle={{ zIndex: 3, background: '#F2F2F2' }}
        bodyStyle={{ background: '#F2F2F2', paddingLeft: '0', paddingRight: '0' }}
        footer={renderFooter()}
      >
        {renderQueriesForm()}
      </Drawer>
    );
  };

  return (
    <Form
      style={{ height: '100%', display: 'flex', flexDirection: 'column', overflowX: 'hidden' }}
      name="all-data-query-filter"
      form={form}
      onFinish={onFinish}
      autoComplete="off"
      layout="vertical"
      requiredMark={false}
      scrollToFirstError
    >
      {renderContent()}
    </Form>
  );
};