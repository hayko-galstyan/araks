import { Form, Row } from 'antd';
import React, { useMemo } from 'react';
import { createNodesTree } from 'components/layouts/components/data-sheet/utils';
import { useTypes } from 'hooks/use-types';
import { PropertyItems } from '../../components/form-data/form-list';
import { MatchData } from '../../type';
import { SourceSelectItem } from '../../components/form-data/source-select-item';
import { TargetSelectItem } from '../../components/form-data/target-select-item';

export const PropertiesSection: React.FC = () => {
  const form = Form.useFormInstance();
  const matchList = Form.useWatch('matchList', { preserve: true });
  const sourceId = Form.useWatch('sourceId', { preserve: true });
  const { nodes } = useTypes();
  const treeNodes = useMemo(() => createNodesTree(nodes), [nodes]);

  const resetProperties = (field: string) => {
    form.setFieldValue(
      'matchList',
      matchList?.map((d: MatchData) =>
        d
          ? {
              ...d,
              sourceId: field === 'targetId' ? d.sourceId : undefined,
              targetId: undefined,
            }
          : null
      )
    );

    form.resetFields(['edgeId']);
    form.resetFields(['connection_name']);
  };

  const onClearHandle = (field: string) => {
    resetProperties(field);

    if (field === 'sourceId') {
      form.setFieldValue('targetId', undefined);
    }
  };

  return (
    <Row>
      <SourceSelectItem
        resetProperties={resetProperties}
        treeNodes={treeNodes}
        nodes={nodes}
        onClearHandle={onClearHandle}
      />
      <TargetSelectItem
        resetProperties={resetProperties}
        treeNodes={treeNodes}
        nodes={nodes}
        onClearHandle={onClearHandle}
        sourceId={sourceId}
      />
      <PropertyItems />
    </Row>
  );
};
