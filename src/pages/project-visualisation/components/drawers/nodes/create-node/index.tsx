import { useCallback, useEffect, useState, useMemo } from 'react';
import { Form, UploadFile } from 'antd';
import { useParams } from 'react-router-dom';
import { Drawer } from 'components/drawer/node-drawer/view-node-drawer';
import { useGraph } from 'components/layouts/components/visualisation/wrapper';
import { createNodesTree } from 'components/layouts/components/data-sheet/utils';
import { useGetProjectNodeTypeProperties } from 'api/project-node-type-property/use-get-project-node-type-properties';
import { AddNodeForm } from 'components/form/add-node-form';
import { useManageNodesGraph } from 'api/visualisation/use-manage-node';
import { getConnectionFormName } from 'components/form/type/connection-type';
import { NodeDataConnectionToSave, ProjectTypePropertyReturnData } from 'api/types';
import { useGetTypes } from 'api/schema/type/use-get-types';
import { NodeBody, NodeDataSubmit, NodePropertiesValues } from 'types/node';
import { PropertyTypes } from 'components/form/property/types';
import { setNodeDataValue } from 'pages/data-sheet/components/table-section/node/utils';
import { addEdges, updateConnector } from 'components/layouts/components/visualisation/helpers/utils';
import { nodeLabelCfgStyle } from 'components/layouts/components/visualisation/helpers/constants';
import { TreeNodeType } from '../../../../../data-sheet/types';
import debounce from 'lodash.debounce';
import { filterTreeData } from '../../../../../data-sheet/utils';
import { NodeCreateDrawerFooter } from './footer';
import { NodeCreateDrawerHeader } from './header';
interface Props {
  alternativeOpen?: boolean;
  alternativeClosed?: ((value: boolean) => void) | undefined;
}

export const NodeCreateDrawer = ({ alternativeOpen, alternativeClosed }: Props) => {
  const [form] = Form.useForm();
  const { graph, openNodeCreate, finishOpenNodeCreate, graphInfo, setGraphInfo } = useGraph() ?? {};

  const { id } = useParams();

  const parent_id = Form.useWatch('parent_id', { form, preserve: true });

  const { isInitialLoading, data: properties } = useGetProjectNodeTypeProperties(parent_id, {
    enabled: !!parent_id,
    onSuccess: () => {
      form.resetFields();
      form.setFieldValue('parent_id', parent_id);
    },
  });

  const { nodes } = useGetTypes({ projectId: id ?? '' });

  const [filteredData, setFilteredData] = useState<TreeNodeType[]>([]);

  useEffect(() => {
    if (nodes && nodes.length) {
      setFilteredData(createNodesTree(nodes ?? []));
      form.setFieldValue('parent_id', nodes[0].id);
    } else {
      setFilteredData([]);
    }
  }, [form, nodes]);

  const onSearch = useCallback(
    (value: string) => {
      const searchText = value.trim().toLowerCase();

      debounce(() => {
        const filteredData = filterTreeData(createNodesTree(nodes ?? []), searchText);
        setFilteredData(filteredData);
      }, 500)();
    },
    [nodes]
  );

  const createNode = useCallback(
    (data: NodePropertiesValues, edgeCount: number) => {
      const nodeData = data as NodePropertiesValues & {
        name: string;
        nodeType: { color: string; id: string; name: string };
        default_image: string;
      };

      const splitName = nodeData.name.length > 15 ? `${nodeData.name.slice(0, 15)}...` : nodeData.name;

      const node = {
        id: nodeData.id,
        label: splitName,
        originalName: nodeData?.name,
        img: nodeData?.default_image ? `${process.env.REACT_APP_AWS_URL}${nodeData?.default_image}` : undefined,
        type: nodeData.default_image ? 'image' : 'circle',
        x: openNodeCreate?.x,
        y: openNodeCreate?.y,
        nodeType: nodeData?.nodeType?.id,
        nodeTypeName: nodeData?.nodeType?.name,
        edgeCount,
        style: {
          stroke: nodeData?.nodeType?.color ?? '',
        },
        labelCfg: nodeLabelCfgStyle,
      };

      graph?.addItem('node', {
        ...node,
        labelCfg: nodeLabelCfgStyle,
      });
    },
    [graph, openNodeCreate]
  );

  const { mutate, isLoading } = useManageNodesGraph({
    onSuccess: ({ data }) => {
      try {
        const nodePropertyValues = data as NodePropertiesValues;

        const edgeCount = nodePropertyValues.createdEdges?.length ?? 0;

        createNode(nodePropertyValues, edgeCount);

        const { id, createdEdges = [] } = nodePropertyValues;

        addEdges(graph, id, createdEdges);

        updateConnector(graph);

        form.resetFields();

        form.setFieldValue('parent_id', parent_id || nodes[0].id);

        setGraphInfo({
          nodeCount: (graphInfo?.nodeCount ?? 0) + 1,
          nodeCountAPI: (graphInfo?.nodeCountAPI ?? 0) + 1,
        });

        finishOpenNodeCreate();
        setFilteredData(createNodesTree(nodes ?? []));
      } catch (data) {
        if (alternativeClosed) {
          alternativeClosed(false);
          form.resetFields();
          form.setFieldValue('parent_id', parent_id || nodes[0].id);

        }
      }
    },
    onError: (error) => {
      error;
    },
  });

  const onFinish = useCallback(
    (values: NodeBody) => {
      const mainData = { name: '', default_image: '' };
      const dataToSubmit = properties
        ?.map((item) => {
          if (item.name === 'name') {
            mainData.name = (values.name as string[]).join('');
            return;
          }
          if (item.name === 'default_image' && item.default_image) {
            mainData.default_image = values.default_image
              ? (values.default_image as UploadFile[])?.[0].response.data.uploadPath
              : '';
          return;
        }

          return item.ref_property_type_id !== PropertyTypes.Connection
            ? {
                project_type_property_id: item.id,
                project_type_property_type: item.ref_property_type_id,
                nodes_data: setNodeDataValue(item, values),
              }
            : null;
        })
        .filter(Boolean);

      const dataToSubmitEdges = properties
        ?.map((item) => {
          const formName = getConnectionFormName(item.name, item.id);
          return item.ref_property_type_id === PropertyTypes.Connection
            ? (values[formName] as NodeDataConnectionToSave[])?.map((itemConn) => ({
                source_id: itemConn.source_id,
                source_type_id: itemConn.source_type_id,
                target_id: itemConn.target_id,
                target_type_id: itemConn.target_type_id,
                project_edge_type_id: itemConn.id,
              }))
            : null;
        })
        .filter(Boolean);

      mutate({
        ...mainData,
        nodes: dataToSubmit,
        edges: dataToSubmitEdges?.flat() || [],
        project_type_id: parent_id || '',
      } as NodeDataSubmit);
    },
    [properties, mutate, parent_id]
  );

  const treeSelect = useMemo(
    () => (
      <NodeCreateDrawerHeader
        onSearch={onSearch}
        filteredData={filteredData}
        onClear={() => {
          setFilteredData(createNodesTree(nodes ?? []));
        }}
      />
    ),
    [filteredData, nodes, onSearch]
  );

  const footer = useMemo(
    () =>
      parent_id && (
        <NodeCreateDrawerFooter
          onCancel={() => {
            setFilteredData(createNodesTree(nodes ?? []));
            if (alternativeOpen) {
              if (alternativeClosed) {
                alternativeClosed(false);
              }
            } else {
              finishOpenNodeCreate();
            }
          }}
          isLoading={isLoading}
          onSave={() => form.submit()}
        />
      ),
    [parent_id, isLoading, nodes, alternativeOpen, alternativeClosed, finishOpenNodeCreate, form]
  );

  const onClose = () => {
    if (alternativeOpen) {
      if (alternativeClosed) {
        alternativeClosed(false);
      }
    } else {
      finishOpenNodeCreate();
    }

    setTimeout(() => {
      form.setFieldValue('parent_id', parent_id || nodes[0]?.id);
    }, 100);
  };

  return (
    <Form
      name="add-node-drawer"
      form={form}
      autoComplete="off"
      layout="vertical"
      requiredMark={false}
      onFinish={onFinish}
    >
      <Drawer
        headerStyle={{
          borderTop: `6px solid ${parent_id ? nodes?.find((n) => n.id === parent_id)?.color : '#CDCDCD'}`,
          padding: '14px 24px 14px 0',
        }}
        onClose={onClose}
        closable={false}
        title={treeSelect}
        footer={footer}
        open={openNodeCreate?.isOpened || alternativeOpen}
      >
        <AddNodeForm
          data={properties as ProjectTypePropertyReturnData[]}
          isInitialLoading={isInitialLoading}
          nodeTypeId={parent_id}
        />
      </Drawer>
    </Form>
  );
};
